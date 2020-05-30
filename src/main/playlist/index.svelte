<script>

</script>

<div>Playlist</div>

<style>
  div {
    --_playlistHeight: 33vh;
    --_playlistRowHeight: 20px;

    position: fixed;
    bottom: var(--footerHeight);
    left: 0;
    right: 0;
    height: var(--_playlistHeight);
    background-color: #fafafa;
    font-size: 0.8rem;
    transform: translateY(100vh);
    transition: transform 0.25s ease;
  }

  div.isShown {
    transform: translateY(0);
  }
</style>
