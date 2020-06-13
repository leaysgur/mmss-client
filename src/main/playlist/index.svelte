<script>
  import { createEventDispatcher } from "svelte";
  import PlaylistItem from "./item.svelte";

  export let isVisible;
  export let playlist;
  export let nowPlayingIdx;

  const dispatch = createEventDispatcher();
</script>

<div class="Playlist" class:isVisible on:mouseenter on:mouseleave>
  <div class="head">
    <PlaylistItem />
  </div>
  {#if playlist.length === 0}
    <div class="empty">No items</div>
  {/if}
  <ul class="body">
    {#each playlist as item, idx (item)}
      <li class="row">
        <PlaylistItem
          no={idx + 1}
          {item}
          isPlaying={idx === nowPlayingIdx}
          on:click={() => dispatch('jump', { idx })}
        />
      </li>
    {/each}
  </ul>
</div>

<style>
  .Playlist {
    --_playlistHeight: 33vh;
    --_playlistRowHeight: 20px;

    position: fixed;
    bottom: var(--playerHeight);
    left: 0;
    right: 0;
    height: var(--_playlistHeight);
    background-color: #fafafa;
    font-size: 0.8rem;
    transform: translateY(100vh);
    transition: transform 0.25s ease;
    will-change: transform;
  }

  .Playlist.isVisible {
    transform: translateY(0);
  }

  .Playlist .head {
    height: var(--_playlistRowHeight);
    display: flex;
    align-items: center;
    background-color: var(--themeColor);
    color: #fff;
    text-transform: uppercase;
  }

  .Playlist .body {
    height: calc(var(--_playlistHeight) - var(--_playlistRowHeight));
    overflow: scroll;
  }

  .Playlist .row {
    height: var(--_playlistRowHeight);
    display: flex;
    align-items: center;
    background-color: #fff;
  }
  .Playlist .row:nth-child(even) {
    background-color: #f8f8f8;
  }

  .Playlist .empty {
    text-align: center;
    padding-top: 10vh;
  }
</style>
