import React from 'react';
import { observer } from 'mobx-react';

import AlbumItem from './album-item.jsx';

const AlbumColumn = ({ ui, albums, onClickAlbum, onClickPlayAlbum }) => (
  <div className="Finder_Column">
    <div>
      <div className="Finder_Head">
        <p>Albums</p>
      </div>
    </div>
    <div className="Scroller">
      <ul>
        {albums.map(album => (
          <li className="Finder_Row" key={album.name}>
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
