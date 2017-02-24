// @flow
import PlaylistObject from './object/playlist';
import FinderObject from './object/finder';

import type { MusicJSON } from './object/finder';


class MmssStore {
  playlist: PlaylistObject;
  finder: FinderObject;

  constructor(json: MusicJSON) {
    this.playlist = new PlaylistObject();
    this.finder = new FinderObject(json);
  }
}

export default MmssStore;
