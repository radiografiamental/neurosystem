const CACHE_NAME = 'neurosystem-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  // Force immediate activation without waiting
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      // Take control of all open clients immediately
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    // Network first strategy — always try to get fresh content
    fetch(e.request).then(function(response) {
      // Update cache with fresh response
      var responseClone = response.clone();
      caches.open(CACHE_NAME).then(function(cache) {
        cache.put(e.request, responseClone);
      });
      return response;
    }).catch(function() {
      // Fallback to cache only if offline
      return caches.match(e.request);
    })
  );
});
