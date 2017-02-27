// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';


class SearchObject {
  _json: MusicJSON;

  keyword: string;
  results: SearchResult;

  constructor(json: MusicJSON) {
    this._json = json;

    extendObservable(this, {
      keyword: '',
      results: computed(() => {
        const keyword = this.keyword;
        const ret: SearchResult = {};

        if (keyword.length === 0) {
          return ret;
        }

        let reg;
        try {
          reg = new RegExp(keyword, 'i');
        } catch (err) {
          return ret;
        }

        this._json.forEach(artist => {
          if (reg.test(artist.name)) {
            ret[artist.name] = artist.albums.map(album => album.name);
          }
        });

        return ret;
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

export type SearchResult = { [string]: string[] };
export default SearchObject;
