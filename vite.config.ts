import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages（プロジェクトページ）は https://<user>.github.io/ai-soudan-navi/ のような
// サブパスで配信されるため、本番ビルド時のみ base を '/ai-soudan-navi/' にする。
// npm run dev（開発環境）は従来どおりルートパスのまま変更しない。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ai-soudan-navi/' : '/',
  plugins: [react()],
}))
