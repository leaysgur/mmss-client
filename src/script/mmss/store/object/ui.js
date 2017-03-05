// @flow
import {
  computed,
  extendObservable,
} from 'mobx';

import { actionAll } from '../../../shared/util/class';


class Ui {
  isPlaylistShown: boolean;
  isMediaLoading: boolean;
  _isHoverPlayer: boolean;
  _isHoverPlaylist: boolean;

  selected: {
    artist: string | null;
    album: string | null;
  };

  sortBy: ArtistSort;


  constructor() {
    actionAll(this);

    extendObservable(this, {
      isPlaylistShown: computed(() => {
        return this._isHoverPlayer || this._isHoverPlaylist;
      }),
      isMediaLoading: false,
      _isHoverPlayer: false,
      _isHoverPlaylist: false,

      selected: {
        artist: null,
        album: null,
      },

      sortBy: 'latest',
    });
  }

  setHoverPlayer(bool: boolean): void {
    this._isHoverPlayer = bool;
  }

  setHoverPlaylist(bool: boolean): void {
    this._isHoverPlaylist = bool;
  }

  setMediaLoading(bool: boolean): void {
    this.isMediaLoading = bool;
  }

  setSelected(target: 'artist' | 'album', name: string | null): void {
    if (target === 'artist') {
      this.selected.album = null;
    }
    this.selected[target] = name;
  }

  lotateSortBy(): void {
    if (this.sortBy === 'latest') {
      this.sortBy = 'name';
      return;
    }
    if (this.sortBy === 'name') {
      this.sortBy = 'latest';
      return;
    }
  }
}

export default Ui;
