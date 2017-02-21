// @flow
import type { MmssStoreType } from './store';


class MmssEvent {
  store: MmssStoreType;

  constructor(store: MmssStoreType) {
    this.store = store;

    const forBindThis: any = this;
    [
      'onClickArtist',
      'onClickAlbum',
    ].forEach(name => {
      forBindThis[name] = forBindThis[name].bind(this);
    });
  }

  onClickArtist(name: string): void {
    this.store.selectArtist(name);
  }

  onClickAlbum(name: string): void {
    this.store.selectAlbum(name);
  }
}

export type MmssEventType = MmssEvent;
export default MmssEvent;
