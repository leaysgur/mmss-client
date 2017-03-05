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
  _handleEnded: () => void;
  props: {
    event: MmssEvent;
    playlist: PlaylistObject;
    media: MediaObject;
    ui: UiObject;
  };

  constructor() {
    super();

    this._handleEnded = () => {
      this.props.event.onEndedMedia();
    };
  }

  render() {
    const {
      onClickTogglePlaylist,
      onClickPrev, onClickNext,
    } = this.props.event;
    const { nowPlaying } = this.props.playlist;
    const { currentSrc } = this.props.media;
    const { isMediaLoading } = this.props.ui;

    return (
      <div className="Player">
        <div className={`Player_Action ${isMediaLoading ? '-loading' : ''}`}>
          <a {...currentSrc && !isMediaLoading ? { onClick: (ev) => { ev.preventDefault(); onClickPrev(); }, href: '#' } : {}}>
            [prev]
          </a>
          <a {...currentSrc && !isMediaLoading ? { onClick: (ev) => { ev.preventDefault(); onClickNext(); }, href: '#' } : {}}>
            [next]
          </a>
          <audio
            ref={(ref) => { this.el = ref; }}
            className="Player_Audio"
            autoPlay
            controls
            src={currentSrc}
          ></audio>
        </div>
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
}

export default inject('event')(observer(Player));
