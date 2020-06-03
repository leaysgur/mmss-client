import { writable, derived } from "svelte/store";

export const createStore = () => {
  const _isPlaylistHovering = writable(false);
  const _isPlayerHovering = writable(false);
  const isPlaylistVisible = derived(
    [_isPlaylistHovering, _isPlayerHovering],
    ([$a, $b]) => $a || $b
  );

  const setPlaylistHover = (bool) => _isPlaylistHovering.set(bool);
  const setPlayerHover = (bool) => _isPlayerHovering.set(bool);

  return {
    isPlaylistVisible,
    setPlaylistHover,
    setPlayerHover,
  };
};
