import { ANSWER_MODES } from "../data/answerMode";
import { AI_OPTIONS } from "../data/ai";

type GeneratePromptParams = {
  consultation: {
    topic: string;
    situation: string;
    trouble: string;
  };
  supplement: string;
  answerMode: string;
  hasReference: boolean;
  selectedAI: string;
};

export function generatePrompt({
  consultation,
  supplement,
  answerMode,
  hasReference,
  selectedAI,
}: GeneratePromptParams) {
  const mode =
    ANSWER_MODES.find(
      (item) => item.id === answerMode
    ) ?? ANSWER_MODES[0];

  const ai =
    AI_OPTIONS.find((item) => item.id === selectedAI) ??
    AI_OPTIONS[0];

  const prompt = `
${ai.optimizationPrompt}

以下の内容について相談したいです。

【相談内容】
${consultation.topic}

【現在の状況】
${consultation.situation}

【AIに手伝ってほしいこと】
${consultation.trouble}

${
  supplement.trim()
    ? `【追加で伝えたいこと】
${supplement}`
    : ""
}

${
  hasReference
    ? `【参考資料】
この後、参考資料を添付します。`
    : ""
}

【回答の希望】
${mode.prompt}

私の状況に合わせて回答してください。

情報が不足している場合は、
勝手に決めつけず、
必要なことを質問してから回答してください。
`;

  return prompt.trim();
}
