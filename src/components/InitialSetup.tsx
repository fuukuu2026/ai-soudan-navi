import { useState } from "react";
import { AI_OPTIONS } from "../data/ai";

type InitialSetupProps = {
  onComplete: () => void;
};

export default function InitialSetup({
  onComplete,
}: InitialSetupProps) {
  const [selectedAI, setSelectedAI] = useState(() => {
    return localStorage.getItem("selected-ai") ?? "chatgpt";
  });

  const handleSave = () => {
    localStorage.setItem("selected-ai", selectedAI);
    localStorage.setItem("initial-setup-complete", "true");

    onComplete();
  };

  return (
    <main className="main-container">
      <section className="card">
        <p className="card-eyebrow">
          初期設定
        </p>

        <h2 className="card-title">
          利用するAI
        </h2>

        <p className="description">
          普段利用しているAIを選択してください。
          <br />
          この設定はあとから変更できます。
        </p>

        <div className="ai-grid">
          {AI_OPTIONS.map((ai) => (
            <label
              key={ai.id}
              className="ai-card"
            >
              <input
                type="radio"
                name="ai"
                value={ai.id}
                checked={selectedAI === ai.id}
                onChange={() =>
                  setSelectedAI(ai.id)
                }
              />

              <span>{ai.label}</span>
              <span className="ai-description">{ai.description}</span>
            </label>
          ))}
        </div>

        <button
          className="primary-button"
          onClick={handleSave}
        >
          保存して開始
        </button>
      </section>
    </main>
  );
}