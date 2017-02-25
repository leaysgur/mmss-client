// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import type MmssEvent from '../event';
import type PlaylistObject from '../store/object/playlist';
import type MediaObject from '../store/object/media';
import type UiObject from '../store/object/ui';


class Player extends React.Component {
  props: {
    event: MmssEvent;
    playlist: PlaylistObject;
    media: MediaObject;
    ui: UiObject;
  };

  render() {
    const { onClickTogglePlaylist } = this.props.event;
    const { nowPlaying } = this.props.playlist;
    const { currentSrc } = this.props.media;
    const { isMediaLoading } = this.props.ui;

    console.log(isMediaLoading ? 'loading..' : 'loaded');

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
