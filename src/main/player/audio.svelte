<script>
  export let src;
</script>

<audio
  class="Audio"
  autoplay
  controls
  controlsList="nodownload"
  {src}
  on:ended
/>

<style>
  .Audio {
    width: 100%;
    vertical-align: top;
  }
</style>
