// @flow
import React from 'react';
import { observer } from 'mobx-react';

import AlbumItem from './album-item.jsx';

import type UiObject from '../../store/object/ui';


const AlbumColumn = ({
  ui,
  albums,
  onClickAlbum,
  onClickPlayAlbum,
}: {
  ui: UiObject;
  albums: Album[];
  onClickAlbum: (album: Album) => void;
  onClickPlayAlbum: (album: Album) => void;
}) => (
  <div className="Finder_Column">
    <div>
      <div className="Finder_Head">
        <p># Albums</p>
      </div>
    </div>
    <div className="Scroller">
      <ul>
        { albums.length === 0 &&
          <li className="Finder_Row">Artist not selected</li>
        }
        { albums.map(album => (
        <li className="Finder_Row" key={album.name}>
          <AlbumItem
            item={album}
            isSelected={album.name === ui.selected.album}
            onClick={onClickAlbum}
            onClickPlay={onClickPlayAlbum}
          />
        </li>
        )) }
      </ul>
    </div>
  </div>
);

export default observer(AlbumColumn);
