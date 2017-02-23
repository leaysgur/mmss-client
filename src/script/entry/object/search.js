// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';


class SearchObject {
  _json: JSON;

  keyword: string;
  results: SearchResultType;

  constructor(json: JSON) {
    this._json = json;

    extendObservable(this, {
      keyword: '',
      results: computed(() => {
        const keyword = this.keyword;

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
      'setKeyword',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  setKeyword(keyword: string): void {
    this.keyword = keyword;
  }
}

export type SearchResultType = {
  artists: string[];
  albums: string[];
};
export type SearchObjectType = SearchObject;
export default SearchObject;
