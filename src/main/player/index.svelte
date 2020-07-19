<script>
  import { createEventDispatcher } from "svelte";
  import ProgressBar from "./progress-bar.svelte";
  import Audio from "./audio.svelte";
  import { createStore } from "./store.js";

  export let api;
  export let nowPlaying;
  export let isRandom;

  const {
    loadingProgress,
    audioSrc,
    isControlsDisabled,
    onNowPlayingChange,
  } = createStore();

  const dispatch = createEventDispatcher();

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
      class:isDisabled={!$isRandom}
      on:click|preventDefault={() => dispatch('setrandom', {
          value: !$isRandom,
        })}
    >
      <img src="/image/i-random.svg" alt="random" />
    </a>
    <a
      href="/"
      class:isDisabled={!$audioSrc}
      on:click|preventDefault={() => $isControlsDisabled || dispatch('gobackward')}
    >
      <img src="/image/i-backward.svg" alt="backward" />
    </a>
    <a
      href="/"
      class:isDisabled={!$audioSrc}
      on:click|preventDefault={() => $isControlsDisabled || dispatch('goforward')}
    >
      <img src="/image/i-forward.svg" alt="forward" />
    </a>
    <div class="audio">
      <Audio src={$audioSrc} on:ended={() => dispatch('srcended')} />
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

  .Player .controls a.isDisabled {
    opacity: 0.25;
  }

  .Player .controls a img {
    height: 16px;
  }

  .Player .audio {
    flex: 1 1 auto;
  }
</style>
