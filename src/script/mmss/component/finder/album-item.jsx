import React from 'react';
import { observer } from 'mobx-react';

const AlbumItem = ({
  item,
  isSelected,
  onClickPlay,
  onClick,
}) => (
  <div
    className={`AlbumItem ${isSelected ? '-selected' : ''}`}
    onClick={() => {
      onClickPlay(item);
    }}
    onMouseEnter={() => {
      onClick(item);
    }}
  >
    <div>{item.name || '-'}</div>
    <div className="AlbumItem_Sub">
      {item.year || '-'} / {item.songs.length} song(s)
    </div>
  </div>
);

export default observer(AlbumItem);
