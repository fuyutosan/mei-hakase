// 愛生博士クイズ — オフライン対応サービスワーカー
const CACHE = 'mei-hakase-v2';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './quiz-data.js',
  './manifest.webmanifest',
  './assets/Meimei.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // ブラウザのHTTPキャッシュ経由で古い内容を拾わないよう、必ずネットワークから取り直す
      Promise.all(ASSETS.map((url) => fetch(url, { cache: 'reload' }).then((res) => c.put(url, res))))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached || fetch(e.request).catch(() => caches.match('./index.html'))
    )
  );
});
