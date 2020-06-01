<script>

</script>

<div class="Column">
  <div class="head">
    <slot name="head" />
    <slot name="controller" />
  </div>
  <div class="body">
    <slot name="body" />
  </div>
</div>

<style>
  .Column {
    display: grid;
    grid-template-rows: 30px 1fr;
    height: inherit;
  }

  .Column .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 30px;
    background-color: var(--themeColor);
    color: #fff;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .Column .body {
    overflow: scroll;
  }
</style>
