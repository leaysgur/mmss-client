// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import type MmssEvent from '../event';


class Player extends React.Component {
  props: {
    event: MmssEvent;
  };

  render() {
    const { onClickTogglePlaylist } = this.props.event;
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

export default inject('event')(observer(Player));
