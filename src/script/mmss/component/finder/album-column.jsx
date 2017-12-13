import React from 'react';
import { observer } from 'mobx-react';

import AlbumItem from './album-item.jsx';

const AlbumColumn = ({ ui, albums, onClickAlbum, onClickPlayAlbum }) => (
  <div className="Finder_Column">
    <div className="Finder_Head">
      <p>Albums</p>
    </div>
    <div className="Finder_Body">
      <ul>
        {albums.map(album => (
          <li key={album.name}>
            <AlbumItem
              item={album}
              isSelected={album.name === ui.selected.album}
              onClick={onClickAlbum}
              onClickPlay={onClickPlayAlbum}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default observer(AlbumColumn);
