// @flow
import {
  computed,
  extendObservable,
} from 'mobx';

import { actionAll } from '../../../shared/util/class';

import type { IObservableArray } from 'mobx';


class Playlist {
  items: IObservableArray<Song>;
  nowPlayingIdx: number;
  nowPlaying: ?Song;

  constructor() {
    actionAll(this);

    extendObservable(this, {
      items: [],

      nowPlayingIdx: -1,
      nowPlaying: computed(() => {
        const idx = this.nowPlayingIdx;
        if (idx === -1) { return null; }

        return this.items[idx];
      }),
    });
  }

  init(items: Song[]) {
    this.items.replace(items);
    // 先頭から再生
    this.nowPlayingIdx = 0;
  }

  prev(): void {
    const idx = this.nowPlayingIdx;

    if (idx === 0) {
      this.nowPlayingIdx = this.items.length - 1;
    } else {
      this.nowPlayingIdx = idx - 1;
    }
  }

  next(): void {
    const idx = this.nowPlayingIdx;

    if (idx === this.items.length - 1) {
      this.nowPlayingIdx = 0;
    } else {
      this.nowPlayingIdx = idx + 1;
    }
  }
}

export default Playlist;
