import { decorate, observable, computed, IObservableArray } from 'mobx';

import { Song } from '../../../shared/typings/mmss';

class Playlist {
  items: IObservableArray<Song>;
  nowPlayingIdx: number;

  constructor() {
    // XXX: [] のままだと型エラーな上に、 unknown[] を経由しないとキャストもできない
    this.items = [] as unknown[] as IObservableArray<Song>;
    this.nowPlayingIdx = -1;
  }

  get nowPlaying(): Song | null {
    const idx = this.nowPlayingIdx;
    if (idx === -1) {
      return null;
    }

    return this.items[idx];
  }

  get nextPlaying(): Song | null {
    const idx = this.nowPlayingIdx;
    if (idx === -1) {
      return null;
    }

    const nextIdx = idx === this.items.length - 1 ? 0 : idx + 1;
    return this.items[nextIdx];
  }

  init(items: Song[]) {
    this.items.replace(items);
    // 先頭から再生
    this.nowPlayingIdx = 0;
  }

  add(item: Song) {
    this.items.push(item);
  }

  prev() {
    const idx = this.nowPlayingIdx;

    if (idx === 0) {
      this.nowPlayingIdx = this.items.length - 1;
    } else {
      this.nowPlayingIdx = idx - 1;
    }
  }

  next() {
    const idx = this.nowPlayingIdx;

    if (idx === this.items.length - 1) {
      this.nowPlayingIdx = 0;
    } else {
      this.nowPlayingIdx = idx + 1;
    }
  }

  jump(item: Song) {
    const idx = this.items.indexOf(item);

    if (idx !== -1) {
      this.nowPlayingIdx = idx;
    }
  }
}

decorate(Playlist, {
  items: observable,
  nowPlayingIdx: observable,
  nowPlaying: computed,
  nextPlaying: computed,
});
export default Playlist;
