# AI相談ナビ

AI初心者でも迷わず「AIへの相談文」を作れる、React + TypeScript + Vite製のWebアプリです。
STEP1〜3に沿って入力するだけで、ChatGPT・Claude・Gemini・Copilotなど利用中のAIに合わせた相談文を自動生成します。

## 公開URL

https://fuukuu2026.github.io/ai-soudan-navi/

`main` ブランチにpushすると、GitHub Actionsが自動でビルド・デプロイします。

## 開発環境

```bash
npm install
npm run dev
```

`http://localhost:5173/` で開発サーバーが起動します（公開URLとは独立した開発用環境です）。

## ビルド

```bash
npm run build
```

`dist/` に本番用ビルドが出力されます（GitHub Pages向けに `base: '/ai-soudan-navi/'` が自動で設定されます）。

## Lint

```bash
npm run lint
```
