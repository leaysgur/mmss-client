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

  onClickArtist(item: Object): void {
    this.store.selectArtist(item.name);
  }

  onClickAlbum(item: Object): void {
    this.store.selectAlbum(item.name);
  }
}

export type MmssEventType = MmssEvent;
export default MmssEvent;
