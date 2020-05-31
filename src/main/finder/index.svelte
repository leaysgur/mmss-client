<script>
  import ArtistColumn from "./artist-column.svelte";
  import AlbumColumn from "./album-column.svelte";
  import SongColumn from "./song-column.svelte";

  export let artists;
  export let initQueue;
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

  function playArtist(artist) {
    const items = artist.albums.map((a) => a.songs).flat();
    initQueue(items);
  }
  function playAlbum(album) {
    const items = album.songs;
    initQueue(items);
  }
  function playSong(song) {
    const items = [song];
    initQueue(items);
  }
</script>

<div class="Finder">
  <ArtistColumn
    {artists}
    selected={selected.artist}
    {selectArtist}
    {playArtist}
  />
  <AlbumColumn {albums} selected={selected.album} {selectAlbum} {playAlbum} />
  <SongColumn {songs} {playSong} />
</div>

<style>
  .Finder {
    display: grid;
    grid-template-columns: 25% 25% 50%;
    height: var(--finderHeight);
  }
</style>
