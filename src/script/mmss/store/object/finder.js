// @flow
import {
  action,
  computed,
  extendObservable,
  observable,
} from 'mobx';
import type { IObservableArray } from 'mobx';

import { toOrderNumber } from '../../utils';


class Finder {
  _json: MusicJSON;

  isNameSort: boolean;

  artists: Artist[];
  albums: IObservableArray<Album>;
  songs: IObservableArray<Song>;


  constructor(json: MusicJSON) {
    console.log(json);
    this._json = json;

    extendObservable(this, {
      /**
       * JSONは何もしないと更新順になってる。
       * こっちでソートしようにもルールが取れないので、
       * 毎回JSONから作ってる。
       *
       */
      isNameSort: false,
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

      albums: observable.shallowArray([]),
      songs: observable.shallowArray([]),
    });

    const forBindThis: any = this;
    [
      'sortArtist',
      'initAlbums', 'initSongs',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  sortArtist(): void {
    this.isNameSort = !this.isNameSort;
  }

  /**
   * 毎回ソートするのは無駄に見えて、
   * 実は必要なときに必要なものをなので効率的。
   *
   */
  initAlbums(_albums: Albums): void {
    const albums = Object.keys(_albums).map(album => {
      return {
        name: album,
        year: _albums[album].year,
        songs: _albums[album].songs,
      };
    });
    albums.sort((a, b) => {
      const yearA = toOrderNumber(a.year);
      const yearB = toOrderNumber(b.year);
      return yearA > yearB ? -1 : 1;
    });

    this.albums.replace(albums);
    // アーティストを変えたら曲も初期化しておく
    this.songs.clear();
  }

  initSongs(songs: Song[]): void {
    songs.sort((a, b) => {
      const discA = toOrderNumber(a.disc);
      const discB = toOrderNumber(b.disc);
      const trackA = toOrderNumber(a.track);
      const trackB = toOrderNumber(b.track);

      // disc順のtrack順
      return discA > discB || discA === discB && trackA > trackB ? 1 : -1;
    });

    this.songs.replace(songs);
  }
}

export type Artist = {
  name: string;
  albums: Albums;
}
type Albums = {
  [string]: Album;
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
}
export default Finder;
