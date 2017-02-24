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
    ].forEach(name => {
      forBindThis[name] = forBindThis[name].bind(this);
    });
  }

  onClickSortArtist(): void {
    this.store.finder.sortArtist();
  }

  onClickArtist(item: Artist): void {
    this.store.finder.selectArtist(item.name);
  }

  onClickAlbum(item: Album): void {
    this.store.finder.selectAlbum(item.name);
  }

  onClickPlayArtist(name: string): void {
    name;
    const items = [];
    this.store.playlist.init(items);
  }

  onClickPlayAlbum(item: Album): void {
    this.store.playlist.init(item.songs);
  }

  onClickPlaySong(item: Song): void {
    this.store.playlist.init([item]);
  }
}

export default MmssEvent;
