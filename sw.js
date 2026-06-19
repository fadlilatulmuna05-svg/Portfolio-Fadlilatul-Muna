const CACHE_NAME = 'profile-pwa-v2';

const urlsToCache = [
  './index.html',
  './beranda.html',
  './myprofile.html',
  './manifest.json',

  './css/index.css',
  './css/beranda.css',
  './css/myprofile.css',

  './img/fadila.jpeg',
  './img/fadilamuna.jpeg',
  './img/bgmyprofile.jpeg',
  './img/background.jpeg',

  './img/icon-192.png',
  './img/icon-512.png',

  './audio/perkenalan.aac'
];
// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});