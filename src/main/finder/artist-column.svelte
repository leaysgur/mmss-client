<script>
  import ColumnView from "./column-view.svelte";
  import ArtistItem from "./artist-item.svelte";

  export let artists;
  export let selected;
  export let selectArtist;
</script>

<ColumnView>
  <p slot="head">Artists</p>
  <div slot="controller" class="ArtistController">
    TODO
    <img src="/image/i-sort.svg" alt="sort" />
  </div>
  <ul slot="body">
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
