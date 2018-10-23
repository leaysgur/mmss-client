import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import Time from '../shared/time.jsx';

const SongItem = ({ item, onClickPlay, onClickAddToPlaylist }) => (
  <Wrap
    onClick={ev => {
      ev.metaKey
        ? onClickAddToPlaylist(item)
        : onClickPlay(item);
    }}
  >
    <div>{item.name}</div>
    <Sub>
      <div>{item.artist}</div>
      <div>
        Disc {item.disc || '-'}
        {' / '}
        Track {item.track || '-'}
        {' / '}
        <Time seconds={item.duration} />
      </div>
    </Sub>
  </Wrap>
);

const Wrap = styled.div`
  box-sizing: border-box;
  margin: 2px;
  padding: 5px 10px;
  background-color: #fff;
  cursor: pointer;
  font-size: .9rem;
  line-height: 1.1rem;
`;

const Sub = styled.div`
  padding-top: 5px;
  color: #b3b3b3;
  text-align: right;
  font-size: .7rem;
  // Songだけ
  display: flex;
  justify-content: space-between;
`;

export default observer(SongItem);
