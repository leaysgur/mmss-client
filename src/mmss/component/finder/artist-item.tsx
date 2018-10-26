import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import { Artist } from '../../../shared/typings/mmss';

interface Props {
  item: Artist;
  isSelected: boolean;
  onClickPlay(item: Artist): void;
  onClick(item: Artist): void;
}

const ArtistItem = ({
  item,
  isSelected,
  onClickPlay,
  onClick,
}: Props) => (
  <Wrap
    className={isSelected ? 'isSelected' : ''}
    onClick={() => onClickPlay(item)}
    onMouseEnter={() => onClick(item)}
  >
    <div>{item.name || '-'}</div>
    <Sub>
      {item.albums.length} album(s)
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

  &.isSelected {
    border-left: 4px solid #08f;
  }
`;

const Sub = styled.div`
  padding-top: 5px;
  color: #b3b3b3;
  text-align: right;
  font-size: .7rem;
`;

export default observer(ArtistItem);
