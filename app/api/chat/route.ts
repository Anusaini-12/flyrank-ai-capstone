import { convertToModelMessages, stepCountIs, streamText } from "ai";

import { MODEL, SYSTEM_PROMPT } from "@/lib/ai-config";
import { searchProductsTool } from "@/lib/tools/search-products";

export const maxDuration = 30;

// This route runs server-side only, so OPENROUTER_API_KEY never reaches the browser.
export async function POST(request: Request) {
  const { messages } = await request.json();

  if (!Array.isArray(messages) || messages.length > 20) {
    return new Response("Too many messages.", { status: 400 });
  }

  const inputSize = JSON.stringify(messages).length;

  if (inputSize > 12000) {
    return new Response("Request is too large.", { status: 400 });
  }

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: MODEL,
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 800,
    tools: { searchProducts: searchProductsTool },
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}
