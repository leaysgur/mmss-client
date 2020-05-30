<script>
  import Finder from "./components/Finder.svelte";
  import Playlist from "./components/Playlist.svelte";
  import Player from "./components/Player.svelte";

  export let json;
  export let api;
</script>

<main>
  <Finder artists="{json}" />
  <Playlist />
  <Player {api} />
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
