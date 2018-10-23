import { decorate, observable, computed } from 'mobx';

class Finder {
  constructor(json) {
    this._json = json;

    this.isNameSort = false;
    this.albums = [];
    this.songs = [];
  }

  get artists() {
    const artists = this._json.slice();
    if (this.isNameSort) {
      artists.sort((a, b) => a.name < b.name ? -1 : 1);
    }

    return artists;
  }

  sortArtist(sort) {
    this.isNameSort = sort === 'name';
  }

  initAlbums(albums) {
    this.albums.replace(albums);
    // アーティストを変えたら曲も初期化しておく
    this.songs.clear();
  }

  initSongs(songs) {
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
