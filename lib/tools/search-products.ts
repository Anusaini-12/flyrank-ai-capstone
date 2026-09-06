import { tool } from "ai";
import { z } from "zod";

export const inputSchema = z.object({
  category: z.string().describe("The product category to search for, such as laptops or headphones."),
  maxPrice: z.number().optional().describe("The maximum acceptable price for the product."),
  priorities: z
    .array(z.string())
    .optional()
    .describe("The product qualities that matter most, such as battery life or budget."),
});

const products = [
  {
    id: "laptop-air-14",
    name: "AeroBook Air 14",
    price: 899,
    category: "laptops",
    batteryLife: "18 hours",
    matchReasons: ["long battery life", "lightweight", "quiet keyboard"],
  },
  {
    id: "laptop-pro-16",
    name: "ForgeBook Pro 16",
    price: 1499,
    category: "laptops",
    batteryLife: "12 hours",
    matchReasons: ["high performance", "large display", "durable build"],
  },
  {
    id: "headphones-quiet",
    name: "QuietSound 700",
    price: 299,
    category: "headphones",
    batteryLife: "30 hours",
    matchReasons: ["excellent noise cancellation", "long battery life", "comfortable fit"],
  },
  {
    id: "headphones-pocket",
    name: "PocketBeat Wireless",
    price: 99,
    category: "headphones",
    batteryLife: "20 hours",
    matchReasons: ["budget friendly", "compact design", "balanced sound"],
  },
  {
    id: "phone-vision",
    name: "Vision X",
    price: 799,
    category: "phones",
    batteryLife: "24 hours",
    matchReasons: ["bright camera", "fast charging", "long battery life"],
  },
  {
    id: "phone-compact",
    name: "Mini One",
    price: 499,
    category: "phones",
    batteryLife: "20 hours",
    matchReasons: ["budget friendly", "compact design", "reliable performance"],
  },
] as const;

type SearchProductsInput = z.infer<typeof inputSchema>;

async function execute(input: SearchProductsInput) {
  const category = input.category.trim().toLowerCase();
  const priorities = input.priorities?.map((priority) => priority.toLowerCase()) ?? [];

  const matchingProducts = products
    .filter(
      (product) =>
        product.category.toLowerCase() === category &&
        (input.maxPrice === undefined || product.price <= input.maxPrice),
    )
    .map((product, index) => {
      const searchableText = [
        product.name,
        product.category,
        product.batteryLife,
        ...product.matchReasons,
      ].join(" ").toLowerCase();
      const priorityScore = priorities.reduce(
        (score, priority) => score + (searchableText.includes(priority) ? 1 : 0),
        0,
      );

      return { product, priorityScore, index };
    })
    .sort((left, right) => right.priorityScore - left.priorityScore || left.index - right.index)
    .slice(0, 3)
    .map(({ product }) => product);

  return { products: matchingProducts };
}

export const searchProductsTool = tool({
  description: "Search the product catalog by category, budget, and the qualities the shopper prioritizes.",
  inputSchema,
  execute,
});
