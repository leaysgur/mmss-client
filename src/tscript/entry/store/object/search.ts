import { computed, extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';

export type SearchResults = { [key: string]: string[] } | null;
// TODO: move it anywhere
type Album = { name: string };
class SearchObject {
  _json: any;
  keyword: string;
  results: SearchResults;

  constructor(json: any) {
    actionAll(this);

    this._json = json;

    extendObservable(this, {
      keyword: '',
      results: computed(() => {
        if (this.keyword.length === 0) {
          return null;
        }

        let reg;
        try {
          reg = new RegExp(this.keyword, 'i');
        } catch (err) {
          return null;
        }

        const ret: SearchResults = {};
        for (const artist of this._json) {
          if (reg.test(artist.name)) {
            ret[artist.name] = artist.albums.map((album: Album) => album.name);
          }
        }

        if (Object.keys(ret).length === 0) {
          return null;
        }
        return ret;
      }),
    });
  }

  setKeyword(keyword: string): void {
    this.keyword = keyword;
  }
}

export default SearchObject;
