'use strict';

var CACHE_NAME = 'static-cache-v2';
var DATA_CACHE_NAME = 'data-cache-v1';

var FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/main.js',
  '/main.js.map',
  '/main.css',
  '/main.min.css',
  '/icons-192.png',
  '/icons-512.png',  
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');  
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();  
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');  
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);  
  if (evt.request.url.includes('/ais/')) {
    console.log('[Service Worker] Fetch (data)', evt.request.url);
    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
            return cache.match(evt.request)
            .then((response) => {
              return response || fetch(evt.request)
                .then((response) => {                
                    if (response.status === 200) {
                    cache.put(evt.request.url, response.clone());
                    }
                    return response;
                }).catch((err) => {                
                    return cache.match(evt.request);
                });
            });          
        }));
    return;
  }
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              return response || fetch(evt.request);
            });
      })
  );
});
