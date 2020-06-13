import { writable, derived, get } from "svelte/store";

export const createStore = () => {
  const playlist = writable([]);
  const nowPlayingIdx = writable(-1);
  const lastIdx = derived(playlist, ($playlist) => $playlist.length - 1);
  const isRandom = writable(false);

  const nowPlaying = derived(
    [playlist, nowPlayingIdx],
    ([$playlist, $nowPlayingIdx]) => $playlist[$nowPlayingIdx]
  );

  const initPlaylistByArtist = (artist) => {
    const items = artist.albums.map((a) => a.songs).flat();
    playlist.set(items);
    nowPlayingIdx.set(0);
  };

  const initPlaylistByAlbum = (album) => {
    const items = album.songs;
    playlist.set(items);
    nowPlayingIdx.set(0);
  };

  const initPlaylistBySong = (song) => {
    const items = [song];
    playlist.set(items);
    nowPlayingIdx.set(0);
  };

  const goForward = () => {
    const curIdx = get(nowPlayingIdx);
    nowPlayingIdx.set(curIdx === get(lastIdx) ? 0 : curIdx + 1);
  };
  const goBackward = () => {
    const curIdx = get(nowPlayingIdx);
    nowPlayingIdx.set(curIdx === 0 ? get(lastIdx) : curIdx - 1);
  };
  const jump = (idx) => {
    if (idx < 0) return;
    if (get(lastIdx) < idx) return;
    nowPlayingIdx.set(idx);
  };

  const playNext = () => {
    // If random mode is disabled, play next one
    if (!get(isRandom)) return goForward();

    // Pick random idx, return next idx if same
    const nextIdx = (get(playlist).length * Math.random()) | 0;
    if (nextIdx === get(nowPlayingIdx)) return goForward();
    jump(nextIdx);
  };

  const setRandom = (bool) => isRandom.set(bool);

  const bindMediaSession = () => {
    if ("mediaSession" in navigator === false) return;

    navigator.mediaSession.setActionHandler("nexttrack", () => goForward());
    navigator.mediaSession.setActionHandler("previoustrack", () =>
      goBackward()
    );

    const dispose = nowPlaying.subscribe(($nowPlaying) => {
      if (!$nowPlaying) return;
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: $nowPlaying.name,
        artist: $nowPlaying.artist,
        album: $nowPlaying.album,
      });
    });

    return () => {
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      dispose();
    };
  };

  return {
    playlist,
    nowPlayingIdx,
    nowPlaying,
    isRandom,
    initPlaylistByArtist,
    initPlaylistByAlbum,
    initPlaylistBySong,
    goForward,
    goBackward,
    jump,
    playNext,
    setRandom,
    bindMediaSession,
  };
};
