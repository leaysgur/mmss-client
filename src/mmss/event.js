// @flow
import type { MmssStoreType } from './store';


class MmssEvent {
  store: MmssStoreType;

  constructor(store: MmssStoreType) {
    this.store = store;

    const forBindThis: any = this;
    forBindThis.onLoad = this.onLoad.bind(this);
  }

  onLoad(json: Object) {
    this.store.load(json);
  }
}

export type MmssEventType = MmssEvent;
export default MmssEvent;
