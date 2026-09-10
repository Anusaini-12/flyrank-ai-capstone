import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import ConditionalNav from "./components/ConditionalNav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalNav />
        {children}
      </body>
    </html>
  );
}
