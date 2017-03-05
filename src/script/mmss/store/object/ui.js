// @flow
import { extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';


class Ui {
  isPlaylistShown: boolean;
  isMediaLoading: boolean;

  selected: {
    artist: string | null;
    album: string | null;
  };

  constructor() {
    actionAll(this);

    extendObservable(this, {
      isPlaylistShown: false,
      isMediaLoading: false,

      selected: {
        artist: null,
        album: null,
      }
    });
  }

  togglePlaylist(): void {
    this.isPlaylistShown = !this.isPlaylistShown;
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
}

export default Ui;
