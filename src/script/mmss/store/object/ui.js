import { decorate, observable, computed } from 'mobx';

class Ui {
  constructor() {
    this._timer = null;

    this.isMediaLoading = false;
    this._isHoverPlayer = false;
    this._isHoverPlaylist = false;
    this.selected = {
      artist: null,
      album: null,
    };
    this.sortBy = 'latest';
    this.filterBy = null;
    this.loadProgress = 0;
  }

  get isPlaylistShown() {
    return this._isHoverPlayer || this._isHoverPlaylist;
  }

  setHoverPlayer(bool) {
    this._isHoverPlayer = bool;
  }

  setHoverPlaylist(bool) {
    this._isHoverPlaylist = bool;
  }

  setMediaLoading(bool) {
    this.isMediaLoading = bool;

    if (bool) {
      this.loadProgress = 0;
      if (this._timer) {
        return;
      }
      this._timer = requestAnimationFrame(() => this._incrementLoadProgress());
    } else {
      this._timer && cancelAnimationFrame(this._timer);
      this.loadProgress = 100;
      this._timer = setTimeout(() => this._clearLoadProgress(), 500);
    }
  }

  setSelected(target, name) {
    if (target === 'artist') {
      this.selected.album = null;
    }
    this.selected[target] = name;
  }

  lotateSortBy() {
    if (this.sortBy === 'latest') {
      this.sortBy = 'name';
      return;
    }
    if (this.sortBy === 'name') {
      this.sortBy = 'latest';
      return;
    }
  }

  setFilterBy(artistName) {
    this.filterBy = this.filterBy ? null : artistName;
  }

  _clearLoadProgress() {
    this.loadProgress = 0;
    clearTimeout(this._timer);
    this._timer = null;
  }
  _incrementLoadProgress() {
    this._timer = requestAnimationFrame(() => this._incrementLoadProgress());
    // カカシなので99で止めて間をもたせる
    this.loadProgress = Math.min(this.loadProgress + 1, 99);
  }
}

decorate(Ui, {
  isMediaLoading: observable,
  _isHoverPlayer: observable,
  _isHoverPlaylist: observable,
  selected: observable,
  sortBy: observable,
  filterBy: observable,
  loadProgress: observable,
  isPlaylistShown: computed,
});
export default Ui;
