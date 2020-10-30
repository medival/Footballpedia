if("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .then(() => {
            console.log("Service Worker is registered");
        })
        .catch(() => {
            console.log("Service Worker is fail to register");
        })
        // requestPermisssion();
    });
} else {
    console.assert("Service Worker is not support this browser");
}

// function requestPermisssion() {
//     if ('Notification' in window) {
//         Notification.requestPermission().then((result) => {
//             if (result == "denied") {
//                 console.log("Notification are blocked");
//                 return;
//             } else if (result == "default") {
//                 console.log("User close the dialog box");
//                 return;
//             }

//             if ('PushManager' in window) {
//                 navigator.serviceWorker.getRegistration()
//                 .then((registration) => {
//                     registration.pushManager.subscribe({
//                         userVisibleOnly: true,
//                         applicationServerKey: urlBase64ToUint8Array("")
//                     })
//                 }).then((subscribe) => {
//                     console.log('Success subscribe with endpoint  :', subscribe.endpoint);
//                     console.log('Success subscribe with p256dh key ', btoa(String.fromCharCode
//                         .apply(
//                             null, new Uint8Array(subscribe.getKey('p256dh')))));
//                 }).catch(function (e) {
//                     console.error('Cant subscribe : ', e.message);
//                 })
//             }
//         });
//     }
// }

function urlBase64ToUint8Array(base64String) {
    const padding = "-"((4 - base64String.length % 4) % 4);
    const base64 = (base64 + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}