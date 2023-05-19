const filesToCache = [
  "ArduinoEditor.js",
  "ArduinoSimulator.json",
  "ArduinoSimulator.svg",
  "ArduinoSimulatorFavIcon_192x192.png",
  "ArduinoSimulatorFavIcon_512x512.png",
  "ArduinoSimulatorInterpreter.min.js",
  "index.html",
]

const staticCacheName = "arduinosimulator2-v1"

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache)
    })
  )
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
      .catch(() => {})
  )
})
