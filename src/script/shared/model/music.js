// @flow

class MusicModel {
  json: JSON;

  constructor(json: JSON) {
    this.json = json;
  }

  getSearchResult(keyword: string): SearchResultType {
    const artists = [];
    const albums = [];

    if (keyword.length === 0) {
      return { artists, albums };
    }

    const reg = new RegExp(keyword, 'i');
    Object.keys(this.json).forEach(artist => {
      reg.test(artist) && artists.push(artist);
      // XXX: flow-disable-line
      Object.keys(this.json[artist]).forEach(album => {
        reg.test(album) && albums.push(album);
      });
    });
    return { artists, albums };
  }
}

export type SearchResultType = {
  artists: string[];
  albums: string[];
};
export type MusicModelType = MusicModel;
export default MusicModel;
