import PlaylistObject from './object/playlist';
import FinderObject from './object/finder';
import UiObject from './object/ui';
import MediaObject from './object/media';

class MmssStore {
  constructor(json) {
    this.ui = new UiObject();
    this.finder = new FinderObject(json);
    this.playlist = new PlaylistObject();
    this.media = new MediaObject();

    this.mediaCache = new Map();
  }
}

export default MmssStore;