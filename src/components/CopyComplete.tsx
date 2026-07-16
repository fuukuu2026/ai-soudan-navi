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

          <div
            style={{
              marginTop: "12px",
              marginLeft: "16px",
              marginBottom: "16px",
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            📋 ご利用のAIへ貼り付けてください。
          </div>

          <div
            style={{
              marginLeft: "16px",
              padding: "12px 16px",
              background: "var(--color-info-bg)",
              border: "1px solid var(--color-info-border)",
              borderRadius: "10px",
              maxWidth: "340px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "8px",
                color: "var(--color-text)",
              }}
            >
              📎 参考資料がある場合
            </div>

            <div className="description">
              AIのチャット欄へ添付してください。
              <br />
              より正確な回答につながります。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}