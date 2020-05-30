<script>
  export let item;
  export let isSelected;
  export let selectAlbum;
</script>

<div
  class="AlbumItem"
  class:isSelected
  on:mouseenter="{() => selectAlbum(item)}"
>
  <div>{item.name}</div>
  <div class="sub">{item.year || '-'} / {item.songs.length} song(s)</div>
</div>

<style>
  .AlbumItem {
    box-sizing: border-box;
    margin: 2px;
    padding: 5px 10px;
    background-color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1.1rem;
    border-left: 4px solid #fff;
  }

  .AlbumItem.isSelected {
    border-left: 4px solid #08f;
  }

  .AlbumItem .sub {
    padding-top: 5px;
    color: #b3b3b3;
    text-align: right;
    font-size: 0.7rem;
  }
</style>
