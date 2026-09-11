import { ArrowUpRight } from "lucide-react";

type ToolProduct = {
  link: string;
  name: string;
  price: number;
  batteryLife: string;
  matchReasons: readonly string[];
  source?: string;
};

type ToolProductCardProps = {
  product: ToolProduct;
};

export default function ToolProductCard({ product }: ToolProductCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {product.source ?? "Product"}
          </p>

          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">
            {product.name}
          </h3>
        </div>

        <p className="shrink-0 text-base font-bold text-primary">
          ${product.price.toLocaleString()}
        </p>
      </div>

      {product.matchReasons.length > 0 ? (
        <ul className="mt-3 list-disc pl-6 text-primary space-y-1 text-xs text-muted-foreground">
          {product.matchReasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      ) : null}

      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        View product
        <ArrowUpRight className="size-3.5" />
      </a>
    </article>
  );
}

