import { convertToModelMessages, streamText } from "ai";

import { MODEL, SYSTEM_PROMPT } from "@/lib/ai-config";

// This route runs server-side only, so OPENROUTER_API_KEY never reaches the browser.
export async function POST(request: Request) {
  const { messages } = await request.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: MODEL,
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 2048,
  });

  return result.toUIMessageStreamResponse();
}