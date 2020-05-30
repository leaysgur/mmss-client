<script>
  import ArtistColumn from "./artist-column.svelte";

  export let artists;
  let albums = [];
  let songs = [];

  function selectArtist(artist) {
    albums = artist.albums;
  }
</script>

<div class="Finder">
  <ArtistColumn {artists} {selectArtist} />
  <div>album: {albums.length}</div>
  <div>song: {songs.length}</div>
</div>

<style>
  .Finder {
    display: grid;
    grid-template-columns: 25% 25% 50%;
    height: var(--finderHeight);
  }
</style>
