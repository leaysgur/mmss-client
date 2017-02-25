// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';

import type { IObservableArray } from 'mobx';
import type { Song } from './finder';


class Playlist {
  items: IObservableArray<Song>;
  nowPlayingIdx: ?number;
  nowPlaying: ?Song;

  constructor() {
    extendObservable(this, {
      items: [],

      nowPlayingIdx: null,
      nowPlaying: computed(() => {
        const idx = this.nowPlayingIdx;
        if (typeof idx !== 'number') { return null; }

        return this.items[idx];
      }),
    });

    const forBindThis: any = this;
    [
      'init',
      'prev', 'next',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  init(items: Song[]) {
    this.items.replace(items);
    // 先頭から再生
    this.nowPlayingIdx = 0;
  }

  prev() {}

  next(): void {
    const idx = this.nowPlayingIdx;

    if (idx === this.items.length) {
      this.nowPlayingIdx = 0;
    } else {
      this.nowPlayingIdx = idx + 1;
    }
  }
}

export default Playlist;
