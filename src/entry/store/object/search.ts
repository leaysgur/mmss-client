import { decorate, observable, computed } from 'mobx';

import { MusicJSON, SearchResults } from '../../../shared/typings/mmss';

class SearchObject {
  keyword: string;

  constructor(private json: MusicJSON) {
    this.keyword = '';
  }

  get results(): SearchResults {
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
    for (const artist of this.json) {
      if (reg.test(artist.name)) {
        ret[artist.name] = artist.albums.map(album => album.name);
      }
    }

    if (Object.keys(ret).length === 0) {
      return null;
    }

    return ret;
  }

  setKeyword(keyword: string) {
    this.keyword = keyword;
  }
}

decorate(SearchObject, {
  keyword: observable,
  results: computed,
});
export default SearchObject;
