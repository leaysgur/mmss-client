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
      'init',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  init(items: Song[]) {
    this.items.replace(items);
  }
}

export default Playlist;
