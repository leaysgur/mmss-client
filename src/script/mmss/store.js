// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';

import PlaylistObject from './object/playlist';
import { toOrderNumber } from './utils';

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

type MusicJSON = {
  [string]: {
    [string]: {
      songs: Song[];
      year: string;
    };
  };
};


class MmssStore {
  _json: MusicJSON;

  artists: string[];
  albums: {
    name: string;
    year: string;
  }[];
  songs: Song[];

  playlist: PlaylistObject;

  isNameSort: boolean;
  selected: {
    artist: ?string;
    album: ?string;
  };


  constructor(json: MusicJSON) {
    console.log(json);
    this._json = json;

    this.playlist = new PlaylistObject();

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
        if (!selectedArtist) { return []; }

        const artist = this._json[selectedArtist];
        const albums = Object.keys(artist).map(album => {
          return {
            name: album,
            year: artist[album].year,
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

export default MmssStore;
