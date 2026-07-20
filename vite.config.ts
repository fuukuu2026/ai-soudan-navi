import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// GitHub Pages（プロジェクトページ）は https://<user>.github.io/ai-soudan-navi/ のような
// サブパスで配信されるため、本番ビルド時のみ base を '/ai-soudan-navi/' にする。
// npm run dev（開発環境）は従来どおりルートパスのまま変更しない。
export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/ai-soudan-navi/' : '/'

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icons.svg'],
        manifest: {
          name: 'AI相談ナビ',
          short_name: 'AI相談ナビ',
          description: 'AIへ送る相談文をかんたんに作成できるツールです。',
          theme_color: '#c4924f',
          background_color: '#f5f3ec',
          display: 'standalone',
          start_url: base,
          scope: base,
          lang: 'ja',
          icons: [
            {
              src: 'icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'icons/icon-192-maskable.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: 'icons/icon-512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          // 相談文作成までオフラインで完結できるよう、ビルド成果物一式を
          // プリキャッシュし、ナビゲーションはすべてキャッシュ済みの index.html にフォールバックする。
          globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
          navigateFallback: `${base}index.html`,
          runtimeCaching: [
            {
              urlPattern: ({ request }) =>
                request.destination === 'image',
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
  }
})
