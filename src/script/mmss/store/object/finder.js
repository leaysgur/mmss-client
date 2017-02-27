// @flow
import {
  action,
  computed,
  extendObservable,
  observable,
} from 'mobx';
import type { IObservableArray } from 'mobx';


class Finder {
  _json: MusicJSON;

  isNameSort: boolean;

  artists: Artist[];
  albums: IObservableArray<Album>;
  songs: IObservableArray<Song>;


  constructor(json: MusicJSON) {
    this._json = json;

    extendObservable(this, {
      /**
       * JSONのアーティストの並びは何もしないと更新順になってる。
       * こっちでソートしようにもルールが取れないので、毎回JSONから作る。
       *
       */
      isNameSort: false,
      artists: computed(() => {
        const artists = this._json.slice();
        if (this.isNameSort) {
          artists.sort((a, b) => { return a.name < b.name ? -1 : 1; });
        }

        return artists;
      }),

      albums: observable.shallow([]),
      songs: observable.shallow([]),
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

  initAlbums(albums: Album[]): void {
    this.albums.replace(albums);
    // アーティストを変えたら曲も初期化しておく
    this.songs.clear();
  }

  initSongs(songs: Song[]): void {
    this.songs.replace(songs);
  }
}

export default Finder;
