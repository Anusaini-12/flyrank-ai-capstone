"use client";

import { FormEvent, useState } from "react";

const initialMessages = [
  {
    author: "You",
    text: "I need a lightweight laptop for travel and long work sessions.",
  },
  {
    author: "FlyRank AI",
    text: "I found two strong options. I will weigh portability, price, and battery life as we refine the brief.",
  },
];

export default function ChatPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();

    if (!message) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { author: "You", text: message },
    ]);
    setDraft("");
  }

  return (
    <section className="flex min-h-[32rem] flex-1 flex-col border-b border-zinc-200 bg-zinc-50 md:min-h-0 md:basis-[38%] md:border-b-0 md:border-r">
      <div className="border-b border-zinc-200 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F6E56]">
          Conversation
        </p>
        <h2 className="mt-1 text-xl font-semibold text-zinc-950">
          Chat &amp; refinement
        </h2>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {messages.map((message, index) => (
          <article
            key={`${message.author}-${index}`}
            className={
              message.author === "You"
                ? "ml-8 rounded-2xl rounded-br-sm bg-[#0F6E56] px-4 py-3 text-white"
                : "mr-8 rounded-2xl rounded-bl-sm border border-zinc-200 bg-white px-4 py-3 text-zinc-700"
            }
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-70">
              {message.author}
            </p>
            <p className="text-sm leading-6">{message.text}</p>
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-zinc-200 bg-white p-4">
        <label htmlFor="chat-message" className="sr-only">
          Refine your request
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white p-1.5 shadow-sm focus-within:border-[#0F6E56] focus-within:ring-1 focus-within:ring-[#0F6E56]">
          <input
            id="chat-message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Refine your request..."
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#0F6E56] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b5945] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!draft.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
