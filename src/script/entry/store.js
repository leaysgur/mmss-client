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
  visibleTab: string;

  constructor(json: JSON) {
    this.searchObject = new SearchObject(json);

    extendObservable(this, {
      hasLoginError: false,
      visibleTab: 'login',
    });

    const forBindThis: any = this;
    [
      'showLoginError',
      'showTab',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  showLoginError(bool: boolean): void {
    this.hasLoginError = bool;
  }

  showTab(tabName: string): void {
    this.visibleTab = tabName;
  }
}

export type EntryStoreType = EntryStore;
export default EntryStore;
