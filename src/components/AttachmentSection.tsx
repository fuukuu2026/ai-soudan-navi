export default function AttachmentSection() {
  return (
    <section className="card">
      <h2>📄 参考資料はありますか？</h2>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="attachment"
            value="yes"
          />
          はい
        </label>

        <label>
          <input
            type="radio"
            name="attachment"
            value="no"
          />
          いいえ
        </label>
      </div>
    </section>
  );
}