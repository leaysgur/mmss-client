// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';

import { toOrderNumber } from '../utils';


class Finder {
  _json: MusicJSON;

  artists: Artist[];
  albums: Album[];
  songs: Song[];

  isNameSort: boolean;

  selected: { artist: ?string; album: ?string; };

  constructor(json: MusicJSON) {
    console.log(json);
    this._json = json;

    extendObservable(this, {
      isNameSort: false,

      selected: { artist: null, album: null },

      artists: computed(() => {
        const artists = Object.keys(this._json);
        if (this.isNameSort) {
          artists.sort();
        }

        return artists.map(artist => {
          return {
            name: artist,
            albums: this._json[artist],
          };
        });
      }),

      albums: computed(() => {
        const selectedArtist = this.selected.artist;
        if (!selectedArtist) { return []; }

        const artist = this._json[selectedArtist];
        const albums = Object.keys(artist).map(album => {
          return {
            name: album,
            year: artist[album].year,
            songs: artist[album].songs,
          };
        });
        return albums.sort((a, b) => {
          const yearA = toOrderNumber(a.year);
          const yearB = toOrderNumber(b.year);
          return yearA > yearB ? -1 : 1;
        });
      }),

      songs: computed(() => {
        const selectedArtist = this.selected.artist;
        const selectedAlbum = this.selected.album;
        if (!(selectedArtist && selectedAlbum)) { return []; }

        const songs = this._json[selectedArtist][selectedAlbum].songs.slice();
        return songs.sort((a, b) => {
          const discA = toOrderNumber(a.disc);
          const discB = toOrderNumber(b.disc);
          const trackA = toOrderNumber(a.track);
          const trackB = toOrderNumber(b.track);

          // disc順のtrack順
          return discA > discB || discA === discB && trackA > trackB ? 1 : -1;
        });
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

export type Artist = {
  name: string;
  albums: { [string]: Album; };
}

export type Album = {
  name: string;
  year: string;
  songs: Song[];
}
export type Song = {
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

export type MusicJSON = {
  [string]: {
    [string]: {
      songs: Song[];
      year: string;
    };
  };
};
export default Finder;
