<script>
  export let width = 0;
</script>

<div class="ProgressBar">
  <div class="inner" style="width: {width}%" />
</div>

<style>
  .ProgressBar {
    height: 4px;
    background-color: #e6e6e6;
  }

  .ProgressBar .inner {
    height: 100%;
    background-color: var(--linkColor);
  }
</style>
