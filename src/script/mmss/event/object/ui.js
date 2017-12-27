const UiEvent = {
  onMouseEnterPlayer() {
    this.store.ui.setHoverPlayer(true);
  },

  onMouseLeavePlayer() {
    this.store.ui.setHoverPlayer(false);
  },

  onMouseEnterPlaylist() {
    this.store.ui.setHoverPlaylist(true);
  },

  onMouseLeavePlaylist() {
    this.store.ui.setHoverPlaylist(false);
  },
};

export default UiEvent;
