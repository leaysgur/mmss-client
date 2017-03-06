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
  el: HTMLDivElement;
  audioEl: HTMLAudioElement;
  _handleEnded: () => void;
  _handleMouseEnter: () => void;
  _handleMouseLeave: () => void;
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
    this._handleMouseEnter = () => {
      this.props.event.onMouseEnterPlayer();
    };
    this._handleMouseLeave = () => {
      this.props.event.onMouseLeavePlayer();
    };
  }

  render() {
    const {
      onClickPrev, onClickNext,
    } = this.props.event;
    const { nowPlaying } = this.props.playlist;
    const { currentSrc } = this.props.media;
    const { isMediaLoading } = this.props.ui;

    return (
      <div
        ref={(ref) => { this.el = ref; }}
        className="Player"
      >
        <div className={`Player_Action ${isMediaLoading ? '-loading' : ''}`}>
          <a {...currentSrc && !isMediaLoading ? { onClick: (ev) => { ev.preventDefault(); onClickPrev(); }, href: '#' } : {}}>
            [prev]
          </a>
          <a {...currentSrc && !isMediaLoading ? { onClick: (ev) => { ev.preventDefault(); onClickNext(); }, href: '#' } : {}}>
            [next]
          </a>
          <audio
            ref={(ref) => { this.audioEl = ref; }}
            className="Player_Audio"
            autoPlay
            controls
            src={currentSrc}
          ></audio>
        </div>
        <div className="Player_Info">
          {nowPlaying ? `${nowPlaying.artist} - ${nowPlaying.name}` : '-'}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.el.addEventListener('mouseenter', this._handleMouseEnter, false);
    this.el.addEventListener('mouseleave', this._handleMouseLeave, false);
    this.audioEl.addEventListener('ended', this._handleEnded, false);
  }

  componentWillUnmount() {
    this.el.removeEventListener('mouseenter', this._handleMouseEnter, false);
    this.el.removeEventListener('mouseleave', this._handleMouseLeave, false);
    this.audioEl.removeEventListener('ended', this._handleEnded, false);
  }
}

export default inject('event')(observer(Player));
