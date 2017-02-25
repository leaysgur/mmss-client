// @flow
import React from 'react';
import { observer } from 'mobx-react';


class Player extends React.Component {
  render() {
    return (
      <div className="Player">
        <audio
          className="Player_Audio"
          autoPlay
          controls
        ></audio>
      </div>
    );
  }
}

export default observer(Player);
