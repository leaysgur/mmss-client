<script>
  import ArtistColumn from "./artist-column.svelte";
  import AlbumColumn from "./album-column.svelte";
  import SongColumn from "./song-column.svelte";
  import { createStore } from "./store.js";

  export let json;
  export let initPlaylistByArtist;
  export let initPlaylistByAlbum;
  export let initPlaylistBySong;

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
    playArtist={initPlaylistByArtist}
    isSortedByName={$isSortedByName}
    {toggleNameSort}
  />
  <AlbumColumn
    albums={$albums}
    selected={$selectedAlbum}
    {selectAlbum}
    playAlbum={initPlaylistByAlbum}
  />
  <SongColumn songs={$songs} playSong={initPlaylistBySong} />
</div>

<style>
  .Finder {
    display: grid;
    grid-template-columns: 25% 25% 50%;
    height: var(--finderHeight);
  }
</style>
