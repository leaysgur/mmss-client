// @flow
import {
  action,
  extendObservable,
} from 'mobx';


class MmssStore {
  json: Object;

  constructor() {
    extendObservable(this, {
    });

    const forBindThis: any = this;
    forBindThis.load = action(this.load);
  }

  load(json: Object) {
    console.log(json);
    this.json = json;
  }
}

export type MmssStoreType = MmssStore;
export default MmssStore;
