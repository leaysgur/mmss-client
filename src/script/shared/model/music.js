// @flow

class MusicModel {
  json: JSON;

  constructor(json: JSON) {
    this.json = json;
  }

  getSearchResult(keyword: string): SearchResultType {
    if (keyword.length === 0) {
      return {
        artists: [],
        albums: [],
      };
    }

    const artists = [];
    const albums = [];
    const reg = new RegExp(keyword, 'i');
    Object.keys(this.json).forEach(artist => {
      reg.test(artist) && artists.push(artist);
      // XXX: flow-disable-line
      Object.keys(this.json[artist]).forEach(album => {
        reg.test(album) && albums.push(`${artist} - ${album}`);
      });
    });

    return {
      artists: artists.sort(),
      albums: albums.sort(),
    };
  }
}

export type SearchResultType = {
  artists: string[];
  albums: string[];
};
export type MusicModelType = MusicModel;
export default MusicModel;
