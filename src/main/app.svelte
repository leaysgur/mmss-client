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
    goBackward,
    jump,
    playNext,
    bindMediaSession,
    isPlaylistVisible,
    isRandom,
    setPlaylistHover,
    setPlayerHover,
    setRandom,
  } = createStore();

  onMount(bindMediaSession);
</script>

<main>
  <Finder
    {json}
    {nowPlaying}
    on:playartist={({ detail }) => initPlaylistByArtist(detail.artist)}
    on:playalbum={({ detail }) => initPlaylistByAlbum(detail.album)}
    on:playsong={({ detail }) => initPlaylistBySong(detail.song)}
  />
  <Playlist
    isVisible={$isPlaylistVisible}
    playlist={$playlist}
    nowPlayingIdx={$nowPlayingIdx}
    on:jump={({ detail }) => jump(detail.idx)}
    on:mouseenter={() => setPlaylistHover(true)}
    on:mouseleave={() => setPlaylistHover(false)}
  />
  <Player
    {api}
    {nowPlaying}
    {isRandom}
    on:setrandom={({ detail }) => setRandom(detail.value)}
    on:goforward={() => goForward()}
    on:gobackward={() => goBackward()}
    on:srcended={() => playNext()}
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
