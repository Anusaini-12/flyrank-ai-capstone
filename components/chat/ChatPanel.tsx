"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import type { InferUITools, UIMessage } from "ai";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RotateCcw, Send, Square } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ToolProductCard from "@/components/chat/ToolProductCard";
import { searchProductsTool } from "@/lib/tools/search-products";

export type ChatUIMessage = UIMessage<
  unknown,
  never,
  InferUITools<{ searchProducts: typeof searchProductsTool }>
>;
export type ChatPanelProps = Pick<
  UseChatHelpers<ChatUIMessage>,
  "messages" | "sendMessage" | "status" | "stop" | "regenerate"
>;
type SearchProductsPart = Extract<
  ChatUIMessage["parts"][number],
  { type: "tool-searchProducts" }
>;

function splitMarkdownBlocks(text: string, isStreaming: boolean) {
  const completedBlocks: string[] = [];
  const currentLines: string[] = [];
  let insideCodeFence = false;

  for (const line of text.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      insideCodeFence = !insideCodeFence;
    }

    currentLines.push(line);

    
    if (line.trim() === "" && !insideCodeFence) {
      const block = currentLines.join("\n").trim();

      if (block) {
        completedBlocks.push(block);
      }

      currentLines.length = 0;
    }
  }

  const pendingBlock = currentLines.join("\n").trim();

  if (!isStreaming && pendingBlock) {
    completedBlocks.push(pendingBlock);
  }

  return {
    completedBlocks,
    pendingBlock: isStreaming ? pendingBlock : "",
  };
}

function AssistantMessage({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const { completedBlocks, pendingBlock } = splitMarkdownBlocks(
    text,
    isStreaming,
  );

  return (
    <div className="markdown-content min-w-0 max-w-full space-y-3 break-words text-[15px] leading-7">
      {completedBlocks.map((block, index) => (
        <ReactMarkdown key={`markdown-block-${index}`} remarkPlugins={[remarkGfm]}>
          {block}
        </ReactMarkdown>
      ))}
      {pendingBlock && (
        <p className="whitespace-pre-wrap">{pendingBlock}</p>
      )}
    </div>
  );
}

function SearchProductsPartView({
  part,
  onRetry,
}: {
  part: SearchProductsPart;
  onRetry: () => void;
}) {
  if (part.state === "input-streaming") {
    return (
      <div className="animate-pulse rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-sm text-muted-foreground">
        Figuring out what to search for...
      </div>
    );
  }

  if (part.state === "input-available") {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
        Searching for {part.input.category}...
      </div>
    );
  }

  if (part.state === "output-error") {
    return (
      <div className="rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-4 text-sm text-foreground">
        <p className="font-semibold">The product search couldn&apos;t complete.</p>
        <p className="mt-1 text-muted-foreground">Try again and we&apos;ll take another look.</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <RotateCcw className="size-3.5" />
          Retry search
        </button>
      </div>
    );
  }

  if (part.state !== "output-available") {
    return null;
  }

  return (
    <div className="space-y-2 rounded-xl border border-border bg-background/70 p-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        Product matches
      </p>
      {part.output.products.map((product) => (
        <ToolProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ChatPanel({
  messages,
  sendMessage,
  status,
  stop,
  regenerate,
}: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const isGenerating = status === "submitted" || status === "streaming";

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    const scrollContainer = container;

    function handleScroll() {
      const atBottom =
        scrollContainer.scrollHeight -
          scrollContainer.scrollTop -
          scrollContainer.clientHeight <=
        8;

      isAtBottomRef.current = atBottom;
      setIsAtBottom((currentIsAtBottom) =>
        currentIsAtBottom === atBottom ? currentIsAtBottom : atBottom,
      );
    }

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container && isAtBottomRef.current) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  function jumpToLatest() {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    isAtBottomRef.current = true;
    setIsAtBottom(true);
    container.scrollTo({ top: container.scrollHeight, behavior: "auto" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();

    if (!message) {
      return;
    }

    setDraft("");
    await sendMessage({ text: message });
  }

  return (
    <section className="flex h-[calc(100dvh-73px)] min-h-0 flex-1 flex-col overflow-hidden border-b border-border bg-card md:fixed md:bottom-0 md:left-0 md:top-[73px] md:z-30 md:h-auto md:flex-none md:w-[32%] md:border-b-0 md:border-r lg:w-[28%] xl:w-[25%]">
      <div className="border-b border-border px-6 py-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          AI brief builder
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
          Chat &amp; refinement
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Tell us what matters. We&apos;ll narrow the field.</p>
      </div>

      <div
        ref={messagesContainerRef}
        className="relative min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain touch-pan-y px-6 py-7"
      >
        {messages.map((message) => (
          <article
            key={message.id}
            className={
              message.role === "user"
                ? "ml-4 min-w-0 max-w-[calc(100%-1rem)] rounded-xl rounded-bl-sm rounded-tr-sm bg-primary px-5 py-2 text-primary-foreground shadow-lg shadow-primary/10"
                : "mr-4 min-w-0 max-w-[calc(100%-1rem)] rounded-xl rounded-bl-sm rounded-tr-sm border border-border bg-muted px-3 py-4 text-foreground"
            }
          >
            {/* <p className="text-[8px] font-bold uppercase tracking-[0.14em] opacity-60">
              {message.role === "user" ? "You" : "FlyRank AI"}
            </p> */}
            {message.role === "assistant" ? (
              <>
                <AssistantMessage
                  text={message.parts
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("")}
                  isStreaming={isGenerating}
                />
                <div className="mt-4 space-y-3">
                  {message.parts.map((part, index) =>
                    part.type === "tool-searchProducts" ? (
                      <SearchProductsPartView
                        key={`${message.id}-search-${index}`}
                        part={part}
                        onRetry={() => void regenerate()}
                      />
                    ) : null,
                  )}
                </div>
              </>
            ) : (
              <div className="min-w-0 break-words text-[15px] leading-7">
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    <p key={`${message.id}-${index}`}>{part.text}</p>
                  ) : null,
                )}
              </div>
            )}
          </article>
        ))}
        {status === "submitted" && (
          <article className="mr-8 min-w-0 max-w-[calc(100%-2rem)] rounded-2xl rounded-bl-sm border border-border bg-muted px-5 py-4 text-foreground transition-opacity duration-300">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] opacity-60">
              FlyRank AI
            </p>
            <p className="text-[15px] leading-7 text-muted-foreground">Thinking...</p>
          </article>
        )}
        {!isAtBottom && (
          <button
            type="button"
            onClick={jumpToLatest}
            className="sticky bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground shadow-xl transition-colors hover:border-primary hover:text-primary"
          >
            Jump to latest
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="sticky bottom-0 z-20 shrink-0 border-t border-border bg-background/95 p-5 backdrop-blur-xl lg:p-6">
        <label htmlFor="chat-message" className="sr-only">
          Refine your request
        </label>
        <div className="flex items-center gap-2 rounded-2xl border border-input bg-background p-2 shadow-xl shadow-foreground/10 focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/15">
          <input
            id="chat-message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Refine your request..."
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!draft.trim()}
          >
            <Send className="size-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
          {isGenerating && (
            <button
              type="button"
              onClick={() => void stop()}
              className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-bold text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <Square className="size-3.5 fill-current" />
              <span className="hidden sm:inline">Stop</span>
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
