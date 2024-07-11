/* eslint-disable no-undef */
if (workbox) {
    // Precache der Anwendung
    // workbox.precaching.precacheAndRoute(self.__precacheManifest)

    // Möglichst viele der Karten Kacheln cachen
    workbox.routing.registerRoute(
        /^https:\/\/geoportal\.muenchen\.de/,
        new workbox.strategies.CacheFirst({
            cacheName: "wms-karten",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 50,
                    purgeOnQuotaError: true,
                }),
            ],
        }),
        "GET"
    );
}
/* eslint-enable no-undef */
