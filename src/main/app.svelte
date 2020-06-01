<script>
  import Finder from "./finder/index.svelte";
  import Playlist from "./playlist/index.svelte";
  import Player from "./player/index.svelte";

  export let json;
  export let api;

  let playlist = [];
  function initPlaylist(items) {
    playlist = items;
  }

  const hoveringState = {
    playlist: false,
    player: false,
  };
  $: isPlaylistVisible = hoveringState.playlist || hoveringState.player;
</script>

<main>
  <Finder artists={json} {initPlaylist} />
  <Playlist
    {playlist}
    isVisible={isPlaylistVisible}
    on:mouseenter={() => (hoveringState.playlist = true)}
    on:mouseleave={() => (hoveringState.playlist = false)}
  />
  <Player
    {api}
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
