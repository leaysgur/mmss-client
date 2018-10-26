import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import ProgressBar from '../component/player/progress-bar';
import Audio from '../component/player/audio';

import MmssEvent from '../event';
import MmssStore from '../store';

interface Props {
  event: MmssEvent;
  store: MmssStore;
}

const Player = ({ event, store }: Props) => {
  const {
    onClickNowPlaying,
  } = event;
  const {
    onClickPrev, onClickNext,
    onEndedMedia,
  } = event.playlistEvent;
  const {
    onMouseEnterPlayer,
    onMouseLeavePlayer,
  } = event.uiEvent;

  const { nowPlaying } = store.playlist;
  const { currentSrc } = store.media;
  const { isMediaLoading, loadProgress } = store.ui;
  const isControlable = currentSrc && !isMediaLoading;

  return (
    <Wrap
      onMouseEnter={onMouseEnterPlayer}
      onMouseLeave={onMouseLeavePlayer}
    >
      <ProgressBarWrap>
        <ProgressBar loadProgress={loadProgress} />
      </ProgressBarWrap>

      <Info onClick={onClickNowPlaying}>
        {nowPlaying ? `${nowPlaying.artist} - ${nowPlaying.name}` : '-'}
      </Info>

      <Controls className={isControlable ? '' : 'isDisabled'}>
        <ControlsItem onClick={() => isControlable && onClickPrev()}>
          <img src="/image/i-backward.png" />
        </ControlsItem>
        <ControlsItem onClick={() => isControlable && onClickNext()}>
          <img src="/image/i-forward.png" />
        </ControlsItem>

        <ControlsAudio>
          <Audio
            src={currentSrc}
            onEnded={onEndedMedia}
          />
        </ControlsAudio>
      </Controls>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--footerHeight);
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #f1f3f4;
`;

const ProgressBarWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Info = styled.div`
  padding: 15px 0 5px;
  font-size: .8rem;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;

  &.isDisabled {
    pointer-events: none;
    opacity: .6;
  }
`;

const ControlsItem = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;

  & img {
    height: 15px;
  }
`;

const ControlsAudio = styled.div`
  flex: 1 1 auto;
`;

export default inject('event', 'store')(observer(Player));
