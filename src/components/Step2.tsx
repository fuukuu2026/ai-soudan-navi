type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Step2({
  value,
  onChange,
}: Props) {
  return (
    <section className="card">
      <p className="card-eyebrow">
        STEP 2
      </p>

      <h2 className="card-title">
        ② 今の状況を教えてください
      </h2>

      <div className="qa-block">

        <p className="description">
          わかる範囲でOK。
          <br />
          数字（予算・期限など）があると回答の精度が上がります。
        </p>

        <p className="inline-example">
          例）「毎月同じ作業に時間がかかっている」「予算10万円以内」など
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
