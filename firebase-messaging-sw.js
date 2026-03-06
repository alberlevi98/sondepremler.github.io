importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDMerZsWx35hdic49RJJyyYPa_gaiUm2U8",
  authDomain: "son-depremler-489413.firebaseapp.com",
  projectId: "son-depremler-489413",
  storageBucket: "son-depremler-489413.firebasestorage.app",
  messagingSenderId: "972943552006",
  appId: "1:972943552006:web:e7d305a8b0e185d7d8dd87"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Arka planda mesaj alındı:', payload);

  const mag = payload.data?.magnitude || '?';
  const place = payload.data?.place || 'Bilinmeyen';
  const emoji = parseFloat(mag) >= 5.0 ? '🔴' : parseFloat(mag) >= 4.0 ? '🟠' : '🟡';

  const notificationTitle = `${emoji} ${mag} Büyüklüğünde Deprem!`;
  const notificationOptions = {
    body: `📍 ${place}`,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'deprem-bildirimi',
    requireInteraction: true,
    data: { url: 'https://son-depremler.com' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || 'https://son-depremler.com')
  );
});
