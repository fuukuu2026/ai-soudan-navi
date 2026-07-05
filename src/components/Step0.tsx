import { AI_OPTIONS } from "../data/ai";

export default function Step0() {
  return (
    <section className="card">
      <h2>初期設定</h2>

      <p className="description">
        普段利用しているAIを選択してください。
        <br />
        この設定は保存されるため、通常は毎回選ぶ必要はありません。
      </p>

      <div className="ai-grid">
        {AI_OPTIONS.map((ai) => (
          <button key={ai.id} className="ai-card">
            <div>{ai.icon}</div>
            <div>{ai.name}</div>
          </button>
        ))}
      </div>
    </section>
  );
}