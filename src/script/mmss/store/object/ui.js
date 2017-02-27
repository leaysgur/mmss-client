// @flow
import {
  extendObservable,
} from 'mobx';

import { actionAll } from '../../../shared/util/class';


class Ui {
  isPlaylistShown: boolean;
  isMediaLoading: boolean;

  constructor() {
    actionAll(this);

    extendObservable(this, {
      isPlaylistShown: false,
      isMediaLoading: false,
    });
  }

  togglePlaylist(): void {
    this.isPlaylistShown = !this.isPlaylistShown;
  }

  setMediaLoading(bool: boolean): void {
    this.isMediaLoading = bool;
  }
}

export default Ui;
