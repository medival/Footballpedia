const CACHE_NAME = "Footballpedia-v1";
const urlsToCache = [
	"/",
	"/favicon.ico",
	"/index.html",
	"/manifest.json",
	"/push.js",
	"/service-worker.js",
	"/assets/css/font-roboto.css",
	"/assets/css/material-icons.css",
	"/assets/css/materialize.min.css",
	"/assets/css/preloader.css",
	"/assets/css/style.css",
	"/assets/css/sweetalert2.min.css",
	"/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
	"/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2",
	"/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2",
	"/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2",
	"/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2",
	"/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2",
	"/assets/fonts/MaterialIcons-Regular.eot",
	"/assets/fonts/MaterialIcons-Regular.ttf",
	"/assets/fonts/MaterialIcons-Regular.woff",
	"/assets/fonts/MaterialIcons-Regular.woff2",
	"/assets/images/icons/favicon-72x72.png",
	"/assets/images/icons/favicon-96x96.png",
	"/assets/images/icons/favicon-144x144.png",
	"/assets/images/icons/favicon-152x152.png",
	"/assets/images/icons/favicon-192x192.png",
	"/assets/images/icons/favicon-512x512.png",
	"/assets/js/api.js",
	"/assets/js/db.js",
	"/assets/js/idb.js",
	"/assets/js/index.js",
	"/assets/js/jquery-3.4.1.min.js",
	"/assets/js/materialize.min.js",
	"/assets/js/nav.js",
	"/assets/js/preloader.js",
	"/assets/js/sweetalert2.all.min.js",
	"/assets/js/sweetalert2.min.js",
	"/assets/js/team.js",
	"/pages/home.html",
	"/pages/nav.html",
	"/pages/team.html",
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function (event) {
	let baseUrl = "https://api.football-data.org/v2/";
	if (event.request.url.indexOf(baseUrl) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function (cache) {
				return fetch(event.request).then(function (response) {
					cache.put(event.request.url, response.clone());
					return response;
				});
			})
		);
	} else {
		event.respondWith(
			caches
				.match(event.request, {
					ignoreSearch: true,
				})
				.then((response) => {
					return response || fetch(event.request);
				})
		);
	}
});

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log(
							`ServiceWorker: cache ${cacheName} deleted`
						);
						return cache.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener("push", function (event) {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = "Push message no payload";
	}

	let options = {
		body: body,
		icon: "img/notification.png",
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(
		self.registration.showNotification("Push Notificaton", options)
	);
});
