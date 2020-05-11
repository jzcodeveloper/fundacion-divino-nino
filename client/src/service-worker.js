///////////////////////////
///// GLOBAL SETTINGS /////
///////////////////////////

workbox.core.skipWaiting();
workbox.core.clientsClaim();

///////////////////////////////////
///// STATIC CACHING - ASSETS /////
///////////////////////////////////
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

////////////////////////////////////
///// DYNAMIC CACHING - IMAGES /////
////////////////////////////////////
workbox.routing.registerRoute(
  /.*\.(?:jpe?g|png|gif)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "photos",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
      }),
    ],
  })
);

///////////////////////////
///// BACKGROUND SYNC /////
///////////////////////////
const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [
    new workbox.backgroundSync.Plugin("sync", {
      /* 24 hours */
      maxRetentionTime: 60 * 24,
    }),
  ],
});

workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "POST");
workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "PUT");
workbox.routing.registerRoute(/\/api\/.*/, networkWithBackgroundSync, "DELETE");
