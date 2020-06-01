<script>
  import ArtistColumn from "./artist-column.svelte";
  import AlbumColumn from "./album-column.svelte";
  import SongColumn from "./song-column.svelte";

  export let json;
  export let initPlaylist;

  let artists = [...json];
  let albums = [];
  let songs = [];

  let isSortedByName = false;
  $: {
    if (isSortedByName) {
      artists.sort((a, b) => (a.name < b.name ? -1 : 1));
      artists = [...artists];
    } else {
      artists = [...json];
    }
  }
  function toggleNameSort() {
    isSortedByName = !isSortedByName;
  }

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
    initPlaylist(items);
  }
  function playAlbum(album) {
    const items = album.songs;
    initPlaylist(items);
  }
  function playSong(song) {
    const items = [song];
    initPlaylist(items);
  }
</script>

<div class="Finder">
  <ArtistColumn
    {artists}
    selected={selected.artist}
    {selectArtist}
    {playArtist}
    {isSortedByName}
    {toggleNameSort}
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
