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
この文章はAI相談ナビというツールを使って作成しました。

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

【回答モード】
${mode.name}

${mode.prompt}

回答モードは以下から選べます。
会話の途中で「モード」という言葉と、下記のいずれかの名前を含めて伝えてください（記号は不要です）。

例
「アイデアモードにして」
「モードを詳しくに変えて」

・おすすめ
・詳しく
・アイデア
・初心者
・その他
　上記に当てはまらない要望は、そのまま新しい回答ルールとして扱ってください。

どのモードへ変更した場合も、

「○○モードへ切り替えました。
（他の選択肢：おすすめ／詳しく／アイデア／初心者／その他）」

のように一言伝えてから回答してください。

その後、それまで相談していた内容について、
新しい回答モードでそのまま回答を続けてください。

ユーザーに「回答して」と入力し直させる必要はありません。

「今のモードは？」

と質問された場合は、
切り替えは行わず、
現在適用中の回答モードだけを答えてください。

ユーザーが

「モード」

と入力した場合は、

現在利用できる回答モード一覧を表示してください。

現在の回答モードも表示してください。

表示内容

・おすすめ（バランスよく回答）
・詳しく説明してほしい
・アイデアをたくさん出してほしい
・初心者にも分かるように説明してほしい
・その他（自由に希望を書いてください）

変更例

・「アイデアモードにして」
・「モードを詳しくに変えて」
・「初心者モードにして」
・「その他：図や表を使って説明して」
・「その他：結論だけ簡潔に教えて」

━━━━━━━━━━━━━━━━━━━━

💡 次の操作

【変更したい場合】

上の例を参考に、
希望するモードを入力してください。

【変更しない場合】

そのまま続けて質問・相談してください。

※ 回答は現在のモードのまま続きます。

━━━━━━━━━━━━━━━━━━━━

私の状況に合わせて回答してください。

情報が不足している場合は、
勝手に決めつけず、
必要なことを質問してから回答してください。

━━━━━━━━━━━━━━━━━━━━

【初回回答時の案内】

最初の回答の最後に、必ず次の案内を表示してください。

━━━━━━━━━━━━━━━━━━━━

💡 この会話では回答モードを途中で変更できます。

「モード」

と入力すると、
利用できる回答モード一覧を表示します。

━━━━━━━━━━━━━━━━━━━━

この案内は初回回答時のみ表示してください。
2回目以降の回答では表示しないでください。
`;

  return prompt.trim();
}