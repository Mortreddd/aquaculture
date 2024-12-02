importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCwQ37UvG5Qyn2ehUmXaLHtycx1Dl3TlHw",
  authDomain: "aquaculture1-ad617.firebaseapp.com",
  databaseURL: "https://aquaculture1-ad617-default-rtdb.firebaseio.com",
  projectId: "aquaculture1-ad617",
  storageBucket: "aquaculture1-ad617.firebasestorage.app",
  messagingSenderId: "423030520767",
  appId: "1:423030520767:web:8c9fec1da037c74444ff0a",
  measurementId: "G-0LTC9YTELG",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
