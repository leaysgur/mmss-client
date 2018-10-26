import { decorate, observable, computed } from 'mobx';

import { MusicJSON } from '../../../shared/typings/mmss';

interface SearchResults {
  [ley: string]: string[];
}

class SearchObject {
  keyword: string;
  private json: MusicJSON;

  constructor(json: MusicJSON) {
    this.json = json;

    this.keyword = '';
  }

  get results(): SearchResults | null {
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
