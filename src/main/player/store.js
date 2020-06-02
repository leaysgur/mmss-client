import { writable, derived, get } from "svelte/store";

export const createStore = () => {
  const loadingProgress = writable(0);

  const _mediaCache = new Map();
  const audioSrc = writable(null);

  const isControlsDisabled = derived(
    [audioSrc, loadingProgress],
    ([$audioSrc, $loadingProgress]) => !$audioSrc || $loadingProgress !== 0
  );

  const _updateAudioSrc = (res) => {
    const cur = get(audioSrc);
    if (cur) URL.revokeObjectURL(cur);

    if (res instanceof Blob) {
      audioSrc.set(URL.createObjectURL(res));
      return;
    }

    console.error(res);
  };

  const onNowPlayingChange = async (api, path) => {
    const cache = _mediaCache.get(path);
    if (cache instanceof Blob) {
      _updateAudioSrc(cache);
      return;
    }

    // Motion is done by CSS
    loadingProgress.set(99);
    try {
      const res = await api.getTrack(path);
      _updateAudioSrc(res);
      _mediaCache.set(path, res);
    } catch (err) {
      console.error(err);
    }
    loadingProgress.set(0);
  };

  return {
    loadingProgress,
    audioSrc,
    isControlsDisabled,
    onNowPlayingChange,
  };
};
