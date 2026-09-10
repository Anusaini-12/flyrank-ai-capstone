"use client";

import { useEffect, useState } from "react";
import { Check, LoaderCircle, Send } from "lucide-react";

type SendState = "idle" | "loading" | "success" | "error";

function fakeSend(): Promise<void> {
  const delay = 800 + Math.random() * 1200;

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error("Send failed"));
        return;
      }

      resolve();
    }, delay);
  });
}

export default function SendButton() {
  const [state, setState] = useState<SendState>("idle");

  useEffect(() => {
    if (state !== "success") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setState("idle");
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [state]);

  async function handleClick() {
    if (state === "loading") {
      return;
    }

    setState("loading");

    try {
      await fakeSend();
      setState("success");
    } catch {
      setState("error");
    }
  }

  const buttonWidth = state === "idle" || state === "error" ? "w-28" : "w-20";
  const isError = state === "error";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === "loading"}
      aria-live="polite"
      aria-busy={state === "loading"}
      className={`${buttonWidth} relative inline-flex min-w-20 items-center justify-center overflow-hidden rounded-full px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-[width,background-color,color,border-color] duration-[250ms] ease-in-out motion-reduce:duration-0 hover:duration-150 hover:ease-out focus:outline-none focus-visible:duration-150 focus-visible:ease-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:cursor-wait disabled:opacity-70 ${
        isError
          ? "animate-send-button-shake motion-reduce:animate-none bg-destructive hover:bg-destructive/90"
          : "bg-primary hover:bg-primary/85"
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 transition-opacity duration-200 ${
          state === "idle" || state === "error" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Send aria-hidden="true" className="size-4" />
        {isError ? "Retry" : "Send"}
      </span>
      <LoaderCircle
        aria-hidden="true"
        className={`absolute size-5 transition-opacity duration-200 ${
          state === "loading" ? "animate-spin opacity-100" : "opacity-0"
        }`}
      />
      <Check
        aria-hidden="true"
        className={`absolute size-5 transition-opacity duration-200 ${
          state === "success" ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}