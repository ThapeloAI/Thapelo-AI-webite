const CACHE = 'vukastream-v1';
const ASSETS = ['/', '/index.html', '/manifest.webmanifest', '/assets/logo.svg'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((resp) => resp || fetch(event.request)));
});
