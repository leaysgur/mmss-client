import MmssEvent from '../../event';

const UiEvent = {
  onMouseEnterPlayer() {
    const $this = this as unknown as MmssEvent;
    $this.store.ui.setHoverPlayer(true);
  },

  onMouseLeavePlayer() {
    const $this = this as unknown as MmssEvent;
    $this.store.ui.setHoverPlayer(false);
  },

  onMouseEnterPlaylist() {
    const $this = this as unknown as MmssEvent;
    $this.store.ui.setHoverPlaylist(true);
  },

  onMouseLeavePlaylist() {
    const $this = this as unknown as MmssEvent;
    $this.store.ui.setHoverPlaylist(false);
  },
};

export default UiEvent;
