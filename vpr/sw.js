/**
 * service worker for the p.r.0.x.y
 */
importScripts("vpr.bundle.js");
importScripts("vpr.config.js");
importScripts(__uv$config.sw || "vpr.sw.js");

const uv = new UVServiceWorker();

async function handleRequest(event) {
  if (uv.route(event)) {
    return await uv.fetch(event);
  }

  return await fetch(event.request);
}

self.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});
