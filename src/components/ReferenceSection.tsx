type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function ReferenceSection({
  value,
  onChange,
}: Props) {
  return (
    <section className="card card-optional">
      <h2 className="card-title">
        参考資料
      </h2>

      <div className="qa-block">
        <label className="qa-label">
          📄 参考資料はありますか？
        </label>

        <div className="radio-group">
          <label className="radio-item">
            <input
              type="radio"
              name="reference"
              checked={!value}
              onChange={() => onChange(false)}
            />
            なし
          </label>

          <label className="radio-item">
            <input
              type="radio"
              name="reference"
              checked={value}
              onChange={() => onChange(true)}
            />
            あり
          </label>
        </div>

        <p className="description">
          AIに渡したい資料があれば添付してください。
        </p>
      </div>
    </section>
  );
}