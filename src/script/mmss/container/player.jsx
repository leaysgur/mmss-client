import React from 'react';
import { inject, observer } from 'mobx-react';

import ProgressBar from '../component/player/progress-bar.jsx';
import Audio from '../component/player/audio.jsx';

const Player = ({
  event,
  media,
  playlist,
  ui,
}) => {
  const {
    onClickPrev, onClickNext,
    onClickNowPlaying,
    onMouseEnterPlayer,
    onMouseLeavePlayer,
    onEndedMedia,
  } = event;
  const { nowPlaying } = playlist;
  const { currentSrc } = media;
  const { isMediaLoading, loadProgress } = ui;
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
        <div className="Player_Controls_Audio">
          <Audio
            src={currentSrc}
            onEnded={onEndedMedia}
          />
        </div>
      </div>
    </div>
  );
};

export default inject('event')(observer(Player));
