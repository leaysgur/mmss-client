<script>
  import ProgressBar from "./progress-bar.svelte";
  import Audio from "./audio.svelte";
  import { createStore } from "./store.js";

  export let api;
  export let nowPlaying;
  export let goForward;
  export let goBackword;

  const {
    loadingProgress,
    audioSrc,
    isControlsDisabled,
    onNowPlayingChange,
  } = createStore();

  $: if ($nowPlaying) {
    onNowPlayingChange(api, $nowPlaying.path);
  }
</script>

<div class="Player" on:mouseenter on:mouseleave>
  <div class="progress">
    <ProgressBar progress={$loadingProgress} />
  </div>
  <div class="info">
    {$nowPlaying ? `${$nowPlaying.artist} - ${$nowPlaying.name}` : ''}
  </div>
  <div class="controls" class:isDisabled={$isControlsDisabled}>
    <a
      href="/"
      on:click|preventDefault={() => $isControlsDisabled || goBackword()}
    >
      <img src="/image/i-backward.svg" alt="backward" />
    </a>
    <a
      href="/"
      on:click|preventDefault={() => $isControlsDisabled || goForward()}
    >
      <img src="/image/i-forward.svg" alt="forward" />
    </a>
    <div class="audio">
      <Audio src={$audioSrc} on:ended={() => goForward()} />
    </div>
  </div>
</div>

<style>
  .Player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--playerHeight);
    padding: 0 30px;
    box-sizing: border-box;
    background-color: #f1f3f4;
  }

  .Player .progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .Player .info {
    line-height: 15px;
    padding: 15px 0 5px;
    font-size: 0.8rem;
    text-align: center;
  }

  .Player .controls {
    display: flex;
  }

  .Player .controls.isDisabled {
    opacity: 0.5;
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
