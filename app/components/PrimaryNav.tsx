"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrimaryNav() {
  const pathname = usePathname();

  if (pathname === "/playground") {
    return null;
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4"
      >
        <Link
          href="/"
          className="font-semibold text-zinc-900 transition-colors hover:text-primary-600 active:text-primary-600"
        >
          Chat
        </Link>
        <Link
          href="/saved"
          className="text-zinc-600 transition-colors hover:text-primary-600 active:text-primary-600"
        >
          Saved
        </Link>
        <Link
          href="/health"
          className="text-zinc-600 transition-colors hover:text-primary-600 active:text-primary-600"
        >
          Health
        </Link>
      </nav>
    </header>
  );
}
