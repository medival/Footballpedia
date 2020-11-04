var webPush = require("web-push");

const vapidKeys = {
	publicKey:
		"BPRAY-ojYCOg2HJSYtSIc7pcxh8Xi38NXUrY8mvv4XI7Wx134vDJUG9om6agVNogbDa2ZKNrQn8nrDIJWtOwUWo",
	privateKey: "VMBBeM4NIR1VMd8RZkYVEp058oIp3W1cXVlXv02QpaY",
};

webPush.setVapidDetails(
	"mailto:adipurnomo811@gmail.com",
	vapidKeys.publicKey,
	vapidKeys.privateKey
);
var pushSubscription = {
	endpoint:
		"https://fcm.googleapis.com/fcm/send/cm9p7zIpKOc:APA91bG3V-Lm9T-YgfzaBrMv5Ac6bzqovvOASgUNjtP2MHhbjoHKPLf0ubU34Jm3Aee_WlyNA9xmDHi3KGGWZa42xCm4DaaqcnG_EatSd1jKNHBjChVZzqIxFkNykvLcUa-wMZB9egvq",
	keys: {
		p256dh:
			"BGCX/1rz6s5LpatkyvYlLxhKosKUyvMmFFmrsCdKW/WDtglc9ay9t7vW1vzMMZOaoVSR5I92j+V6AgFvkjiRVMY=",
		auth: "xXvj4gArqJ9KcW3xdZ4L9Q==",
	},
};

var payload = "You can use push notifikasi";

var options = {
	gcmAPIKey: "986745915167",
	TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
