/* ===================================================
   IMP – Icon Maker Pro Service Worker
   オフライン対応 & 最新版自動読み込み (Network First / Stale-While-Revalidate)
   =================================================== */

const CACHE_NAME = 'imp-pwa-v1.0.16';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './sample_icons_data.js',
  './manifest.json',
  './IMP_192.png',
  './IMP_512.png',
  './apple-touch-icon.png'
];

// 1. インストール：事前キャッシュして即座に待機状態をスキップ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. アクティベート：古いキャッシュを自動削除し、即座にクライアントを制御
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. フェッチ：リクエスト種別ごとの最適キャッシュ戦略
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Google Analytics / Google Tag Manager の通信はキャッシュせず直接ネットワークへ
  if (url.hostname.includes('google-analytics.com') ||
      url.hostname.includes('googletagmanager.com') ||
      url.hostname.includes('analytics.google.com')) {
    return;
  }

  // A. ナビゲーションリクエスト (HTMLページ) -> Network First (ネットワーク優先)
  // オンライン時は必ず最新のHTMLを取得してキャッシュを更新。オフライン時のみキャッシュを返す
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // B. 同一オリジンの静的リソース (CSS, JS, 画像, JSON等) -> Stale-While-Revalidate
  // 高速にキャッシュを返しながら、裏で最新を取得して次回以降または即時更新
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // オフライン時は何もしない
        });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // C. 外部CDN (cdnjs, Google Fonts等) -> Cache First (キャッシュ優先)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);
    })
  );
});

// 4. メッセージリスナー ('SKIP_WAITING' を受け取ったら即時アクティブ化)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
