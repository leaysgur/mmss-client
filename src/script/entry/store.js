// @flow
import {
  action,
  extendObservable,
} from 'mobx';

import SearchObject from './object/search';
import type {
  SearchObjectType,
  SearchResultType,
} from './object/search';


class EntryStore {
  searchObject: SearchObjectType;

  hasLoginError: boolean;
  searchResults: SearchResultType;

  constructor(json: JSON) {
    this.searchObject = new SearchObject(json);
    this.searchResults = this.searchObject.results;

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
