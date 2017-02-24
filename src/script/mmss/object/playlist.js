// @flow
import {
  action,
  extendObservable,
} from 'mobx';

import type { Song } from '../store';


class Playlist {
  // XXX: 本当は Song[] なObservableArray
  items: Object;

  constructor() {
    extendObservable(this, {
      items: [],
    });

    const forBindThis: any = this;
    [
      'initWithSong'
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  initWithSong(item: Song) {
    this.items.replace([item]);
  }
}

export default Playlist;
