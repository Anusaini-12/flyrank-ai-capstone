import { tool } from "ai";
import { getJson } from "serpapi";
import { z } from "zod";

export const inputSchema = z.object({
  category: z.string().describe("The product category to search for, such as laptops or headphones."),
  maxPrice: z.number().optional().describe("The maximum acceptable price for the product."),
  priorities: z
    .array(z.string())
    .optional()
    .describe("The product qualities that matter most, such as battery life or budget."),
});

const MOCK_MODE = process.env.MOCK_MODE === "true";

const mockProducts = [
  {
    id: "laptop-air-14",
    name: "AeroBook Air 14",
    price: 899,
    category: "laptops",
    batteryLife: "18 hours",
    matchReasons: ["long battery life", "lightweight", "quiet keyboard"],
    image: "",
  },
  {
    id: "laptop-pro-16",
    name: "ForgeBook Pro 16",
    price: 1499,
    category: "laptops",
    batteryLife: "12 hours",
    matchReasons: ["high performance", "large display", "durable build"],
    image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf",
  },
  {
    id: "headphones-quiet",
    name: "QuietSound 700",
    price: 299,
    category: "headphones",
    batteryLife: "30 hours",
    matchReasons: ["excellent noise cancellation", "long battery life", "comfortable fit"],
    image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf",
  },
  {
    id: "headphones-pocket",
    name: "PocketBeat Wireless",
    price: 99,
    category: "headphones",
    batteryLife: "20 hours",
    matchReasons: ["budget friendly", "compact design", "balanced sound"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
  {
    id: "phone-vision",
    name: "Vision X",
    price: 799,
    category: "phones",
    batteryLife: "24 hours",
    matchReasons: ["bright camera", "fast charging", "long battery life"],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    id: "phone-compact",
    name: "Mini One",
    price: 499,
    category: "phones",
    batteryLife: "20 hours",
    matchReasons: ["budget friendly", "compact design", "reliable performance"],
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
  },
] as const;

type SearchProductsInput = z.infer<typeof inputSchema>;

console.log(mockProducts);

function mockExecute(input: SearchProductsInput) {
  const category = input.category.trim().toLowerCase();
  const priorities = input.priorities?.map((priority) => priority.toLowerCase()) ?? [];

  const matchingProducts = mockProducts
    .filter(
      (product) =>
        (product.category.toLowerCase().includes(category) ||
          category.includes(product.category.toLowerCase())) &&
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
    .map(({ product }) => ({ ...product, link: "" }));

  return { products: matchingProducts };
}

async function execute(input: SearchProductsInput) {
  if (MOCK_MODE) {
    return mockExecute(input);
  }

  const category = input.category.trim();
  const maxPrice = input.maxPrice;
  const priorities = input.priorities?.map((priority) => priority.trim()).filter(Boolean) ?? [];
  const query = [
    category,
    ...priorities,
    maxPrice === undefined ? undefined : `under $${maxPrice}`,
  ]
    .filter(Boolean)
    .join(" ");

  try {
    const response = await getJson({
      api_key: process.env.SERPAPI_API_KEY,
      engine: "google_shopping",
      gl: "in",
      hl: "en",
      google_domain: "google.co.in",
      q: query,
    });

   console.log("Search query:", query);
   console.log("Shopping results:", response.shopping_results?.slice(0, 1));

    const shoppingResults = Array.isArray(response.shopping_results)
      ? response.shopping_results
      : [];
    const affordableResults =
      maxPrice === undefined
        ? shoppingResults
        : shoppingResults.filter(
            (result) =>
              typeof result.extracted_price === "number" &&
              Number.isFinite(result.extracted_price) &&
              result.extracted_price <= maxPrice,
          );

    if (shoppingResults.length === 0) {
      throw new Error(`No products found for "${category}".`);
    }
    if (affordableResults.length === 0) {
      throw new Error(`No products found for "${category}" within your budget.`);
    }

    return {
      products: affordableResults.slice(0, 3).map((result, index) => {
        const matchReasons: string[] = [];
        const rating = result.rating;
        const reviews = result.reviews;

        if (rating !== undefined && reviews !== undefined) {
          matchReasons.push(`${rating} stars, ${reviews} reviews`);
        } else if (rating !== undefined) {
          matchReasons.push(`${rating} stars`);
        } else if (reviews !== undefined) {
          matchReasons.push(`${reviews} reviews`);
        }

        if (typeof result.tag === "string" && result.tag.length > 0) {
          matchReasons.push(result.tag);
        }

        if (typeof result.delivery === "string" && result.delivery.length > 0) {
          matchReasons.push(result.delivery);
        }

        return {
          id: result.product_id ?? result.link ?? `${result.title ?? "product"}-${index}`,
          name: result.title ?? "Unnamed product",
          price: Number.parseFloat(String(result.price ?? result.extracted_price ?? "0").replace(/[^\d.]/g, "")),
          image: result.thumbnail ?? "",
          batteryLife: result.battery_life ?? result.extracted_specs?.battery_life ?? "N/A",
          matchReasons,
          link: result.product_link ?? result.link ?? "",
        };
      }),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Product search failed: ${message}`);
  }
}

export const searchProductsTool = tool({
  description: "Search the product catalog by category, budget, and the qualities the shopper prioritizes.",
  inputSchema,
  execute,
});
