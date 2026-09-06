import { BatteryCharging } from "lucide-react";

type ToolProduct = {
  name: string;
  price: number;
  batteryLife: string;
  matchReasons: readonly string[];
};

type ToolProductCardProps = {
  product: ToolProduct;
};

export default function ToolProductCard({ product }: ToolProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary px-4 py-3">
        <p className="min-w-0 font-bold text-foreground">{product.name}</p>
        <p className="shrink-0 text-lg font-bold text-primary">${product.price}</p>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <BatteryCharging className="size-4 text-primary" />
          <span>{product.batteryLife} battery</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {product.matchReasons.map((reason) => (
            <li
              key={reason}
              className="rounded-full border border-primary/20 bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
            >
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
