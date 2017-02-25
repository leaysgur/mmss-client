// @flow
import React from 'react';
import { observer } from 'mobx-react';


class Player extends React.Component {
  props: {
    onClickTogglePlaylist: () => void;
  };

  render() {
    const { onClickTogglePlaylist } = this.props;
    return (
      <div className="Player">
        <audio
          className="Player_Audio"
          autoPlay
          controls
        ></audio>
        <div className="Player_Info">
          <button type="button" onClick={onClickTogglePlaylist}>togglePlaylist</button>
        </div>
      </div>
    );
  }
}

export default observer(Player);
