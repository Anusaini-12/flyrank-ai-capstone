import { convertToModelMessages, stepCountIs, streamText } from "ai";

import { MODEL, SYSTEM_PROMPT } from "@/lib/ai-config";
import { checkRateLimit } from "@/lib/rate-limit";
import { searchProductsTool } from "@/lib/tools/search-products";

export const maxDuration = 30;

// This route runs server-side only,
export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const identifier =
    forwardedFor?.split(",", 1)[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const { success } = await checkRateLimit(identifier);

  if (!success) {
    return Response.json(
      { error: "Too many requests, please try again later" },
      { status: 429 },
    );
  }

  const { messages } = await request.json();

  if (!Array.isArray(messages) || messages.length > 50) {
    return new Response("Too many messages.", { status: 400 });
  }

  const hasOversizedMessage = messages.some((message) => {
    if (!message || typeof message !== "object") {
      return false;
    }

    const record = message as Record<string, unknown>;

    if (typeof record.content === "string") {
      return record.content.length > 2000;
    }

    if (!Array.isArray(record.parts)) {
      return false;
    }

    const textContent = record.parts
      .filter(
        (part): part is { type: "text"; text: string } =>
          Boolean(part) &&
          typeof part === "object" &&
          (part as Record<string, unknown>).type === "text" &&
          typeof (part as Record<string, unknown>).text === "string",
      )
      .map((part) => part.text)
      .join("");

    return textContent.length > 2000;
  });

  if (hasOversizedMessage) {
    return new Response("Message text is too long.", { status: 400 });
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
    maxRetries: 0,
    maxOutputTokens: 800,
    tools: { searchProducts: searchProductsTool },
    stopWhen: stepCountIs(1),
  });

  return result.toUIMessageStreamResponse();
}
