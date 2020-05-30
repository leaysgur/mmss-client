<script>
  import ArtistItem from "./artist-item.svelte";

  export let artists;
  export let selected;
  export let selectArtist;
</script>

<div class="ArtistColumn">
  <div class="head">
    <p>Artists</p>
    <div class="controller">
      TODO
      <img src="/image/i-sort.svg" alt="sort" />
    </div>
  </div>
  <div class="body">
    <ul>
      {#each artists as artist (artist)}
        <li>
          <ArtistItem
            item={artist}
            isSelected={selected === artist.name}
            {selectArtist}
          />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .ArtistColumn {
    display: grid;
    grid-template-rows: 30px 1fr;
    height: inherit;
  }

  .ArtistColumn .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 30px;
    background-color: #9cc2c3;
    color: #fff;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .ArtistColumn .controller {
    display: flex;
    align-items: center;
    font-size: 0.6rem;
    cursor: pointer;
  }

  .ArtistColumn .controller img {
    height: 12px;
    vertical-align: text-top;
    margin: 0 5px;
  }

  .ArtistColumn .body {
    overflow: scroll;
  }
</style>
