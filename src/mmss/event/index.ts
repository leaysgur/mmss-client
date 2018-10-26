import { bindAll } from '../../shared/util/class';

import CommonEvent from './object/common';
import UiEvent from './object/ui';
import PlaylistEvent from './object/playlist';

import MmssStore from '../store';

class MmssEvent {
  commonEvent: CommonEvent;
  playlistEvent: PlaylistEvent;
  uiEvent: UiEvent;

  constructor(store: MmssStore) {
    bindAll(this);

    this.commonEvent = new CommonEvent(store);
    this.playlistEvent = new PlaylistEvent(store.playlist);
    this.uiEvent = new UiEvent(store.ui);
  }
}

export default MmssEvent;
