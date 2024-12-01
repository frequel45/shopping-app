const CACHE_NAME = "discount";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/index.js",
    "/home-192.png",
    "/home-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
