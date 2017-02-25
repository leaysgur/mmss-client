// @flow
import {
  action,
  extendObservable,
} from 'mobx';


class Ui {
  isPlaylistShown: boolean;

  constructor() {
    extendObservable(this, {
      isPlaylistShown: false,
    });

    const forBindThis: any = this;
    [
      'togglePlaylist',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  togglePlaylist(): void {
    this.isPlaylistShown = !this.isPlaylistShown;
  }
}

export default Ui;
