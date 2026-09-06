import { ArrowUpRight, BatteryCharging, Check, Sparkles, Wallet } from "lucide-react";
import ChatPanel from "@/components/chat/ChatPanel";

const products = [
  { initial: "A", name: "AeroBook Pro 14", label: "Best for battery", price: "$1,299", match: "94%", detail: "18 hr battery", tone: "pink", href: "#aerobook-pro-14" },
  { initial: "N", name: "Northstar Air 13", label: "Best value", price: "$899", match: "87%", detail: "14 hr battery", tone: "plum", href: "#northstar-air-13" },
  { initial: "S", name: "SageBook Flex 13", label: "Best for travel", price: "$1,049", match: "82%", detail: "16 hr battery", tone: "sage", href: "#sagebook-flex-13" },
];

export default function Home() {
  return (
    <main className="flex min-h-[calc(100svh-73px)] flex-1 flex-col bg-transparent md:h-[calc(100svh-73px)] md:min-h-0 md:flex-row md:overflow-hidden">
      <ChatPanel />
      <section className="min-w-0 flex-1 overflow-y-auto px-5 py-8 md:ml-[28%] lg:ml-[24%] lg:px-10 lg:py-10 xl:ml-[22%]">
        <div className="mx-auto max-w-[1100px]">
          <header className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"><Sparkles className="size-4" />Product shortlist</div>
              <h1 className="text-4xl font-bold tracking-[-0.03em] text-foreground lg:text-5xl">Decision board</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">A clear view of the products that best match your current brief.</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Check className="size-5" /></span>
              <span><strong className="block text-foreground">3 strong matches</strong>Updated just now</span>
            </div>
          </header>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/10 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/50">
                <div className={`relative m-2 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border ${product.tone === "pink" ? "bg-accent" : "bg-secondary"}`}>
                  <div className="absolute left-5 top-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground"><span className="size-2 rounded-full bg-primary" />Match signal</div>
                  <span className={`text-7xl font-bold tracking-[-0.08em] ${product.tone === "pink" ? "text-primary/80" : "text-secondary-foreground/80"}`}>{product.initial}</span>
                  <span className="absolute right-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm font-bold text-foreground backdrop-blur-sm">{product.match} match</span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{product.label}</p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">{product.name}</h2>
                  <div className="mt-5 flex items-end justify-between gap-4"><p className="text-3xl font-bold tracking-tight text-foreground">{product.price}</p><span className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><BatteryCharging className="size-4 text-primary" />{product.detail}</span></div>
                  <a href={product.href} className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">View product details<ArrowUpRight className="size-4" /></a>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-7 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/10">
            <div className="flex flex-col justify-between gap-3 border-b border-border px-6 py-5 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Side by side</p><h2 className="mt-1 text-xl font-bold text-foreground">Quick comparison</h2></div><span className="flex items-center gap-2 text-sm text-muted-foreground"><Wallet className="size-4 text-primary" />Tuned to your budget</span></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[48rem] text-left text-base"><thead className="bg-muted text-xs uppercase tracking-[0.14em] text-muted-foreground"><tr><th scope="col" className="px-6 py-4 font-bold">Feature</th><th scope="col" className="px-6 py-4 font-bold">AeroBook Pro 14</th><th scope="col" className="px-6 py-4 font-bold">Northstar Air 13</th><th scope="col" className="px-6 py-4 font-bold">SageBook Flex 13</th></tr></thead><tbody className="divide-y divide-border text-muted-foreground"><tr><th scope="row" className="px-6 py-5 font-semibold text-foreground">Price</th><td className="px-6 py-5 font-semibold text-primary">$1,299</td><td className="px-6 py-5 font-semibold text-secondary-foreground">$899</td><td className="px-6 py-5 font-semibold text-primary">$1,049</td></tr><tr><th scope="row" className="px-6 py-5 font-semibold text-foreground">Battery life</th><td className="px-6 py-5">18 hours</td><td className="px-6 py-5">14 hours</td><td className="px-6 py-5">16 hours</td></tr></tbody></table></div>
          </section>
        </div>
      </section>
    </main>
  );
}
