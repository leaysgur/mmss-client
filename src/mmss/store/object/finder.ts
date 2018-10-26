import { decorate, observable, computed, IObservableArray } from 'mobx';

import { MusicJSON, Album, Song } from '../../../shared/typings/mmss';

class Finder {
  isNameSort: boolean;
  albums: IObservableArray<Album>;
  songs: IObservableArray<Song>;
  private json: MusicJSON;

  constructor(json: MusicJSON) {
    this.json = json;

    this.isNameSort = false;
    this.albums = [] as unknown[] as IObservableArray<Album>;
    this.songs = [] as unknown[] as IObservableArray<Song>;
  }

  get artists(): MusicJSON {
    const artists = this.json.slice();
    if (this.isNameSort) {
      artists.sort((a, b) => a.name < b.name ? -1 : 1);
    }

    return artists;
  }

  sortArtist(sort: string) {
    this.isNameSort = sort === 'name';
  }

  initAlbums(albums: Album[]) {
    this.albums.replace(albums);
    // アーティストを変えたら曲も初期化しておく
    this.songs.clear();
  }

  initSongs(songs: Song[]) {
    this.songs.replace(songs);
  }
}

decorate(Finder, {
  isNameSort: observable,
  albums: observable.shallow,
  songs: observable.shallow,
  artists: computed,
});
export default Finder;
