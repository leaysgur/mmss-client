<script>
  export let item;
  export let isSelected;
  export let setSelected;
</script>

<div
  class="ArtistItem"
  class:isSelected
  on:mouseenter="{() => setSelected(item)}"
>
  <div>{item.name}</div>
  <div class="sub">{item.albums.length} album(s)</div>
</div>

<style>
  .ArtistItem {
    box-sizing: border-box;
    margin: 2px;
    padding: 5px 10px;
    background-color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1.1rem;
    border-left: 4px solid #fff;
  }

  .ArtistItem.isSelected {
    border-left: 4px solid #08f;
  }

  .ArtistItem .sub {
    padding-top: 5px;
    color: #b3b3b3;
    text-align: right;
    font-size: 0.7rem;
  }
</style>
