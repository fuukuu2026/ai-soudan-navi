export default function Step3() {
  return (
    <section className="card">
      <h2>③ 一番困っていることは何ですか？</h2>

      <p className="description">
        一番困っていることを入力してください。
      </p>

      <textarea
        rows={5}
        placeholder={"例）\n何から始めればいいか分かりません"}
      />
    </section>
  );
}