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
          return {};
        }

        const reg = new RegExp(keyword, 'i');
        const ret: SearchResultType = {};
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

export type SearchResultType = { [string]: string[] };
export type SearchObjectType = SearchObject;
export default SearchObject;
