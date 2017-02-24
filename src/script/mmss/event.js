// @flow
import type MmssStore, { Song } from './store';


class MmssEvent {
  store: MmssStore;

  constructor(store: MmssStore) {
    this.store = store;

    const forBindThis: any = this;
    [
      'onClickSortArtist',
      'onClickArtist', 'onClickAlbum',
      'onClickPlaySong',
    ].forEach(name => {
      forBindThis[name] = forBindThis[name].bind(this);
    });
  }

  onClickSortArtist(): void {
    this.store.sortArtist();
  }

  onClickArtist(item: Object): void {
    this.store.selectArtist(item.name);
  }

  onClickAlbum(item: Object): void {
    this.store.selectAlbum(item.name);
  }

  onClickPlaySong(item: Song): void {
    this.store.playlist.initWithSong(item);
  }
}

export default MmssEvent;
