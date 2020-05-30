<script>
  import ColumnView from "./column-view.svelte";
  import AlbumItem from "./album-item.svelte";

  export let albums;
  export let selected;
  export let selectAlbum;
</script>

<ColumnView>
  <p slot="head">Albums</p>
  <ul slot="body">
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
</ColumnView>

<style>

</style>
