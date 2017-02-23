// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';

type Song = {
  album: string;
  albumArtist: string;
  artist: string;
  disc: string;
  discs: string;
  duration: string;
  name: string;
  path: string;
  track: string;
  tracks: string;
}
type Album = {
  songs: Song[];
  year: string;
}
type MusicJSON = {
  [string]: {
    [string]: Album;
  };
};

class MmssStore {
  _json: MusicJSON;

  artists: string[];
  albums: Album[];
  songs: Song[];

  isNameSort: boolean;
  selected: {
    artist: ?string;
    album: ?string;
  };

  constructor(json: MusicJSON) {
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
        const selectedArtist = this.selected.artist;

        if (selectedArtist) {
          const artist = this._json[selectedArtist];
          const albums = Object.keys(artist).map(album => {
            return {
              name: album,
              year: artist[album].year,
            };
          });
          return albums.sort((a, b) => parseInt(a.year, 10) < parseInt(b.year, 10) ? 1 : -1);
        }

        return [];
      }),
      songs: computed(() => {
        const selectedArtist = this.selected.artist;
        const selectedAlbum = this.selected.album;
        if (selectedArtist && selectedAlbum) {
          return this._json[selectedArtist][selectedAlbum].songs;
        }

        return [];
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

export default MmssStore;
