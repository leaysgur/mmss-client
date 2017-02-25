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

  render() {
    const {
      onClickTogglePlaylist,
      onClickPrev, onClickNext,
    } = this.props.event;
    const { nowPlaying } = this.props.playlist;
    const { currentSrc } = this.props.media;
    const { isMediaLoading } = this.props.ui;

    console.log(isMediaLoading ? 'loading..' : 'loaded');

    return (
      <div className="Player">
        <button
          type="button"
          {...currentSrc ? { onClick: onClickPrev } : { disabled: true }}
        >prev</button>
        <button
          type="button"
          {...currentSrc ? { onClick: onClickNext } : { disabled: true }}
        >next</button>
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

  componentDidMount() {
    this.el.addEventListener('ended', this._handleEnded, false);
  }

  componentWillUnmount() {
    this.el.removeEventListener('ended', this._handleEnded, false);
  }

  _handleEnded() {
    this.props.event.onEndedMedia();
  }
}

export default inject('event')(observer(Player));
