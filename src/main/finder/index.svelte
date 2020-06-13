<script>
  import ArtistColumn from "./artist-column.svelte";
  import AlbumColumn from "./album-column.svelte";
  import SongColumn from "./song-column.svelte";
  import { createStore } from "./store.js";

  export let json;

  const {
    artists,
    albums,
    songs,
    isSortedByName,
    toggleNameSort,
    selectedArtist,
    selectedAlbum,
    selectArtist,
    selectAlbum,
  } = createStore({ json });
</script>

<div class="Finder">
  <ArtistColumn
    artists={$artists}
    selected={$selectedArtist}
    {selectArtist}
    isSortedByName={$isSortedByName}
    {toggleNameSort}
    on:playartist
  />
  <AlbumColumn
    albums={$albums}
    selected={$selectedAlbum}
    {selectAlbum}
    on:playalbum
  />
  <SongColumn songs={$songs} on:playsong />
</div>

<style>
  .Finder {
    display: grid;
    grid-template-columns: 25% 25% 50%;
    height: var(--finderHeight);
  }
</style>
