// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';


class EntryStore {
  _json: JSON;

  hasLoginError: boolean;
  searchKeyword: string;
  searchResults: SearchResultType;

  constructor(json: JSON) {
    this._json = json;

    extendObservable(this, {
      hasLoginError: false,

      searchKeyword: '',
      searchResults: computed(() => {
        const keyword = this.searchKeyword;

        if (keyword.length === 0) {
          return {
            artists: [],
            albums: [],
          };
        }

        const artists = [];
        const albums = [];
        const reg = new RegExp(keyword, 'i');
        Object.keys(this._json).forEach(artist => {
          reg.test(artist) && artists.push(artist);
          // XXX: flow-disable-line
          Object.keys(this._json[artist]).forEach(album => {
            reg.test(album) && albums.push(`${artist} - ${album}`);
          });
        });

        return {
          artists: artists.sort(),
          albums: albums.sort(),
        };
      }),
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
    this.searchKeyword = keyword;
  }
}

export type SearchResultType = {
  artists: string[];
  albums: string[];
};
export type EntryStoreType = EntryStore;
export default EntryStore;
