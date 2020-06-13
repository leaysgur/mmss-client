<script>
  import { createEventDispatcher } from "svelte";
  import { formatTime } from "../utils";
  import ColumnView from "./column-view.svelte";
  import RowView from "./row-view.svelte";

  export let songs;

  const dispatch = createEventDispatcher();
</script>

<ColumnView>
  <p slot="head">Songs</p>
  <ul slot="body">
    {#each songs as song (song)}
      <li>
        <RowView on:click={() => dispatch('playsong', { song })}>
          <div slot="main">{song.name}</div>
          <div slot="sub-left">{song.artist}</div>
          <div slot="sub-right">
            Disc {song.disc || '-'} / Track {song.track || '-'} / {formatTime(song.duration)}
          </div>
        </RowView>
      </li>
    {/each}
  </ul>
</ColumnView>

<style>

</style>
