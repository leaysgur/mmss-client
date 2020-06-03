<script>
  import ColumnView from "./column-view.svelte";
  import RowView from "./row-view.svelte";

  export let albums;
  export let selected;
  export let selectAlbum;
  export let playAlbum;
</script>

<ColumnView>
  <p slot="head">Albums</p>
  <ul slot="body">
    {#each albums as album (album)}
      <li>
        <RowView
          isSelected={selected === album.name}
          on:mouseenter={() => selectAlbum(album)}
          on:click={() => playAlbum(album)}
        >
          <div slot="main">{album.name}</div>
          <div slot="sub-left" />
          <div slot="sub-right">
            {album.year || '-'} / {album.songs.length} song(s)
          </div>
        </RowView>
      </li>
    {/each}
  </ul>
</ColumnView>

<style>

</style>
