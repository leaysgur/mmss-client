import React from 'react';
import { inject, observer } from 'mobx-react';

import ProgressBar from '../component/player/progress-bar.jsx';

class Player extends React.Component {
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
    this._handleKeyDown = ev => {
      if (ev.keyCode !== 32) {
        return;
      }
      if (this.audioEl.src.length === 0) {
        return;
      }
      ev.preventDefault();
      this.audioEl.paused ? this.audioEl.play() : this.audioEl.pause();
    };
  }

  render() {
    const { onClickPrev, onClickNext, onClickNowPlaying } = this.props.event;
    const { nowPlaying } = this.props.playlist;
    const { currentSrc } = this.props.media;
    const { isMediaLoading, loadProgress } = this.props.ui;

    return (
      <div
        ref={ref => {
          this.el = ref;
        }}
        className="Player"
      >
        <div className="Player_ProgressBar">
          <ProgressBar loadProgress={loadProgress} />
        </div>
        <div className={`Player_Action ${isMediaLoading ? '-loading' : ''}`}>
          <a
            {...(currentSrc && !isMediaLoading
              ? {
                  onClick: ev => {
                    ev.preventDefault();
                    onClickPrev();
                  },
                  href: '#',
                }
              : {})}
          >
            [prev]
          </a>
          <a
            {...(currentSrc && !isMediaLoading
              ? {
                  onClick: ev => {
                    ev.preventDefault();
                    onClickNext();
                  },
                  href: '#',
                }
              : {})}
          >
            [next]
          </a>
          <audio
            ref={ref => {
              this.audioEl = ref;
            }}
            className="Player_Audio"
            autoPlay
            controls
            src={currentSrc}
          />
        </div>
        <div className="Player_Info" onClick={onClickNowPlaying}>
          {nowPlaying ? `${nowPlaying.artist} - ${nowPlaying.name}` : '-'}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.el.addEventListener('mouseenter', this._handleMouseEnter, false);
    this.el.addEventListener('mouseleave', this._handleMouseLeave, false);
    this.audioEl.addEventListener('ended', this._handleEnded, false);
    window.addEventListener('keydown', this._handleKeyDown, false);
  }

  componentWillUnmount() {
    this.el.removeEventListener('mouseenter', this._handleMouseEnter, false);
    this.el.removeEventListener('mouseleave', this._handleMouseLeave, false);
    this.audioEl.removeEventListener('ended', this._handleEnded, false);
    window.removeEventListener('keydown', this._handleKeyDown, false);
  }
}

export default inject('event')(observer(Player));
