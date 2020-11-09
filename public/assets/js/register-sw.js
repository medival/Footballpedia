if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("service-worker.js")
			.then(function () {
				console.log("Service Worker is registered");
			})
			.catch(function () {
				console.log("Service Worker is fail to register");
			});
		requestPermisssion();
	});
} else {
	console.assert("Service Worker is not support this browser");
}

function requestPermisssion() {
	if ("Notification" in window) {
		Notification.requestPermission().then((result) => {
			if (result === "denied") {
				console.log("Notification are blocked");
				return;
			} else if (result === "default") {
				console.log("User close the dialog box");
				return;
			}

			navigator.serviceWorker.ready.then(() => {
				if ("PushManager" in window) {
					navigator.serviceWorker
						.getRegistration()
						.then((registration) => {
							registration.pushManager
								.subscribe({
									userVisibleOnly: true,
									applicationServerKey: urlBase64ToUint8Array(
										"BPRAY-ojYCOg2HJSYtSIc7pcxh8Xi38NXUrY8mvv4XI7Wx134vDJUG9om6agVNogbDa2ZKNrQn8nrDIJWtOwUWo"
									),
								})
								.then(function (subscribe) {
									console.log(
										"Success subscribe with endpoint  :",
										subscribe.endpoint
									);
									console.log(
										"Success subscribe with p256dh key :",
										btoa(
											String.fromCharCode.apply(
												null,
												new Uint8Array(
													subscribe.getKey("p256dh")
												)
											)
										)
									);
									console.log(
										"Berhasil melakukan subscribe dengan auth key: ",
										btoa(
											String.fromCharCode.apply(
												null,
												new Uint8Array(
													subscribe.getKey("auth")
												)
											)
										)
									);
								})
								.catch(function (e) {
									console.error(
										"Cant subscribe : ",
										e.message
									);
								});
						});
				}
			});
		});
	}
}

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, "+")
		.replace(/_/g, "/");
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; i++) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
