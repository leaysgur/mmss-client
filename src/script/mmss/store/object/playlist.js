// @flow
import {
  action,
  computed,
  extendObservable,
} from 'mobx';

import type { IObservableArray } from 'mobx';


class Playlist {
  items: IObservableArray<Song>;
  nowPlayingIdx: number;
  nowPlaying: ?Song;

  constructor() {
    extendObservable(this, {
      items: [],

      nowPlayingIdx: -1,
      nowPlaying: computed(() => {
        const idx = this.nowPlayingIdx;
        if (idx === -1) { return null; }

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
