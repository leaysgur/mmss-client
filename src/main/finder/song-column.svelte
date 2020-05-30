<script>
  import SongItem from "./song-item.svelte";

  export let songs;
</script>

<div class="SongColumn">
  <div class="head">
    <p>Songs</p>
  </div>
  <div class="body">
    <ul>
      {#each songs as song (song)}
        <li>
          <SongItem item={song} />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .SongColumn {
    display: grid;
    grid-template-rows: 30px 1fr;
    height: inherit;
  }

  .SongColumn .head {
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

  .SongColumn .body {
    overflow: scroll;
  }
</style>
