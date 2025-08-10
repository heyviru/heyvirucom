/*
  Simple service worker with:
  - Cache-first for app shell and static assets
  - Stale-while-revalidate for JSON content lists
  - Bypass caching for video streams
  - Offline fallback route
*/
const APP_SHELL = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/icons/icon.svg'
];

const STATIC_CACHE = 'static-v1';
const CONTENT_CACHE = 'content-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => {
      if (![STATIC_CACHE, CONTENT_CACHE].includes(k)) return caches.delete(k);
    }))).then(() => self.clients.claim())
  );
});

function isVideoRequest(request) {
  const url = new URL(request.url);
  return url.pathname.endsWith('.mp4') || url.pathname.endsWith('.webm');
}

function isDataRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/data/') || url.pathname.endsWith('.json');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET') return; // let POST/PUT pass through

  if (isVideoRequest(request)) return; // do not cache video streams

  // HTML navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(STATIC_CACHE);
        return (await cache.match('/offline')) || Response.error();
      })
    );
    return;
  }

  // JSON and data: stale-while-revalidate
  if (isDataRequest(request)) {
    event.respondWith((async () => {
      const cache = await caches.open(CONTENT_CACHE);
      const cached = await cache.match(request);
      const networkPromise = fetch(request).then((res) => {
        cache.put(request, res.clone());
        return res;
      }).catch(() => null);
      return cached || networkPromise || fetch(request);
    })());
    return;
  }

  // Static assets: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      const res = await fetch(request);
      if (res.ok) cache.put(request, res.clone());
      return res;
    })());
  }
});

// Placeholder for push-ready architecture
self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'Notification', body: '' };
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body }));
});


