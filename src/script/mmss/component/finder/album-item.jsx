import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const AlbumItem = ({
  item,
  isSelected,
  onClickPlay,
  onClick,
}) => (
  <Wrap
    className={isSelected ? 'isSelected' : ''}
    onClick={() => onClickPlay(item)}
    onMouseEnter={() => onClick(item)}
  >
    <div>{item.name || '-'}</div>
    <Sub>
      {item.year || '-'} / {item.songs.length} song(s)
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

export default observer(AlbumItem);
