import React from 'react';
import { observer } from 'mobx-react';

const ArtistItem = ({
  item,
  isSelected,
  onClickPlay,
  onClick,
}) => (
  <div
    className={`ArtistItem ${isSelected ? '-selected' : ''}`}
    onClick={() => {
      onClickPlay(item);
    }}
    onMouseEnter={() => {
      onClick(item);
    }}
  >
    <div>{item.name || '-'}</div>
    <div className="ArtistItem_Sub">
      {item.albums.length} album(s)
    </div>
  </div>
);

export default observer(ArtistItem);
