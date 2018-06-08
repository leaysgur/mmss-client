import { decorate, observable, computed } from 'mobx';

class Playlist {
  constructor() {
    this.items = [];
    this.nowPlayingIdx = -1;
  }

  get nowPlaying() {
    const idx = this.nowPlayingIdx;
    if (idx === -1) {
      return null;
    }

    return this.items[idx];
  }

  get nextPlaying() {
    const idx = this.nowPlayingIdx;
    if (idx === -1) {
      return null;
    }

    const nextIdx = idx === this.items.length - 1 ? 0 : idx + 1;
    return this.items[nextIdx];
  }

  init(items) {
    this.items.replace(items);
    // 先頭から再生
    this.nowPlayingIdx = 0;
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

  jump(item) {
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
