export default function CopyComplete() {
  return (
    <section className="card">
      <div className="copy-complete">
        <div className="copy-icon">✅</div>

        <div>
          <h2 className="card-title">
            AIへ貼り付ける文章をコピーしました
          </h2>

          <div className="copy-next-step">
            📋 ご利用のAIへ貼り付けてください。
          </div>

          <div className="copy-info-box">
            <div className="copy-info-title">
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