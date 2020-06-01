<script>
  import ProgressBar from "./progress-bar.svelte";
  import Audio from "./audio.svelte";

  export let api;
  export let nowPlaying;
  export let goForward;
  export let goBackword;

  let loadingProgress = 0;
  function showProgress() {
    // Motion is done by CSS
    loadingProgress = 99;
  }
  function clearProgress() {
    loadingProgress = 0;
  }

  const mediaCache = new Map();
  let audioSrc;
  function updateAudioSrc(res) {
    if (audioSrc) URL.revokeObjectURL(audioSrc);

    if (res instanceof Blob) {
      audioSrc = URL.createObjectURL(res);
      return;
    }

    console.error(res);
  }

  $: {
    (async () => {
      if (!nowPlaying) return;

      showProgress();
      const cache = mediaCache.get(nowPlaying.path);
      if (cache instanceof Blob) {
        updateAudioSrc(cache);
        clearProgress();
        return;
      }

      const res = await api.getTrack(nowPlaying.path);
      mediaCache.set(nowPlaying.path, res);
      updateAudioSrc(res);
      clearProgress();
    })();
  }

  $: isDisabled = !audioSrc || loadingProgress !== 0;
</script>

<div class="Player" class:isDisabled on:mouseenter on:mouseleave>
  <div class="progress">
    <ProgressBar progress={loadingProgress} />
  </div>
  <div class="info">
    {nowPlaying ? `${nowPlaying.artist} - ${nowPlaying.name}` : ''}
  </div>
  <div class="controls">
    <a href="/" on:click|preventDefault={() => goBackword()}>
      <img src="/image/i-backward.svg" alt="backward" />
    </a>
    <a href="/" on:click|preventDefault={() => goForward()}>
      <img src="/image/i-forward.svg" alt="forward" />
    </a>
    <div class="audio">
      <Audio src={audioSrc} on:ended={() => goForward()} />
    </div>
  </div>
</div>

<style>
  .Player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--footerHeight);
    padding: 0 30px;
    box-sizing: border-box;
    background-color: #f1f3f4;
  }
  .Player.isDisabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .Player .progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .Player .info {
    padding: 15px 0 5px;
    font-size: 0.8rem;
    text-align: center;
  }

  .Player .controls {
    display: flex;
  }

  .Player .controls a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
  }

  .Player .controls a img {
    height: 16px;
  }

  .Player .audio {
    flex: 1 1 auto;
  }
</style>
