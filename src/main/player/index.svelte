<script>
  import ProgressBar from "./progress-bar.svelte";
  import Audio from "./audio.svelte";

  export let api;
  api.getTrack;
</script>

<div class="Player">
  <div class="progress">
    <ProgressBar width={50} />
  </div>
  <div class="info">xxx</div>
  <div class="controls">
    <a href="/">
      <img src="/image/i-backward.svg" alt="backward" />
    </a>
    <a href="/">
      <img src="/image/i-forward.svg" alt="forward" />
    </a>
    <div class="audio">
      <Audio on:ended={() => console.warn('TODO')} />
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
