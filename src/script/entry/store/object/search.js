// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';


class SearchObject {
  _json: JSON;

  keyword: string;
  results: SearchResult;

  constructor(json: JSON) {
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

        Object.keys(this._json).forEach(artist => {
          if (reg.test(artist)) {
            // XXX: flow-disable-line
            ret[artist] = Object.keys(this._json[artist]).slice();
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
