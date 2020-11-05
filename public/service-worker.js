importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
	console.log("workbox has been loaded");
	workbox.precaching.precacheAndRoute(
		[
			{ url: "/", revision: "2" },
			{ url: "/favicon.ico", revision: "2" },
			{ url: "/index.html", revision: "2" },
			{ url: "/manifest.json", revision: "2" },
			{ url: "/push.js", revision: "2" },
			{ url: "/service-worker.js", revision: "2" },
			{ url: "/assets/css/font-roboto.css", revision: "2" },
			{ url: "/assets/css/material-icons.css", revision: "2" },
			{ url: "/assets/css/materialize.min.css", revision: "2" },
			{ url: "/assets/css/preloader.css", revision: "2" },
			{ url: "/assets/css/style.css", revision: "2" },
			{ url: "/assets/css/sweetalert2.min.css", revision: "2" },
			{
				url: "/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
				revision: "2",
			},
			{
				url: "/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2",
				revision: "2",
			},
			{
				url: "/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2",
				revision: "2",
			},
			{
				url: "/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2",
				revision: "2",
			},
			{
				url: "/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2",
				revision: "2",
			},
			{
				url: "/assets/fonts/Roboto/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2",
				revision: "2",
			},
			{ url: "/assets/fonts/MaterialIcons-Regular.eot", revision: "2" },
			{ url: "/assets/fonts/MaterialIcons-Regular.ttf", revision: "2" },
			{ url: "/assets/fonts/MaterialIcons-Regular.woff", revision: "2" },
			{ url: "/assets/fonts/MaterialIcons-Regular.woff2", revision: "2" },
			{ url: "/assets/images/icons/favicon-72x72.png", revision: "2" },
			{ url: "/assets/images/icons/favicon-96x96.png", revision: "2" },
			{ url: "/assets/images/icons/favicon-144x144.png", revision: "2" },
			{ url: "/assets/images/icons/favicon-152x152.png", revision: "2" },
			{ url: "/assets/images/icons/favicon-192x192.png", revision: "2" },
			{ url: "/assets/images/icons/favicon-512x512.png", revision: "2" },
			{ url: "/assets/js/api.js", revision: "2" },
			{ url: "/assets/js/db.js", revision: "2" },
			{ url: "/assets/js/idb.js", revision: "2" },
			{ url: "/assets/js/index.js", revision: "2" },
			{ url: "/assets/js/jquery-3.4.1.min.js", revision: "2" },
			{ url: "/assets/js/materialize.min.js", revision: "2" },
			{ url: "/assets/js/nav.js", revision: "2" },
			{ url: "/assets/js/preloader.js", revision: "2" },
			{ url: "/assets/js/sweetalert2.all.min.js", revision: "2" },
			{ url: "/assets/js/sweetalert2.min.js", revision: "2" },
			{ url: "/assets/js/team.js", revision: "2" },
			{ url: "/pages/home.html", revision: "2" },
			{ url: "/pages/nav.html", revision: "2" },
			{ url: "/pages/team.html", revision: "2" },
		],
		{ ignoreUrlParametersMatching: [/.*/] }
	);

	// API Football
	workbox.routing.registerRoute(
		new RegExp("https://api.football-data.org/v2/"),
		workbox.strategies.staleWhileRevalidate({
			cacheName: "api-football",
		})
	);
	// End of API Football

	// Cache Pages
	workbox.routing.registerRoute(
		new RegExp("/pages/"),
		workbox.strategies.staleWhileRevalidate({
			cacheName: "pages",
		})
	);
	// End of Cache Pages

	// Cache Images
	workbox.routing.registerRoute(
		/.*(?:png|gif|jpg|jpeg|svg)$/,
		workbox.strategies.cacheFirst({
			cacheName: "image",
			plugins: [
				new workbox.cacheableResponse.Plugin({
					statuses: [0, 200],
				}),
				new workbox.expiration.Plugin({
					maxEntries: 100,
					maxAgeSeconds: 30 * 24 * 60 * 60,
				}),
			],
		})
	);
	// End of Cache Images

	// Cache Assets CSS
	workbox.routing.registerRoute(
		/\.(?:css)$/,
		workbox.strategies.cacheFirst({
			cacheName: "static-resources",
		})
	);
	// Cache Assets CSS

	// Cache Assets JS
	workbox.routing.registerRoute(
		new RegExp(".*.js"),
		workbox.strategies.cacheFirst({
			cacheName: "js",
		})
	);
	// Cache Assets JS
} else {
	console.log(`Workbox fail to load`);
}
self.addEventListener("push", (event) => {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = "Push message no payload";
	}
	const options = {
		body: body,
		icon: "/assets/images/icons/favicon-512x512.png",
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(
		self.registration.showNotification("Push Notification", options)
	);
});
