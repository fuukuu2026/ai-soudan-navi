import { AI_OPTIONS } from "../data/ai";

function Step0() {
  return (
    <section>
      <h2>STEP0 AIを選択</h2>

      {AI_OPTIONS.map((ai) => (
        <button key={ai.id}>
          {ai.name}
        </button>
      ))}
    </section>
  );
}

export default Step0;