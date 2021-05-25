importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/open-balena-dashboard/precache-manifest.3a5ab725b957039407fc3720b1288cc3.js"
);

workbox.core.setCacheNameDetails({prefix: "open-balena-dashboard"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.setConfig({
  debug: true
});

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


//

//

