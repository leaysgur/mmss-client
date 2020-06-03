<script>
  export let progress = 0;

  $: width = `${progress}%`;
  $: opacity = progress === 0 ? 0 : 1;
</script>

<div class="ProgressBar">
  <div class="inner" style="width: {width}; opacity: {opacity}" />
</div>

<style>
  .ProgressBar {
    height: 4px;
    background-color: #e6e6e6;
  }

  .ProgressBar .inner {
    height: 100%;
    background-color: var(--linkColor);
    will-change: width;
    transition: width 0.2s ease;
  }
</style>
