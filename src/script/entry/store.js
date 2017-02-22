// @flow
import {
  action,
  extendObservable,
} from 'mobx';

import type {
  SearchResultType,
  MusicModelType,
} from '../shared/model/music';


class EntryStore {
  musicModel: MusicModelType;

  hasLoginError: boolean;
  searchResults: SearchResultType;

  constructor(musicModel: MusicModelType) {
    this.musicModel = musicModel;

    extendObservable(this, {
      hasLoginError: false,
      searchResults: {
        artists: [],
        albums: [],
      },
    });

    const forBindThis: any = this;
    [
      'showLoginError',
      'setSearchKeyword',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  showLoginError(bool: boolean): void {
    this.hasLoginError = bool;
  }

  setSearchKeyword(keyword: string): void {
    this.searchResults = this.musicModel.getSearchResult(keyword);
  }
}

export type EntryStoreType = EntryStore;
export default EntryStore;
