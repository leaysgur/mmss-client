// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import type MmssEvent from '../event';
import type PlaylistObject from '../store/object/playlist';
import type MediaObject from '../store/object/media';


class Player extends React.Component {
  props: {
    event: MmssEvent;
    playlist: PlaylistObject;
    media: MediaObject;
  };

  render() {
    const { onClickTogglePlaylist } = this.props.event;
    const { nowPlaying } = this.props.playlist;
    const { currentSrc } = this.props.media;

    return (
      <div className="Player">
        <audio
          className="Player_Audio"
          autoPlay
          controls
          src={currentSrc}
        ></audio>
        <div
          className="Player_Info"
          onClick={onClickTogglePlaylist}
        >
          {nowPlaying ? nowPlaying.name : '-'}
        </div>
      </div>
    );
  }
}

export default inject('event')(observer(Player));
