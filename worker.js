const filesToCache = [
	"ArduinoSimulator.css",
	"ArduinoSimulator.htm",
	"ArduinoSimulator.js",
	"ArduinoSimulator.json",
	"ArduinoSimulator.png",
	"ArduinoSimulatorEditor.js",
	"ArduinoSimulatorFavIcon_16x16.png",
	"ArduinoSimulatorFavIcon_192x192.png",
	"ArduinoSimulatorFavIcon_512x512.png",
	"ArduinoSimulatorInterpreter.js",
	"ArduinoSimulatorInterpreter.min.js",
	"ArduinoSimulatorSample.htm",
	"ArduinoSimulatorSample.json",
	"ArduinoSimulatorShare.png"
];

const staticCacheName = "arduinosimulator-v1";

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request)
		}).catch(error => {
		})
	);
});