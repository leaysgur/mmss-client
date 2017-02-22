// @flow

class MusicModel {
  json: JSON;

  constructor(json: JSON) {
    this.json = json;
  }

  getSearchResult(keyword: string): SearchResultType {
    console.log('search ->', keyword);
    return {
      artists: ['keyword'],
      albums: [keyword],
    };
  }
}

export type SearchResultType = {
  artists: string[];
  albums: string[];
};
export type MusicModelType = MusicModel;
export default MusicModel;
