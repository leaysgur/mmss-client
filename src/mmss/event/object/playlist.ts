import MmssEvent from '../../event';
import { Artist, Album, Song } from '../../../shared/typings/mmss';

const PlaylistEvent = {
  onClickPlayArtist(item: Artist) {
    let items: Song[] = [];
    item.albums.forEach(album => {
      items = items.concat(album.songs);
    });
    const $this = this as unknown as MmssEvent;
    $this.store.playlist.init(items);
  },

  onClickPlayAlbum(item: Album) {
    const $this = this as unknown as MmssEvent;
    $this.store.playlist.init(item.songs);
  },

  onClickPlaySong(item: Song) {
    const $this = this as unknown as MmssEvent;
    $this.store.playlist.init([item]);
  },

  onClickAddSongToPlaylist(item: Song) {
    const $this = this as unknown as MmssEvent;
    $this.store.playlist.add(item);
  },

  onEndedMedia() {
    const $this = this as unknown as MmssEvent;
    $this.store.playlist.next();
  },

  onClickPrev() {
    const $this = this as unknown as MmssEvent;
    $this.store.playlist.prev();
  },

  onClickNext() {
    const $this = this as unknown as MmssEvent;
    $this.store.playlist.next();
  },

  onClickPlaylistItem(item: Song) {
    const $this = this as unknown as MmssEvent;
    $this.store.playlist.jump(item);
  },
};

export default PlaylistEvent;
