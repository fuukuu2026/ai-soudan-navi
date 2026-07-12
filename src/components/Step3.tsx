type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Step3({
  value,
  onChange,
}: Props) {
  return (
    <section className="card">
      <p className="card-eyebrow">
        STEP 3
      </p>

      <h2 className="card-title">
        ③ AIに何を手伝ってほしいですか？
      </h2>

      <div className="qa-block">
        <p className="description">
          してほしいことを、そのまま入力してください。
        </p>

        <p className="inline-example">
          例）「方法を教えてほしい」「候補を3つ提案してほしい」など
        </p>

        <textarea
          className="qa-input"
          rows={5}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="自由に入力してください"
        />
      </div>
    </section>
  );
}
