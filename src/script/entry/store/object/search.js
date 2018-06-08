import { decorate, observable, computed } from 'mobx';

class SearchObject {
  constructor(json) {
    this._json = json;

    this.keyword = '';
  }

  get results() {
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
  }

  setKeyword(keyword) {
    this.keyword = keyword;
  }
}

decorate(SearchObject, {
  keyword: observable,
  results: computed,
});
export default SearchObject;
