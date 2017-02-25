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
  el: HTMLAudioElement;
  props: {
    event: MmssEvent;
    playlist: PlaylistObject;
    media: MediaObject;
    ui: UiObject;
  };

  handleEvent(ev: Event) {
    if (ev.type === 'ended') {
      this.props.event.onEndedMedia();
    }
  }

  componentDidMount() {
    // flow-disable-line
    this.el.addEventListener('ended', this, false);
  }

  componentWillUnmount() {
    // flow-disable-line
    this.el.removeEventListener('ended', this, false);
  }

  render() {
    const { onClickTogglePlaylist } = this.props.event;
    const { nowPlaying } = this.props.playlist;
    const { currentSrc } = this.props.media;
    const { isMediaLoading } = this.props.ui;

    console.log(isMediaLoading ? 'loading..' : 'loaded');

    return (
      <div className="Player">
        <audio
          ref={(ref) => { this.el = ref; }}
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
