<script>
  import ColumnView from "./column-view.svelte";
  import SongItem from "./song-item.svelte";

  export let songs;
</script>

<ColumnView>
  <p slot="head">Songs</p>
  <ul slot="body">
    {#each songs as song (song)}
      <li>
        <SongItem item={song} />
      </li>
    {/each}
  </ul>
</ColumnView>

<style>

</style>
