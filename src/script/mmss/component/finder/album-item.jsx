// @flow
import React from 'react';
import { observer } from 'mobx-react';


const AlbumItem = ({
  item,
  onClick,
  onClickPlay,
}: {
  item: Album;
  onClick: (item: Album) => void;
  onClickPlay: (item: Album) => void;
}) => (
  <div className="AlbumItem" onClick={() => { onClick(item); }}>
    <a className="AlbumItem_Action" href="#" onClick={(ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      onClickPlay(item);
    }}>[play]</a>
    <div className="AlbumItem_Body">
      <div>
        {item.name}
      </div>
      <div className="AlbumItem_Body_Sub">
        {item.year || '-'} / {item.songs.length} song(s)
      </div>
    </div>
  </div>
);

export default observer(AlbumItem);
