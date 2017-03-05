// @flow
import React from 'react';
import { observer } from 'mobx-react';


const ArtistItem = ({
  item,
  onClick,
  onClickPlay,
}: {
  item: Artist;
  onClick: (item: Artist) => void;
  onClickPlay: (item: Artist) => void;
}) => (
  <div className="ArtistItem" onClick={() => { onClick(item); }}>
    <a className="ArtistItem_Action" href="#" onClick={(ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      onClickPlay(item);
    }}>[play]</a>
    <div className="ArtistItem_Body">
      <div>
      {item.name}
      </div>
      <div className="ArtistItem_Body_Sub">
        {item.albums.length} album(s)
      </div>
    </div>
  </div>
);

export default observer(ArtistItem);
