export type AIType = "chatgpt" | "claude" | "gemini" | "copilot";

export interface AIOption {
  id: AIType;
  name: string;
}

export const AI_OPTIONS: AIOption[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
  },
  {
    id: "claude",
    name: "Claude",
  },
  {
    id: "gemini",
    name: "Gemini",
  },
  {
    id: "copilot",
    name: "Copilot",
  },
];