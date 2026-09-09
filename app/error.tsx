"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, RefreshCw, Sparkles } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100dvh-73px)] flex-1 items-center justify-center bg-muted/10 px-5 py-12 sm:px-8">
      <section className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="size-7" aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          A small pause
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          We couldn&apos;t load this view
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Something unexpected happened. You can try the view again or return to
          your workspace.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={() => reset()} className="w-full sm:w-auto">
            <RefreshCw aria-hidden="true" />
            Try again
          </Button>
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              className: "w-full sm:w-auto",
            })}
          >
            <ArrowLeft aria-hidden="true" />
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}