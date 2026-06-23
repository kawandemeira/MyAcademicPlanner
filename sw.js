const CACHE_NAME = 'planner-academico-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação: Cache dos arquivos base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para funcionar offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache se encontrar, senão vai para a rede
        return response || fetch(event.request);
      })
  );
});