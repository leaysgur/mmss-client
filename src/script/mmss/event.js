// @flow
import type MmssStore from './store';
import type { Song, Album, Artist } from './object/finder';


class MmssEvent {
  store: MmssStore;

  constructor(store: MmssStore) {
    this.store = store;

    const forBindThis: any = this;
    [
      'onClickSortArtist',
      'onClickArtist', 'onClickAlbum',
      'onClickPlayArtist', 'onClickPlayAlbum', 'onClickPlaySong',
      'onClickTogglePlaylist',
    ].forEach(name => {
      forBindThis[name] = forBindThis[name].bind(this);
    });
  }

  onClickSortArtist(): void {
    this.store.finder.sortArtist();
  }

  onClickArtist(item: Artist): void {
    this.store.finder.initAlbums(item.albums);
  }

  onClickAlbum(item: Album): void {
    this.store.finder.initSongs(item.songs);
  }

  onClickPlayArtist(item: Artist): void {
    let items = [];
    Object.keys(item.albums).forEach(album => {
      items = items.concat(item.albums[album].songs);
    });
    // TODO: とりあえずコレで古い順にいい感じにソートされてるけど
    //       やっぱ前もってソートしておく
    items.reverse();
    this.store.playlist.init(items);
  }

  onClickPlayAlbum(item: Album): void {
    this.store.playlist.init(item.songs);
  }

  onClickPlaySong(item: Song): void {
    this.store.playlist.init([item]);
  }

  onClickTogglePlaylist(): void {
    this.store.ui.togglePlaylist();
  }
}

export default MmssEvent;
