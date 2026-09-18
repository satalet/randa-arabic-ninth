const CACHE_VERSION = '1789758528';
const CACHE_NAME = 'randa-pwa-v' + CACHE_VERSION;
const urlsToCache = ['./', './index.html', './manifest.json', './arabic_lesson1.html'];

// التثبيت وفرض السيطرة فوراً
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

// التفعيل ومسح أي كاش قديم
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) {
                    console.log('حذف الكاش القديم:', key);
                    return caches.delete(key);
                }
            }));
        }).then(() => self.clients.claim())
    );
});

// استراتيجية (النت أولاً، ثم الكاش)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
