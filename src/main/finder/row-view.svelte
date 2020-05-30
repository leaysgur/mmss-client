<script>
  export let isSelected = false;
  export let selectItem = () => {};
</script>

<div class="Row" class:isSelected on:mouseenter={selectItem}>
  <slot name="main" />
  <div class="sub">
    <slot name="sub-left" />
    <slot name="sub-right" />
  </div>
</div>

<style>
  .Row {
    box-sizing: border-box;
    margin: 2px;
    padding: 5px 10px;
    background-color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1.1rem;
    border-left: 4px solid #fff;
  }

  .Row.isSelected {
    border-left: 4px solid #08f;
  }

  .Row .sub {
    padding-top: 5px;
    color: #b3b3b3;
    text-align: right;
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
  }
</style>
