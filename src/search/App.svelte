<script>
  import { artistSearch } from "./search";

  export let json;

  let keyword = "";
  $: results = artistSearch(json, keyword);
</script>

<main>
  <h1>Search</h1>
  <p>Search albums by artist name.</p>

  <input type="text" bind:value="{keyword}" />

  {#if results !== null}
    <ul class="results">
      {#each Object.keys(results) as artistName (artistName)}
        <li class="item">
          <div class="artist"># {artistName}</div>
          <ul>
            {#each results[artistName] as albumName (albumName)}
              <li>
                <div class="album">- {albumName}</div>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="results">Not Found</div>
  {/if}
</main>

<style>
  main {
    text-align: center;
  }

  input {
    box-sizing: border-box;
    width: 250px;
    padding: 5px 10px;
    margin-bottom: 10px;
    font-size: 1rem;
  }

  input:hover,
  input:focus {
    border: 2px solid var(--linkColor);
    outline: none;
  }

  .results {
    min-height: 10vh;
    padding: 10px;
    background-color: #fafafa;
    text-align: left;
  }

  .item {
    margin-bottom: 5px;
  }

  .artist {
    font-weight: 900;
  }
  .album {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
