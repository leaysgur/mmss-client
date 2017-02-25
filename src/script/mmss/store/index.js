// @flow
import PlaylistObject from './object/playlist';
import FinderObject from './object/finder';
import UiObject from './object/ui';
import MediaObject from './object/media';

import type { MusicJSON } from './object/finder';


class MmssStore {
  playlist: PlaylistObject;
  finder: FinderObject;
  ui: UiObject;
  media: MediaObject;

  constructor(json: MusicJSON) {
    this.playlist = new PlaylistObject();
    this.finder = new FinderObject(json);
    this.ui = new UiObject();
    this.media = new MediaObject();
  }
}

export default MmssStore;
