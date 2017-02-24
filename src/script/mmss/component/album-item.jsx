// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type { Album } from '../store';

let yearLabel;

const AlbumItem = ({
  item,
  onClick,
  onClickPlay,
}: {
  item: Album;
  onClick: (item: Album) => void;
  onClickPlay: (item: Album) => void;
}) => {
  const year = item.year || '-';

  return (
  <div onClick={() => { onClick(item); }}>
    { year !== yearLabel ? <div>{(yearLabel = year)}</div> : null }
    {item.name}
    <a href="#" onClick={(ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      onClickPlay(item);
    }}>[playAll]</a>
  </div>
  );
};

export default observer(AlbumItem);
