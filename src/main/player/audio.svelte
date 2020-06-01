<script>
  export let src;

  let el;
  // Use Space key to toggle pause/play
  function handleKeydown(ev) {
    if (ev.keyCode !== 32) return;
    if (el instanceof HTMLAudioElement === false) return;
    if (el.readyState !== HTMLAudioElement.HAVE_ENOUGH_DATA) return;

    ev.preventDefault();
    el.paused ? el.play() : el.pause();
  }
</script>

<audio
  class="Audio"
  autoplay
  controls
  controlsList="nodownload"
  {src}
  on:ended
  bind:this={el}
/>
<svelte:window on:keydown={handleKeydown} />

<style>
  .Audio {
    width: 100%;
    vertical-align: top;
  }
</style>
