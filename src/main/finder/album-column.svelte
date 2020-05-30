<script>
  import AlbumItem from "./album-item.svelte";

  export let albums;
  export let selected;
  export let selectAlbum;
</script>

<div class="AlbumColumn">
  <div class="head">
    <p>Albums</p>
  </div>
  <div class="body">
    <ul>
      {#each albums as album (album)}
        <li>
          <AlbumItem
            item={album}
            isSelected={selected === album.name}
            {selectAlbum}
          />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .AlbumColumn {
    display: grid;
    grid-template-rows: 30px 1fr;
    height: inherit;
  }

  .AlbumColumn .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 30px;
    background-color: #9cc2c3;
    color: #fff;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .AlbumColumn .body {
    overflow: scroll;
  }
</style>
