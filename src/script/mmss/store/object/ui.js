// @flow
import {
  action,
  extendObservable,
} from 'mobx';


class Ui {
  isPlaylistShown: boolean;
  isMediaLoading: boolean;

  constructor() {
    extendObservable(this, {
      isPlaylistShown: false,
      isMediaLoading: false,
    });

    const forBindThis: any = this;
    [
      'togglePlaylist',
      'setMediaLoading',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
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
