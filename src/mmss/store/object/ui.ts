import { decorate, observable, computed } from 'mobx';

class Ui {
  isMediaLoading: boolean;
  selected: {
    artist: string | null;
    album: string | null;
  };
  sortBy: 'latest' | 'name';
  pinnedArtist: string | null;
  loadProgress: number;
  // XXX: なぜか private にすると decorate() で型エラーになる
  isHoverPlayer: boolean;
  // XXX: なぜか private にすると decorate() で型エラーになる
  isHoverPlaylist: boolean;
  private timer: number | undefined;

  constructor() {
    this.isMediaLoading = false;
    this.selected = {
      artist: null,
      album: null,
    };
    this.sortBy = 'latest';
    this.pinnedArtist = null;
    this.loadProgress = 0;
    this.timer = undefined;
    this.isHoverPlayer = false;
    this.isHoverPlaylist = false;
  }

  get isPlaylistShown(): boolean {
    return this.isHoverPlayer || this.isHoverPlaylist;
  }

  setHoverPlayer(bool: boolean) {
    this.isHoverPlayer = bool;
  }

  setHoverPlaylist(bool: boolean) {
    this.isHoverPlaylist = bool;
  }

  setMediaLoading(bool: boolean) {
    this.isMediaLoading = bool;

    if (bool) {
      this.loadProgress = 0;
      if (this.timer) {
        return;
      }
      this.timer = requestAnimationFrame(() => this.incrementLoadProgress());
    } else {
      if (this.timer) {
        cancelAnimationFrame(this.timer);
      }
      this.loadProgress = 100;
      this.timer = window.setTimeout(() => this.clearLoadProgress(), 500);
    }
  }

  setSelected(target: string, name: string) {
    switch (target) {
      case 'artist':
        this.selected.album = null;
        this.selected.artist = name;
        break;
      case 'album':
        this.selected.album = name;
        break;
      default:
    }
  }

  lotateSortBy() {
    switch (this.sortBy) {
      case 'latest': this.sortBy = 'name'; break;
      case 'name': this.sortBy = 'latest'; break;
      default:
    }
  }

  setPinnedArtist(artistName: string) {
    this.pinnedArtist = this.pinnedArtist ? null : artistName;
  }

  private clearLoadProgress() {
    this.loadProgress = 0;
    clearTimeout(this.timer);
    this.timer = undefined;
  }

  private incrementLoadProgress() {
    this.timer = requestAnimationFrame(() => this.incrementLoadProgress());
    // カカシなので99で止めて間をもたせる
    this.loadProgress = Math.min(this.loadProgress + 1, 99);
  }
}

decorate(Ui, {
  isMediaLoading: observable,
  selected: observable,
  sortBy: observable,
  pinnedArtist: observable,
  loadProgress: observable,
  isHoverPlayer: observable,
  isHoverPlaylist: observable,
  isPlaylistShown: computed,
});
export default Ui;
