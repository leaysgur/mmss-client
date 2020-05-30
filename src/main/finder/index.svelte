<script>
  import ArtistColumn from "./artist-column.svelte";
  import AlbumColumn from "./album-column.svelte";
  import SongColumn from "./song-column.svelte";

  export let artists;
  let albums = [];
  let songs = [];

  const selected = {
    artist: "",
    album: "",
  };
  function selectArtist(artist) {
    selected.artist = artist.name;
    selected.album = "";
    albums = artist.albums;
    songs = [];
  }
  function selectAlbum(album) {
    selected.album = album.name;
    songs = album.songs;
  }
</script>

<div class="Finder">
  <ArtistColumn {artists} selected={selected.artist} {selectArtist} />
  <AlbumColumn {albums} selected={selected.album} {selectAlbum} />
  <SongColumn {songs} />
</div>

<style>
  .Finder {
    display: grid;
    grid-template-columns: 25% 25% 50%;
    height: var(--finderHeight);
  }
</style>
