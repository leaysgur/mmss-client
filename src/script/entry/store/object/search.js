import { computed, extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';

class SearchObject {
  constructor(json) {
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

        const ret = {};
        for (const artist of this._json) {
          if (reg.test(artist.name)) {
            ret[artist.name] = artist.albums.map(album => album.name);
          }
        }

        if (Object.keys(ret).length === 0) {
          return null;
        }
        return ret;
      }),
    });
  }

  setKeyword(keyword) {
    this.keyword = keyword;
  }
}

export default SearchObject;
