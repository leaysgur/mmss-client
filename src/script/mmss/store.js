// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';


class MmssStore {
  _json: Object;

  artists: string[];
  albums: string[];
  songs: Object[];

  isNameSort: boolean;
  selected: {
    artist: ?string;
    album: ?string;
  };

  constructor(json: Object) {
    console.log(json);
    this._json = json;

    extendObservable(this, {
      isNameSort: false,
      selected: {
        artist: null,
        album: null,
      },
      artists: computed(() => {
        const artists = Object.keys(this._json);
        if (this.isNameSort) {
          return artists.sort();
        }
        return artists;
      }),
      albums: computed(() => {
        if (this.selected.artist === null) { return []; }

        const artist = this._json[this.selected.artist];
        const albums = Object.keys(artist).map(album => {
          return {
            name: album,
            year: artist[album].year,
          };
        });
        return albums.sort((a, b) => (a.year|0) < (b.year|0) ? 1 : -1).map(album => album.name);
      }),
      songs: computed(() => {
        if (this.selected.album === null) { return []; }
        return this._json[this.selected.artist][this.selected.album].songs;
      }),
    });

    const forBindThis: any = this;
    [
      'sortArtist',
      'selectArtist', 'selectAlbum',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  sortArtist(): void {
    this.isNameSort = !this.isNameSort;
  }

  selectArtist(name: string): void {
    this.selected.artist = name;
    this.selected.album = null;
  }

  selectAlbum(name: string): void {
    this.selected.album = name;
  }
}

export type MmssStoreType = MmssStore;
export default MmssStore;
