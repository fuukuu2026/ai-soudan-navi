export default function CopyComplete() {
  return (
    <section className="card">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "28px" }}>✅</div>

        <div>
          <h2 className="card-title">
            AIへ貼り付ける文章をコピーしました
          </h2>

          <p className="description">
            ご利用のAIへ貼り付けてください。
            <br />
            📎 参考資料がある場合は、
            <br />
            AIのチャット欄へ添付してください。
            <br />
            より正確な回答につながります。
          </p>
        </div>
      </div>
    </section>
  );
}