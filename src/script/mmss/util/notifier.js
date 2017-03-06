// @flow

export function initNotification(): void {
  if ('Notification' in window === false) { return; }
  Notification.requestPermission();
}

export function showNotification(nowPlaying: Song): void {
  if ('Notification' in window === false) { return; }
  const {
    name, artist, album,
  } = nowPlaying;

  const notif = new Notification(name, {
    tag: 'nowPlaying',
    body: `${artist} - ${album}`,
    icon: './image/icon.png',
    silent: true,
  });

  notif.onclick = notif.onerror = () => {
    notif.close();
  };
}
