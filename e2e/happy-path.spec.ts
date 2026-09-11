import { expect, test } from "@playwright/test";

test("submits a message and renders the fake assistant reply", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    const stream = [
      { type: "start", messageId: "fake-assistant-message" },
      { type: "text-start", id: "fake-text" },
      { type: "text-delta", id: "fake-text", delta: "Your shortlist is ready." },
      { type: "text-end", id: "fake-text" },
      { type: "finish", finishReason: "stop" },
    ]
      .map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`)
      .join("");

    await route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      headers: {
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
      body: stream,
    });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  const chatInput = page.getByRole("textbox", { name: /refine your request/i });
  await chatInput.click();
  await chatInput.pressSequentially("Find a laptop");
  await expect(page.getByRole("button", { name: /send/i })).toBeEnabled();
  await page.getByRole("button", { name: /send/i }).click();

  await expect(page.getByText("Your shortlist is ready.")).toBeVisible();
});