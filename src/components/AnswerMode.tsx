import { ANSWER_MODES } from "../data/answerMode";

type AnswerModeProps = {
  answerMode: string;
  setAnswerMode: (value: string) => void;
};

export default function AnswerMode({
  answerMode,
  setAnswerMode,
}: AnswerModeProps) {
  return (
    <section className="card card-optional">
      <h2 className="card-title">
        回答設定
      </h2>

      <p className="description">
        AIにどのように回答してほしいかを選べます。変更しなくても、そのまま使えます。
      </p>

      {ANSWER_MODES.map((mode) => (
        <div
          key={mode.id}
          className="answer-mode-item"
        >
          <label className="radio-item">
            <input
              type="radio"
              name="answerMode"
              value={mode.id}
              checked={answerMode === mode.id}
              onChange={() =>
                setAnswerMode(mode.id)
              }
            />

            <span>{mode.name}</span>
          </label>
        </div>
      ))}
    </section>
  );
}