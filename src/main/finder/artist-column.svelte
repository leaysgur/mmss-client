<script>
  import { createEventDispatcher } from "svelte";
  import ColumnView from "./column-view.svelte";
  import RowView from "./row-view.svelte";

  export let artists;
  export let selected;
  export let selectArtist;
  export let isSortedByName;
  export let toggleNameSort;

  const dispatch = createEventDispatcher();
</script>

<ColumnView>
  <p slot="head">Artists</p>
  <div slot="controller" class="ArtistController" on:click={() => toggleNameSort()}>
    {isSortedByName ? "a-z" : "latest"}
    <img src="/image/i-sort.svg" alt="sort" />
  </div>
  <ul slot="body">
    {#each artists as artist (artist)}
      <li>
        <RowView
          isSelected={selected === artist.name}
          on:mouseenter={() => selectArtist(artist)}
          on:click={() => dispatch("playartist", { artist })}
        >
          <div slot="main">{artist.name}</div>
          <div slot="sub-left" />
          <div slot="sub-right">{artist.albums.length} album(s)</div>
        </RowView>
      </li>
    {/each}
  </ul>
</ColumnView>

<style>
  .ArtistController {
    display: flex;
    align-items: center;
    font-size: 0.6rem;
    cursor: pointer;
  }

  .ArtistController img {
    height: 12px;
    vertical-align: text-top;
    margin: 0 5px;
  }
</style>
