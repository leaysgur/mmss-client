// @flow
import {
  action,
  extendObservable,
} from 'mobx';

import SearchObject from './object/search';

import type { SearchObjectType, } from './object/search';


class EntryStore {
  searchObject: SearchObjectType;
  hasLoginError: boolean;

  constructor(json: JSON) {
    this.searchObject = new SearchObject(json);

    extendObservable(this, {
      hasLoginError: false,
    });

    const forBindThis: any = this;
    [
      'showLoginError',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  showLoginError(bool: boolean): void {
    this.hasLoginError = bool;
  }
}

export type EntryStoreType = EntryStore;
export default EntryStore;
