import { PortfolioClient } from "@/components/portfolio-client";
import {
  getEducation,
  getExperience,
  getProfile,
  getSkills,
} from "@/lib/content";
import { redis } from "@/lib/redis";
import { LanguageModelUsage, UIMessage } from "ai";
import { headers } from "next/headers";

export default async function Home() {
  const profile = getProfile();
  const skills = getSkills();
  const experience = getExperience();
  const education = getEducation();

  const ipAddress = (await headers()).get("x-forwarded-for");

  const messages = await redis.get<
    UIMessage<{ totalUsage?: LanguageModelUsage }>[]
  >(`chat:history:${ipAddress}`);

  // Get current token usage for rate limit display
  const tokenUsage = (await redis.get<number>(`token:usage:${ipAddress}`)) ?? 0;
  const isRateLimited =
    (await redis.get<boolean>(`rate:limit:${ipAddress}`)) ?? false;

  const rateLimitExpireAt = (await redis.ttl(`rate:limit:${ipAddress}`)) ?? 0;

  return (
    <PortfolioClient
      ipAddress={ipAddress ?? "unknown"}
      initialMessages={messages ?? []}
      tokenUsage={tokenUsage}
      isRateLimited={isRateLimited}
      rateLimitExpireAt={rateLimitExpireAt}
      profile={profile}
      skills={skills}
      experience={experience}
      education={education}
    />
  );
}
