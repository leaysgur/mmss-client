<script>
  import Finder from "./finder/index.svelte";
  import Playlist from "./playlist/index.svelte";
  import Player from "./player/index.svelte";

  export let json;
  export let api;

  let nowPlayingIdx = -1;
  let playlist = [];
  function initPlaylist(items) {
    playlist = items;
    nowPlayingIdx = 0;
  }
  $: nowPlaying = playlist[nowPlayingIdx];

  const hoveringState = {
    playlist: false,
    player: false,
  };
  /* $: isPlaylistVisible = hoveringState.playlist || hoveringState.player; */
  const isPlaylistVisible = true;
</script>

<main>
  <Finder artists={json} {initPlaylist} />
  <Playlist
    isVisible={isPlaylistVisible}
    {playlist}
    {nowPlayingIdx}
    on:mouseenter={() => (hoveringState.playlist = true)}
    on:mouseleave={() => (hoveringState.playlist = false)}
  />
  <Player
    {api}
    {nowPlaying}
    on:mouseenter={() => (hoveringState.player = true)}
    on:mouseleave={() => (hoveringState.player = false)}
  />
</main>

<style>
  main {
    position: relative;
    height: var(--mmssHeight);
    overflow: hidden;

    --mmssHeight: 100vh;
    --finderHeight: calc(var(--mmssHeight) - var(--footerHeight));
    --footerHeight: 10vh;
  }
</style>
