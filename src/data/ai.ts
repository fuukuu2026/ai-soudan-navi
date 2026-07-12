export type AIType =
  | "chatgpt"
  | "claude"
  | "gemini"
  | "copilot";

export interface AIOption {
  id: AIType;
  label: string;
  optimizationPrompt: string;
  description: string;
}

export const AI_OPTIONS: AIOption[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    optimizationPrompt:
      "私の状況に合わせて、具体的に回答してください。",
    description: "バランスが良く、幅広い相談におすすめ",
  },
  {
    id: "claude",
    label: "Claude",
    optimizationPrompt:
      "私の状況を踏まえて、実行できる形で回答してください。",
    description: "丁寧な文章や長文の相談が得意",
  },
  {
    id: "gemini",
    label: "Gemini",
    optimizationPrompt:
      "箇条書きだけではなく、理由も含めて説明してください。",
    description: "最新情報の調べものが得意",
  },
  {
    id: "copilot",
    label: "Copilot",
    optimizationPrompt:
      "要点を整理し、具体的な手順や選択肢を示してください。",
    description: "WordやExcelなどOffice作業の相談が得意",
  },
];
