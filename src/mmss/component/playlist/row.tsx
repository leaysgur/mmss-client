import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import Time, { format } from '../shared/time';

import { Song } from '../../../shared/typings/mmss';

interface Props {
  no: string;
  item: Song;
  isPlaying: boolean;
  onClick(item: Song): void;
}

export const PlaylistItem = observer(({ no, item, isPlaying, onClick }: Props) => (
  <Wrap>
    <No>{no}</No>
    <Mark>
      {isPlaying ? (
        <img src="/image/i-playing.svg" />
      ) : null }
    </Mark>
    <Item title={item.name}>
      {isPlaying ? (
        <span>{item.name || '-'}</span>
      ) : (
        <a
          href="#"
          onClick={ev => {
            ev.preventDefault();
            onClick(item);
          }}
        >
          {item.name || '-'}
        </a>
      )}
    </Item>
    <Item title={item.artist}>
      {item.artist || '-'}
    </Item>
    <Item title={item.album}>
      {item.album || '-'}
    </Item>
    <Duration title={format(item.duration)}>
      <Time seconds={item.duration} />
    </Duration>
  </Wrap>
));

export const PlaylistHeader = () => (
  <Wrap>
    <No />
    <Mark />
    <Item>Song</Item>
    <Item>Artist</Item>
    <Item>Album</Item>
    <Duration>Time</Duration>
  </Wrap>
);

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 4% 4% 40% 20% 20% 10%;
`;

const No = styled.div`
  text-align: right;
`;

const Mark = styled.div`
  text-align: right;
  padding-right: 5px;

  & img {
    height: 8px;
  }
`;

const Item = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Duration = styled.div`
  text-align: right;
`;
