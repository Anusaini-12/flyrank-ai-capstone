import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// The OpenRouter model used by the shopping assistant.
export const MODEL = openrouter("anthropic/claude-sonnet-4.5");

// The assistant's role and priorities when helping users shop.
export const SYSTEM_PROMPT =
  "You are an AI shopping assistant who helps users find products based on their needs, budget, and priorities.";