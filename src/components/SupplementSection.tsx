type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SupplementSection({
  value,
  onChange,
}: Props) {
  return (
    <section className="card card-optional">
      <h2 className="card-title">
        追加で伝えたいこと
      </h2>

      <div className="qa-block">
        <p className="description">
          不安・希望・条件など、
          <br />
          AIに伝えておきたいことがあれば入力してください。
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
