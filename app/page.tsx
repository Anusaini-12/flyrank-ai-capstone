"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  Check,
  Sparkles,
  Wallet,
  PackageSearch,
  LayoutList
} from "lucide-react";

import ChatPanel, { type ChatUIMessage } from "@/components/chat/ChatPanel";
import BudgetFilter from "@/components/filters/BudgetFilter";

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

function ProductImage({
  image,
  name,
  isFeatured,
}: {
  image?: string;
  name: string;
  isFeatured: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const avatarClassName = `text-8xl font-black tracking-tighter opacity-20 ${isFeatured ? "text-primary" : "text-foreground"}`;

  if (!image || imageFailed) {
    return <span className={avatarClassName}>{name.charAt(0)}</span>;
  }

  return (
    <div className="flex size-full items-center justify-center bg-white/90 p-4">
      <img
        src={image}
        alt={name}
        onError={() => setImageFailed(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default function Home() {
  const { error, messages, sendMessage, status, stop, regenerate } = useChat<ChatUIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const searchProducts = getLatestSearchProducts(messages);

  function handleBudgetFilterSubmit({
    category,
    maxPrice,
  }: Parameters<React.ComponentProps<typeof BudgetFilter>["onSubmit"]>[0]) {
    const budgetMessage = maxPrice === undefined
      ? `I need ${category}`
      : `I need ${category} under $${maxPrice}`;

    void sendMessage({ text: budgetMessage });
  }

  return (
    <main className="flex min-h-[calc(100dvh-73px)] w-full flex-col bg-background text-foreground md:h-[calc(100dvh-73px)] md:flex-row md:overflow-hidden">

      {/* Sidebar: Chat Panel */}
      <aside className="flex h-[50dvh] w-full flex-col border-b border-border bg-card/50 md:h-full md:w-[350px] md:flex-shrink-0 md:border-b-0 md:border-r z-10 shadow-sm">
        <ChatPanel
          error={error}
          messages={messages}
          sendMessage={sendMessage}
          status={status}
          stop={stop}
          regenerate={regenerate}
        />
      </aside>

      {/* Main Content: Decision Board */}
      <section className="flex-1 overflow-y-auto bg-muted/10 p-6 md:p-12">
        <div className="mx-auto max-w-[1000px]">

          {/* Header */}
          <header className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                <Sparkles className="size-3.5" />
                Product Shortlist
              </div>
              <BudgetFilter onSubmit={handleBudgetFilterSubmit} />
              <h1 className="text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
                Decision Board
              </h1>
              <p className="max-w-xl text-base text-muted-foreground">
                A curated view of the products that best match your current brief and preferences.
              </p>
            </div>

            <div className="flex w-fit items-center gap-4 rounded-2xl border border-border bg-card p-2 pr-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Check className="size-5" />
              </div>
              <div className="text-sm">
                <strong className="block font-semibold text-foreground">
                  {searchProducts.length} strong matches
                </strong>
                <span className="text-muted-foreground">
                  {searchProducts.length > 0 ? "Updated just now" : "Waiting for your brief"}
                </span>
              </div>
            </div>
          </header>

          {/* Product Cards Grid */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {searchProducts.length > 0 ? (
              searchProducts.map((product, index) => (
                <article
                  key={product.name}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Card Image/Avatar Area */}
                  <div className={`relative m-2 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border/50 ${index === 0
                      ? "bg-gradient-to-br from-primary/20 via-primary/5 to-transparent"
                      : "bg-gradient-to-br from-muted via-muted/50 to-transparent"
                    }`}>
                    <div className="absolute left-4 top-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span className={`size-2 rounded-full ${index === 0 ? "bg-primary animate-pulse" : "bg-muted-foreground/50"}`} />
                      Signal
                    </div>

                    <ProductImage
                      image={product.image}
                      name={product.name}
                      isFeatured={index === 0}
                    />

                    {index === 0 && (
                      <span className="absolute right-3 top-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                        Top Pick
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 line-clamp-1">
                      {product.matchReasons[0] ?? "Recommended match"}
                    </p>
                    <h2 className="text-xl font-bold tracking-tight text-foreground line-clamp-1">
                      {product.name}
                    </h2>

                    <div className="mt-4 flex items-end justify-between gap-4">
                      <p className="text-3xl font-bold tracking-tight text-foreground">
                        ${product.price.toLocaleString()}
                      </p>
                      <span className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1 text-sm font-medium text-muted-foreground">
                        <BatteryCharging className="size-4 text-primary" />
                        {product.batteryLife}
                      </span>
                    </div>

                    <a
                      href={product.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto pt-6"
                    >
                      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                        View Details
                        <ArrowUpRight className="size-4" />
                      </div>
                    </a>
                  </div>
                </article>
              ))
            ) : (
              /* Empty State */
              <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card/50 px-6 py-20 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                  <PackageSearch className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Awaiting your criteria</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Start a conversation in the panel to describe what you&apos;re looking for. Your personalized matches will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Comparison Table */}
          {searchProducts.length > 0 && (
            <section className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="flex flex-col justify-between gap-4 border-b border-border bg-muted/20 px-6 py-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-background border border-border shadow-sm">
                    <LayoutList className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Feature Comparison</h2>
                    <p className="text-sm text-muted-foreground">Side-by-side breakdown</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                  <Wallet className="size-4" />
                  Tuned to your budget
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[48rem] text-left text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th scope="col" className="w-48 px-6 py-4 font-semibold text-muted-foreground">
                        Feature
                      </th>
                      {searchProducts.map((product) => (
                        <th scope="col" className="px-6 py-4 font-semibold text-foreground" key={product.name}>
                          {product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 bg-card">
                    <tr className="hover:bg-muted/20 transition-colors">
                      <th scope="row" className="px-6 py-4 font-medium text-muted-foreground">
                        Price
                      </th>
                      {searchProducts.map((product) => (
                        <td className="px-6 py-4 font-semibold text-foreground" key={`${product.name}-price`}>
                          ${product.price.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <th scope="row" className="px-6 py-4 font-medium text-muted-foreground">
                        Battery Life
                      </th>
                      {searchProducts.map((product) => (
                        <td className="px-6 py-4 text-foreground" key={`${product.name}-battery`}>
                          {product.batteryLife}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <th scope="row" className="px-6 py-4 font-medium text-muted-foreground align-top">
                        Key Strengths
                      </th>
                      {searchProducts.map((product) => (
                        <td className="px-6 py-4 text-muted-foreground" key={`${product.name}-reasons`}>
                          <ul className="flex flex-wrap gap-1.5">
                            {product.matchReasons.map((reason, i) => (
                              <li key={i} className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </div>
      </section>
    </main>
  );
}