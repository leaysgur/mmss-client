import React from 'react';
import { inject, observer } from 'mobx-react';

import ProgressBar from '../component/player/progress-bar.jsx';

class Player extends React.Component {
  constructor() {
    super();

    this._handleKeyDown = ev => {
      if (ev.keyCode !== 32) {
        return;
      }
      if (this.audioEl instanceof HTMLAudioElement === false) {
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
    const {
      onClickPrev, onClickNext,
      onClickNowPlaying,
      onMouseEnterPlayer,
      onMouseLeavePlayer,
      onEndedMedia,
    } = this.props.event;
    const { nowPlaying } = this.props.playlist;
    const { currentSrc } = this.props.media;
    const { isMediaLoading, loadProgress } = this.props.ui;
    const isControlable = currentSrc && !isMediaLoading;

    return (
      <div
        className="Player"
        onMouseEnter={onMouseEnterPlayer}
        onMouseLeave={onMouseLeavePlayer}
      >
        <div className="Player_ProgressBar">
          <ProgressBar loadProgress={loadProgress} />
        </div>

        <div className="Player_Info" onClick={onClickNowPlaying}>
          {nowPlaying ? `${nowPlaying.artist} - ${nowPlaying.name}` : '-'}
        </div>

        <div className={`Player_Controls ${isControlable ? '' :  '-disabled'}`}>
          <a
            className="Player_Controls_Item"
            onClick={() => {
              isControlable && onClickPrev();
            }}
          >
            <img src="/image/i-backward.png" />
          </a>
          <a
            className="Player_Controls_Item"
            onClick={() => {
              isControlable && onClickNext();
            }}
          >
            <img src="/image/i-forward.png" />
          </a>
          <audio
            ref={el => this.audioEl = el}
            className="Player_Controls_Audio"
            autoPlay
            controls
            src={currentSrc}
            onEnded={onEndedMedia}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('keydown', this._handleKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown, false);
  }
}

export default inject('event')(observer(Player));
