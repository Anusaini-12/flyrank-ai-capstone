import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";

import type { ChatPanelProps, ChatUIMessage } from "./ChatPanel";
import ChatPanel from "./ChatPanel";

const { mockUseChat } = vi.hoisted(() => ({
  mockUseChat: vi.fn(),
}));

vi.mock("@ai-sdk/react", () => ({
  useChat: mockUseChat,
}));

const defaultChat: ChatPanelProps = {
  error: undefined,
  messages: [],
  sendMessage: vi.fn().mockResolvedValue(undefined),
  status: "ready",
  stop: vi.fn().mockResolvedValue(undefined),
  regenerate: vi.fn().mockResolvedValue(undefined),
};

function renderWithChat(overrides: Partial<ChatPanelProps> = {}) {
  mockUseChat.mockReturnValue({ ...defaultChat, ...overrides });
  render(<ChatPanel {...mockUseChat()} />);
}

function assistantMessage(text: string): ChatUIMessage {
  return {
    id: "assistant-message",
    role: "assistant",
    parts: [{ type: "text", text }],
  } as ChatUIMessage;
}

describe("ChatPanel", () => {
  it("shows the loading skeleton while a response is submitted", () => {
    renderWithChat({ status: "submitted" });

    expect(
      screen.getByRole("status", { name: /assistant is thinking/i }),
    ).toBeInTheDocument();
  });

  it("renders partial assistant text while streaming", () => {
    renderWithChat({
      status: "streaming",
      messages: [assistantMessage("Partial response")],
    });

    expect(screen.getByText("Partial response")).toBeInTheDocument();
  });

  it("shows the error banner and retries when requested", async () => {
    const user = userEvent.setup();
    const regenerate = vi.fn().mockResolvedValue(undefined);

    renderWithChat({ error: new Error("Request failed"), regenerate });

    expect(screen.getByText(/the last message failed/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /retry/i }));

    expect(regenerate).toHaveBeenCalledTimes(1);
  });
});