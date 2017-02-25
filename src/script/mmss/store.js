// @flow
import PlaylistObject from './object/playlist';
import FinderObject from './object/finder';
import UiObject from './object/ui';

import type { MusicJSON } from './object/finder';


class MmssStore {
  playlist: PlaylistObject;
  finder: FinderObject;
  ui: UiObject;

  constructor(json: MusicJSON) {
    this.playlist = new PlaylistObject();
    this.finder = new FinderObject(json);
    this.ui = new UiObject();
  }
}

export default MmssStore;
