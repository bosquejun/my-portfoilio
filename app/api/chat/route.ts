import { redis } from "@/lib/redis";

import {
  getEducation,
  getExperience,
  getProfile,
  getSkills,
} from "@/lib/content";
import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  smoothStream,
  streamText,
  type UIMessage,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Rate limit constants
const MAX_TOKENS_PER_IP = parseInt(
  process.env.NEXT_PUBLIC_MAX_TOKENS_PER_IP ?? "5000"
);
const RATE_LIMIT_DURATION_HOURS = 6;
const RATE_LIMIT_DURATION_SECONDS = RATE_LIMIT_DURATION_HOURS * 60 * 60;

const getSystemInstruction = () => {
  const profile = getProfile();
  const skills = getSkills();
  const experience = getExperience();
  const education = getEducation();
  const systemInstruction = `
You are "Sylva", Jun Bosque's professional intelligence agent.

CONTEXT DATA:
- Professional Identity: ${profile.name}, Senior Full Stack Engineer.
- Experience Level: 10 years of professional industry expertise.
- Core Tech: ${JSON.stringify(skills)}
- Key Experience History: ${JSON.stringify(experience)}
- Education: ${JSON.stringify(education)}

BEHAVIOR RULES:
1. Tone: Professional but friendly, direct, and elite developer-focused. No nature metaphors.
2. Focus: Highlight Jun's ability to build end-to-end features, hands-on coding expertise, and seniority in managing complex codebases.
3. Experience: Emphasize work at Comeback Media (AI Full Stack), Archax (Finance & Security), and Accenture (Enterprise Scale).
4. Redirect: Always keep conversation centered on his technical skills, projects, and career.
5. If asked about specific details not in your knowledge, suggest they check the portfolio sections or contact ${profile.name} directly.
`;

  return systemInstruction;
};

export async function POST(req: Request) {
  const { message, id }: { message: UIMessage; id: string } = await req.json();

  // Check if IP is rate limited (blocked)
  const isRateLimited = await redis.get<boolean>(`rate:limit:${id}`);
  if (isRateLimited) {
    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded",
        message: `You have exceeded the token usage limit. Please try again in ${RATE_LIMIT_DURATION_HOURS} hours.`,
        retryAfter: RATE_LIMIT_DURATION_SECONDS,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": RATE_LIMIT_DURATION_SECONDS.toString(),
        },
      }
    );
  }

  // Get current token usage for this IP
  const currentUsage = (await redis.get<number>(`token:usage:${id}`)) ?? 0;

  // Check if usage already exceeds limit
  if (currentUsage >= MAX_TOKENS_PER_IP) {
    // Set rate limit block for 6 hours (if not already set)
    const existingBlock = await redis.get<boolean>(`rate:limit:${id}`);
    if (!existingBlock) {
      await redis.setex(`rate:limit:${id}`, RATE_LIMIT_DURATION_SECONDS, true);
    }

    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded",
        message: `You have exceeded the token usage limit of ${MAX_TOKENS_PER_IP} tokens. Please try again in ${RATE_LIMIT_DURATION_HOURS} hours.`,
        retryAfter: RATE_LIMIT_DURATION_SECONDS,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": RATE_LIMIT_DURATION_SECONDS.toString(),
        },
      }
    );
  }

  const history = await redis.get<UIMessage[]>(`chat:history:${id}`);

  const messages = [...(history ?? []), message];

  // Track token usage from this request
  let tokensUsedThisRequest = 0;

  const result = streamText({
    model: google("gemini-2.5-flash-lite"),
    system: getSystemInstruction(),
    messages: await convertToModelMessages(messages),
    temperature: 0.3,
    experimental_transform: smoothStream({
      delayInMs: 20, // optional: defaults to 10ms
      chunking: "line", // optional: defaults to 'word'
    }),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
    originalMessages: messages ?? [],
    onFinish: async ({ messages }) => {
      // 👇 save chat history to redis
      await redis.set(`chat:history:${id}`, messages);

      // Update token usage for this IP
      if (tokensUsedThisRequest > 0) {
        const newUsage = currentUsage + tokensUsedThisRequest;

        // Update cumulative token usage
        await redis.set(`token:usage:${id}`, newUsage);

        // If usage exceeds limit, set rate limit block
        if (newUsage >= MAX_TOKENS_PER_IP) {
          await redis.setex(
            `rate:limit:${id}`,
            RATE_LIMIT_DURATION_SECONDS,
            true
          );
        }
      }
    },
    messageMetadata({ part }) {
      if (part.type === "start") {
        return {
          createdAt: Date.now(),
        };
      }

      if (part.type === "finish") {
        // Store token usage for this request (will be used in onFinish)
        tokensUsedThisRequest = part.totalUsage?.totalTokens ?? 0;
        const newUsage = currentUsage + tokensUsedThisRequest;

        return {
          totalUsage: {
            ...part.totalUsage,
            totalTokens: newUsage ?? 0,
          },
        };
      }
    },
  });
}
