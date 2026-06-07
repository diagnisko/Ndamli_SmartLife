const CACHE_NAME = 'ndamli-static-v1';
const RUNTIME = 'ndamli-runtime';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.ico',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => {
      if (key !== CACHE_NAME && key !== RUNTIME) return caches.delete(key);
    }))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Serve images from cache-first
  if (url.pathname.startsWith('/images/recipes')) {
    event.respondWith(
      caches.open(RUNTIME).then(cache => cache.match(event.request).then(resp => resp || fetch(event.request).then(networkResp => { cache.put(event.request, networkResp.clone()); return networkResp; })))
    );
    return;
  }

  // For other requests: network-first then cache
  event.respondWith(
    fetch(event.request).then(response => {
      return caches.open(RUNTIME).then(cache => { cache.put(event.request, response.clone()); return response; });
    }).catch(() => caches.match(event.request))
  );
});
