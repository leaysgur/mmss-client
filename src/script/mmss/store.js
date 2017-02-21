// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';


class MmssStore {
  json: Object;
  artists: string[];
  albums: string[];
  songs: Object[];
  selected: {
    artist: ?string;
    album: ?string;
  };

  constructor() {
    extendObservable(this, {
      selected: {
        artist: null,
        album: null,
      },
      artists: computed(() => {
        return Object.keys(this.json);
      }),
      albums: computed(() => {
        if (this.selected.artist === null) { return []; }
        return Object.keys(this.json[this.selected.artist]);
      }),
      songs: computed(() => {
        if (this.selected.album === null) { return []; }
        return this.json[this.selected.artist][this.selected.album];
      }),
    });

    const forBindThis: any = this;
    [
      'load',
      'selectArtist', 'selectAlbum',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  load(json: Object): void {
    console.log(json);
    this.json = json;
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
