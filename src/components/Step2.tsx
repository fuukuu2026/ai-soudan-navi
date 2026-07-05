export default function Step2() {
  return (
    <section className="card">
      <h2>② 今はどうなっていますか？</h2>

      <p className="description">
        現在の状況を入力してください。
      </p>

      <textarea
        rows={5}
        placeholder={"例）\nエラーが出ています"}
      />
    </section>
  );
}