<script>
  import Finder from "./finder/index.svelte";
  import Playlist from "./playlist/index.svelte";
  import Player from "./player/index.svelte";

  export let json;
  export let api;

  let nowPlayingIdx = -1;
  let playlist = [];
  $: lastIdx = playlist.length - 1;
  function initPlaylist(items) {
    playlist = items;
    nowPlayingIdx = 0;
  }
  function goForward() {
    nowPlayingIdx =
      nowPlayingIdx === lastIdx ? 0 : nowPlayingIdx + 1;
  }
  function goBackword() {
    nowPlayingIdx =
      nowPlayingIdx === 0 ?  lastIdx : nowPlayingIdx - 1;
  }
  function jump(idx) {
    if (0 <= idx && idx <= lastIdx)
      nowPlayingIdx = idx;
  }
  $: nowPlaying = playlist[nowPlayingIdx];

  const hoveringState = {
    playlist: false,
    player: false,
  };
  // TODO: debug
  /* $: isPlaylistVisible = hoveringState.playlist || hoveringState.player; */
  const isPlaylistVisible = true;
</script>

<main>
  <Finder {json} {initPlaylist} />
  <Playlist
    isVisible={isPlaylistVisible}
    {playlist}
    {nowPlayingIdx}
    {jump}
    on:mouseenter={() => (hoveringState.playlist = true)}
    on:mouseleave={() => (hoveringState.playlist = false)}
  />
  <Player
    {api}
    {nowPlaying}
    {goForward}
    {goBackword}
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
