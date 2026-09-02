import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlyRank AI",
  description: "AI-powered workflows for better search visibility.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
        {children}
      </body>
    </html>
  );
}
