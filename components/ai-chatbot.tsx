"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport, LanguageModelUsage } from "ai";
import { AlertCircle, Bot, Clock, Loader, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  Context,
  ContextContent,
  ContextContentHeader,
  ContextTrigger,
} from "./ai-elements/context";
import { Button } from "./ui/button";

export function AIChatbot({
  initialMessages = [],
  ipAddress,
  initialTokenUsage = 0,
  initialIsRateLimited = false,
  rateLimitExpireAt = 0,
}: {
  initialMessages: (UIMessage<{ totalUsage?: LanguageModelUsage }> & {
    isHistoryMessage: boolean;
  })[];
  ipAddress: string;
  initialTokenUsage?: number;
  initialIsRateLimited?: boolean;
  rateLimitExpireAt?: number;
}) {
  const [open, setOpen] = useState(false);
  const [currentTokenUsage, setCurrentTokenUsage] = useState(initialTokenUsage);
  const MAX_TOKENS_PER_IP = parseInt(
    process.env.NEXT_PUBLIC_MAX_TOKENS_PER_IP ?? "5000"
  ); // Should match API route constant

  const { messages, sendMessage, status, error, clearError } = useChat({
    id: ipAddress,
    messages: initialMessages,
    // 👇 resume if we're reconnecting to a pending AI response
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest({
        messages,
        id,
      }: {
        messages: UIMessage[];
        id: string;
      }) {
        return { body: { message: messages[messages.length - 1], id } };
      },
      async fetch(input, init) {
        const response = await fetch(input, init);

        // Handle rate limit errors
        if (response.status === 429) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Rate limit exceeded. Please try again in 6 hours.`
          );
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Request failed with status ${response.status}`
          );
        }

        return response;
      },
    }),
    experimental_throttle: 50,
    onData: (data) => {
      console.log("Received data part from server:", data);
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = async (
    message: { text: string },
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (!message.text.trim() || isLoading) return;

    // Clear error if exists when sending a new message
    if (error) {
      clearError?.();
    }

    await sendMessage({
      text: message.text.trim(),
    });
  };

  const totalUsage = useMemo(() => {
    const last = [...messages].pop();

    return last?.metadata?.totalUsage;
  }, [messages]);

  // Update current token usage when new messages arrive
  // Note: totalUsage from messages is per-request, so we accumulate it
  // Only count new messages (not initial history messages)
  useEffect(() => {
    if (totalUsage?.totalTokens) {
      // Calculate cumulative usage by summing usage from new messages only
      const initialMessageIds = new Set(initialMessages.map((msg) => msg.id));
      const newMessagesUsage = messages
        .filter((msg) => !initialMessageIds.has(msg.id))
        .reduce((sum, msg) => {
          const msgUsage = msg.metadata?.totalUsage?.totalTokens ?? 0;
          return sum + msgUsage;
        }, 0);

      setCurrentTokenUsage(initialTokenUsage + newMessagesUsage);
    }
  }, [totalUsage, messages, initialTokenUsage, initialMessages]);

  // Parse rate limit error details
  const rateLimitError = useMemo(() => {
    if (!error) return null;

    try {
      // Try to parse error message as JSON (if it contains rate limit info)
      const errorMessage = error.message || "";
      if (
        errorMessage.includes("Rate limit exceeded") ||
        errorMessage.includes("429")
      ) {
        // Extract retry after from error or calculate from message
        const retryAfterMatch = errorMessage.match(
          /try again in (\d+) hours?/i
        );
        const hours = retryAfterMatch ? parseInt(retryAfterMatch[1]) : 6;

        return {
          isRateLimit: true,
          message: errorMessage.includes("token usage limit")
            ? `You've reached the token usage limit of 5,000 tokens. Please try again in ${hours} hours.`
            : `Rate limit exceeded. Please try again in ${hours} hours.`,
          retryAfterHours: hours,
        };
      }
    } catch {
      // If parsing fails, return null
    }

    return null;
  }, [error]);

  // Countdown timer for rate limit
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    // If user is initially rate limited, use the expireAt TTL
    if (initialIsRateLimited && rateLimitExpireAt > 0) {
      setTimeRemaining(rateLimitExpireAt);
    } else if (rateLimitError && rateLimitError.retryAfterHours) {
      // If rate limited from an error, calculate from hours
      const initialSeconds = rateLimitError.retryAfterHours * 60 * 60;
      setTimeRemaining(initialSeconds);
    } else {
      setTimeRemaining(null);
      return;
    }

    // Update countdown every second
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimitError, initialIsRateLimited, rateLimitExpireAt]);

  const formatTimeRemaining = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const cannotSendMessage =
    initialIsRateLimited ||
    (totalUsage?.totalTokens ?? currentTokenUsage) >= MAX_TOKENS_PER_IP ||
    isLoading;

  return (
    <>
      {/* Trigger Button */}
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </motion.button>
      </AnimatePresence>

      {/* Chat Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="bg-black/20 backdrop-blur-sm" />
        <DialogContent className="flex h-[600px] max-w-[95%] flex-col p-0 sm:h-[700px] sm:max-w-2xl">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span>Sylva</span>
            </DialogTitle>
          </DialogHeader>

          <Conversation className="flex-1">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  title="Hello, I'm Sylva. How can I help you?"
                  description="Ask me anything about Jun's portfolio, skills, experience, or projects."
                  icon={<Bot className="h-8 w-8 text-muted-foreground" />}
                />
              ) : (
                messages.map((message, index) => {
                  const isLastMessage =
                    message.id === messages[messages.length - 1]?.id;
                  const textParts = message.parts.filter(
                    (part) => part.type === "text"
                  );
                  const reasoningParts = message.parts.filter(
                    (part) => part.type === "reasoning"
                  );
                  const content = textParts.map((part) => part.text).join("");

                  return (
                    <Message key={`${message.id}-${index}`} from={message.role}>
                      <MessageContent>
                        {reasoningParts.map((part, idx) => (
                          <Reasoning
                            key={idx}
                            isStreaming={
                              isLoading &&
                              isLastMessage &&
                              part.type === "reasoning"
                            }
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>
                              {part.text || ""}
                            </ReasoningContent>
                          </Reasoning>
                        ))}
                        {content && (
                          <MessageResponse
                            mode="streaming"
                            isAnimating={!message.isHistoryMessage}
                          >
                            {content}
                          </MessageResponse>
                        )}
                      </MessageContent>
                    </Message>
                  );
                })
              )}

              {error && (
                <Message from="assistant">
                  <MessageContent
                    className={
                      rateLimitError
                        ? "bg-amber-950/20 border border-amber-900/30"
                        : "bg-red-950/20 border border-red-900/30"
                    }
                  >
                    <div className="flex items-start gap-3 p-4">
                      {rateLimitError ? (
                        <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 space-y-2">
                        <p
                          className={
                            rateLimitError
                              ? "text-sm font-medium text-amber-400"
                              : "text-sm font-medium text-red-400"
                          }
                        >
                          {rateLimitError
                            ? "Rate Limit Exceeded"
                            : "Connection Error"}
                        </p>
                        <p
                          className={
                            rateLimitError
                              ? "text-xs text-amber-500/80"
                              : "text-xs text-red-500/80"
                          }
                        >
                          {rateLimitError
                            ? rateLimitError.message
                            : error.message ||
                              "I'm having trouble connecting to Jun's intelligence core. Please try again or reach out to him directly via email."}
                        </p>
                        {rateLimitError &&
                          timeRemaining !== null &&
                          timeRemaining > 0 && (
                            <div className="flex items-center gap-2 mt-3">
                              <Clock className="w-4 h-4 text-amber-500/60" />
                              <p className="text-xs text-amber-500/60 font-mono">
                                Time remaining:{" "}
                                {formatTimeRemaining(timeRemaining)}
                              </p>
                            </div>
                          )}
                        {clearError && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={clearError}
                            className={
                              rateLimitError
                                ? "mt-2 text-xs border-amber-900/30 text-amber-400 hover:bg-amber-950/30"
                                : "mt-2 text-xs border-red-900/30 text-red-400 hover:bg-red-950/30"
                            }
                          >
                            Dismiss
                          </Button>
                        )}
                      </div>
                    </div>
                  </MessageContent>
                </Message>
              )}
              {initialIsRateLimited && !error && (
                <Message from="assistant">
                  <MessageContent className="bg-amber-950/20 border border-amber-900/30 w-full">
                    <div className="flex items-start gap-3 p-4">
                      <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-2">
                        <p className="text-sm font-medium text-amber-400">
                          Rate Limit Exceeded
                        </p>
                        <p className="text-xs text-amber-500/80">
                          You have exceeded the token usage limit. Please try
                          again later.
                        </p>
                        {timeRemaining !== null && timeRemaining > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-4 h-4 text-amber-500/60" />
                            <p className="text-xs text-amber-500/60 font-mono">
                              Time remaining:{" "}
                              {formatTimeRemaining(timeRemaining)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </MessageContent>
                </Message>
              )}
              {status === "submitted" && (
                <Loader
                  size={20}
                  className="animate-spin"
                  style={{ animationDuration: "1.9s" }}
                />
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t p-4">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputBody>
                <PromptInputTextarea
                  placeholder="Ask about Jun's full-stack skills..."
                  disabled={cannotSendMessage}
                />
              </PromptInputBody>
              <PromptInputFooter className="justify-end">
                {timeRemaining !== null && timeRemaining > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-500/60 font-mono">
                      Time remaining: {formatTimeRemaining(timeRemaining)}
                    </p>
                  </div>
                )}
                {(totalUsage || currentTokenUsage > 0) && (
                  <Context
                    maxTokens={MAX_TOKENS_PER_IP}
                    usage={totalUsage}
                    usedTokens={
                      (totalUsage?.totalTokens ?? currentTokenUsage) >=
                      MAX_TOKENS_PER_IP
                        ? MAX_TOKENS_PER_IP
                        : (totalUsage?.totalTokens ?? currentTokenUsage)
                    }
                  >
                    <ContextTrigger disabled={cannotSendMessage} />
                    <ContextContent>
                      <ContextContentHeader />
                    </ContextContent>
                  </Context>
                )}
                <PromptInputSubmit
                  status={isLoading ? "submitted" : undefined}
                  disabled={cannotSendMessage}
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
