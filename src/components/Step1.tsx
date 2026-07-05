export default function Step1() {
  return (
    <section className="card">
      <h2>① 何について相談しますか？</h2>

      <p className="description">
        AIへ相談したい内容を入力してください。
      </p>

      <textarea
        rows={5}
     placeholder={"例）\nExcelでマクロを作りたい"}
      />
    </section>
  );
}