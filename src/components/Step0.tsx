import { useEffect, useState } from "react";
import { AI_OPTIONS } from "../data/ai";

const STORAGE_KEY = "selected-ai";

export default function Step0() {
  const [selectedAI, setSelectedAI] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) ?? "chatgpt";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedAI);
  }, [selectedAI]);

  return (
    <section className="card">
      <p className="card-eyebrow">
        STEP 0
      </p>

      <h2 className="card-title">
        利用するAI
      </h2>

      <div className="ai-grid">
        {AI_OPTIONS.map((ai) => (
          <label
            key={ai.id}
            className={`ai-card ${
              selectedAI === ai.id ? "ai-card-selected" : ""
            }`}
          >
            <input
              type="radio"
              name="ai"
              value={ai.id}
              checked={selectedAI === ai.id}
              onChange={() => setSelectedAI(ai.id)}
            />

            <span>{ai.label}</span>

            <span className="ai-description">
              {ai.description}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}