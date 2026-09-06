"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bookmark, MessageSquare, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function PrimaryNav() {
  const pathname = usePathname();

  if (pathname === "/playground") {
    return null;
  }

  const links = [
    { href: "/", label: "Chat", icon: MessageSquare },
    { href: "/saved", label: "Saved", icon: Bookmark },
    { href: "/health", label: "Health", icon: Activity },
  ];

  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-[1440px] items-center gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4 lg:px-8"
      >
        <Link href="/" className="mr-1 flex shrink-0 items-center gap-3 text-foreground sm:mr-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="size-5" />
          </span>
          <span className="hidden text-base font-bold tracking-tight sm:block">FlyRank <span className="text-primary">AI</span></span>
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-0.5 rounded-2xl border border-border bg-muted p-1 sm:flex-none sm:gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-sm font-semibold transition-colors sm:flex-none sm:gap-2 sm:px-4 ${
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </div>
        <div className="ml-auto hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex">
          <span className="size-2 rounded-full bg-primary shadow-lg shadow-primary/40" />
          AI workspace online
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
