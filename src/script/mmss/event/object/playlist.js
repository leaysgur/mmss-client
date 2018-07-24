const PlaylistEvent = {
  onClickPlayArtist(item) {
    let items = [];
    item.albums.forEach(album => {
      items = items.concat(album.songs);
    });
    this.store.playlist.init(items);
  },

  onClickPlayAlbum(item) {
    this.store.playlist.init(item.songs);
  },

  onClickPlaySong(item) {
    this.store.playlist.init([item]);
  },

  onClickAddSongToPlaylist(item) {
    this.store.playlist.add(item);
  },

  onEndedMedia() {
    this.store.playlist.next();
  },

  onClickPrev() {
    this.store.playlist.prev();
  },

  onClickNext() {
    this.store.playlist.next();
  },

  onClickPlaylistItem(item) {
    this.store.playlist.jump(item);
  },
};

export default PlaylistEvent;
