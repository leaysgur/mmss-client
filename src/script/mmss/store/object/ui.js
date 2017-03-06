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

  _timer: number | null;
  loadProgress: number;


  constructor() {
    actionAll(this);

    this._timer = null;

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

      loadProgress: 0,
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

    if (bool) {
      this.loadProgress = 0;
      if (this._timer) { return; }
      this._timer = requestAnimationFrame(() => this._incrementLoadProgress());
    } else {
      this._timer && cancelAnimationFrame(this._timer);
      this.loadProgress = 100;
      this._timer = setTimeout(() => this._clearLoadProgress(), 500);
    }
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

  _clearLoadProgress(): void {
    this.loadProgress = 0;
    clearTimeout(this._timer);
    this._timer = null;
  }
  _incrementLoadProgress(): void {
    this._timer = requestAnimationFrame(() => this._incrementLoadProgress());
    // カカシなので99で止めて間をもたせる
    this.loadProgress = Math.min(this.loadProgress + 1, 99);
  }
}

export default Ui;
