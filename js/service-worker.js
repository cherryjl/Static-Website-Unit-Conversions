const CACHE_NAME = "pwa-cache-v1";
const ASSETS = [
    "/",
    "/index.html",
    "/construction.html",
    "/cooking.html",
    "/health.html",
    "/tech.html",
    "/time.html",
    "/travel.html",
    "/manifest.json",
    "/css/base.css",
    "/css/custom-converter.css",
    "/css/form.css",
    "/css/header-nav.css",
    "/css/home-index.css",
    "/css/links-images.css",
    "/css/tables.css",
    "/js/appearanceToggle.js",
    "/js/construction.js",
    "/js/cooking.js",
    "/js/emailDrafter.js",
    "/js/health.js",
    "/js/tech.js",
    "/js/time.js",
    "/js/travel.js",
    "/images/moon_icon.png",
    "/images/Revolving-Arrows.png",
    "/images/sun_icon.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
