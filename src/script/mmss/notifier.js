// @flow

export function initNotification(): void {
  Notification.requestPermission();
}

export function showNotification(nowPlaying: Song): void {
  const {
    name, artist, album,
  } = nowPlaying;

  const notif = new Notification(name, {
    tag: 'nowPlaying',
    body: `${artist} - ${album}`,
    // TODO: LOGO
    icon: '',
    silent: true,
  });

  notif.onclick = notif.onerror = () => {
    notif.close();
  };
}
