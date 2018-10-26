import { bindAll } from '../../../shared/util/class';

import MmssStore from '../../store';

class UiEvent {
  private ui: MmssStore['ui'];

  constructor(ui: MmssStore['ui']) {
    bindAll(this);

    this.ui = ui;
  }

  onMouseEnterPlayer() {
    this.ui.setHoverPlayer(true);
  }

  onMouseLeavePlayer() {
    this.ui.setHoverPlayer(false);
  }

  onMouseEnterPlaylist() {
    this.ui.setHoverPlaylist(true);
  }

  onMouseLeavePlaylist() {
    this.ui.setHoverPlaylist(false);
  }
}

export default UiEvent;
