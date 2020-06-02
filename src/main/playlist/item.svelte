<script>
  import { formatTime } from "../utils";

  export let no;
  export let item;
  export let isPlaying;
</script>

{#if item}
  <div class="Item">
    <div class="no">{no}</div>
    <div class="mark">
      {#if isPlaying}
        <img src="/image/i-playing.svg" alt="playing" />
      {/if}
    </div>
    <div class="entry" title={item.name}>
      {#if isPlaying}
        <span>{item.name}</span>
      {:else}
        <a href="/" on:click|preventDefault>{item.name}</a>
      {/if}
    </div>
    <div class="entry" title={item.artist}>{item.artist}</div>
    <div class="entry" title={item.album}>{item.album}</div>
    <div class="duration">{formatTime(item.duration)}</div>
  </div>
{:else}
  <div class="Item">
    <div class="no" />
    <div class="mark" />
    <div class="entry">Song</div>
    <div class="entry">Artist</div>
    <div class="entry">Album</div>
    <div class="duration">Duration</div>
  </div>
{/if}

<style>
  .Item {
    display: grid;
    grid-template-columns: 4% 4% 40% 20% 20% 10%;
    width: 100%;
  }

  .Item .no {
    text-align: right;
  }

  .Item .mark {
    text-align: right;
    padding-right: 5px;
  }
  .Item .mark img {
    height: 8px;
  }

  .Item .entry {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .Item .duration {
    text-align: right;
  }
</style>
