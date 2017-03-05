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
  nowPlaying: Song | null;
  nextPlaying: Song | null;

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
      nextPlaying: computed(() => {
        const idx = this.nowPlayingIdx;
        if (idx === -1) { return null; }

        const nextIdx = idx === this.items.length - 1 ? 0 : idx + 1;
        return this.items[nextIdx];
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

  jump(item: Song): void {
    const idx = this.items.indexOf(item);
    if (idx !== -1) {
      this.nowPlayingIdx = idx;
    }
  }
}

export default Playlist;
