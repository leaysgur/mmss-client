<script>
  import Finder from "./finder/index.svelte";
  import Playlist from "./playlist/index.svelte";
  import Player from "./player/index.svelte";

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
