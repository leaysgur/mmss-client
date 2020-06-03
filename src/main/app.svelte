<script>
  import { onMount } from "svelte";
  import Finder from "./finder/index.svelte";
  import Playlist from "./playlist/index.svelte";
  import Player from "./player/index.svelte";
  import { createStore } from "./store/index.js";

  export let json;
  export let api;

  const {
    playlist,
    initPlaylistByArtist,
    initPlaylistByAlbum,
    initPlaylistBySong,
    nowPlayingIdx,
    nowPlaying,
    goForward,
    goBackword,
    jump,
    bindMediaSession,
    isPlaylistVisible,
    setPlaylistHover,
    setPlayerHover,
  } = createStore();

  onMount(bindMediaSession);
</script>

<main>
  <Finder
    {json}
    {initPlaylistByArtist}
    {initPlaylistByAlbum}
    {initPlaylistBySong}
  />
  <Playlist
    isVisible={$isPlaylistVisible}
    playlist={$playlist}
    nowPlayingIdx={$nowPlayingIdx}
    {jump}
    on:mouseenter={() => setPlaylistHover(true)}
    on:mouseleave={() => setPlaylistHover(false)}
  />
  <Player
    {api}
    {nowPlaying}
    {goForward}
    {goBackword}
    on:mouseenter={() => setPlayerHover(true)}
    on:mouseleave={() => setPlayerHover(false)}
  />
</main>

<style>
  main {
    position: relative;
    height: var(--_mainHeight);
    overflow: hidden;

    --_mainHeight: 100vh;
    --finderHeight: calc(var(--_mainHeight) - var(--playerHeight));
    --playerHeight: 10vh;
  }
</style>
