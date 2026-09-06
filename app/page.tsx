"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUpRight, BatteryCharging, Check, Sparkles, Wallet } from "lucide-react";

import ChatPanel, { type ChatUIMessage } from "@/components/chat/ChatPanel";

function getLatestSearchProducts(messages: ChatUIMessage[]) {
  for (let messageIndex = messages.length - 1; messageIndex >= 0; messageIndex -= 1) {
    const message = messages[messageIndex];

    for (let partIndex = message.parts.length - 1; partIndex >= 0; partIndex -= 1) {
      const part = message.parts[partIndex];

      if (part.type === "tool-searchProducts" && part.state === "output-available") {
        return part.output.products;
      }
    }
  }

  return [];
}

export default function Home() {
  const { messages, sendMessage, status, stop, regenerate } = useChat<ChatUIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const searchProducts = getLatestSearchProducts(messages);

  return (
    <main className="flex min-h-[calc(100dvh-73px)] flex-1 flex-col bg-transparent md:h-[calc(100dvh-73px)] md:min-h-0 md:flex-row md:overflow-hidden">
      <ChatPanel
        messages={messages}
        sendMessage={sendMessage}
        status={status}
        stop={stop}
        regenerate={regenerate}
      />
      <section className="min-w-0 flex-1 overflow-y-auto px-5 py-8 md:ml-[32%] lg:ml-[28%] lg:px-10 lg:py-10 xl:ml-[25%]">
        <div className="mx-auto max-w-[1100px]">
          <header className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"><Sparkles className="size-4" />Product shortlist</div>
              <h1 className="text-4xl font-bold tracking-[-0.03em] text-foreground lg:text-5xl">Decision board</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">A clear view of the products that best match your current brief.</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Check className="size-5" /></span>
              <span><strong className="block text-foreground">{searchProducts.length} strong matches</strong>{searchProducts.length > 0 ? "Updated just now" : "Waiting for your brief"}</span>
            </div>
          </header>

          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {searchProducts.length > 0 ? searchProducts.map((product, index) => (
              <article key={product.name} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/10 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/50">
                <div className={`relative m-2 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border ${index === 0 ? "bg-accent" : "bg-secondary"}`}>
                  <div className="absolute left-5 top-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground"><span className="size-2 rounded-full bg-primary" />Match signal</div>
                  <span className={`text-7xl font-bold tracking-[-0.08em] ${index === 0 ? "text-primary/80" : "text-secondary-foreground/80"}`}>{product.name.charAt(0)}</span>
                  <span className="absolute right-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm font-bold text-foreground backdrop-blur-sm">Recommended</span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{product.matchReasons[0] ?? "Recommended match"}</p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">{product.name}</h2>
                  <div className="mt-5 flex items-end justify-between gap-4"><p className="text-3xl font-bold tracking-tight text-foreground">${product.price.toLocaleString()}</p><span className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><BatteryCharging className="size-4 text-primary" />{product.batteryLife}</span></div>
                  <a href={`#${product.name.toLowerCase().replaceAll(" ", "-")}`} className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">View product details<ArrowUpRight className="size-4" /></a>
                </div>
              </article>
            )) : (
              <div className="col-span-full rounded-3xl border border-dashed border-primary/30 bg-accent/40 px-6 py-12 text-center">
                <p className="text-lg font-semibold text-foreground">Start a conversation to see matches here</p>
                <p className="mt-2 text-sm text-muted-foreground">Tell us what you are shopping for and what matters most.</p>
              </div>
            )}
          </div>

          {searchProducts.length > 0 && (
            <section className="mt-7 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/10">
              <div className="flex flex-col justify-between gap-3 border-b border-border px-6 py-5 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Side by side</p><h2 className="mt-1 text-xl font-bold text-foreground">Quick comparison</h2></div><span className="flex items-center gap-2 text-sm text-muted-foreground"><Wallet className="size-4 text-primary" />Tuned to your budget</span></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[48rem] text-left text-base"><thead className="bg-muted text-xs uppercase tracking-[0.14em] text-muted-foreground"><tr><th scope="col" className="bg-primary px-6 py-4 font-bold text-primary-foreground">Feature</th>{searchProducts.map((product) => <th scope="col" className="px-6 py-4 font-bold" key={product.name}>{product.name}</th>)}</tr></thead><tbody className="divide-y divide-border text-muted-foreground"><tr><th scope="row" className="bg-accent px-6 py-5 font-semibold text-accent-foreground">Price</th>{searchProducts.map((product) => <td className="px-6 py-5 font-semibold text-primary" key={`${product.name}-price`}>${product.price.toLocaleString()}</td>)}</tr><tr><th scope="row" className="bg-accent px-6 py-5 font-semibold text-accent-foreground">Battery life</th>{searchProducts.map((product) => <td className="px-6 py-5" key={`${product.name}-battery`}>{product.batteryLife}</td>)}</tr><tr><th scope="row" className="bg-accent px-6 py-5 font-semibold text-accent-foreground">Match reasons</th>{searchProducts.map((product) => <td className="px-6 py-5" key={`${product.name}-reasons`}>{product.matchReasons.join(", ")}</td>)}</tr></tbody></table></div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
