// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Time, { format } from './time.jsx';


const PlaylistItem = ({
  item,
  isPlaying,
  onClick,
}: {
  item: Song;
  isPlaying: boolean;
  onClick: (item: Song) => void;
}) => (
  <div className="PlaylistItem">
    <div className="PlaylistItem_Mark">
      {isPlaying ? '✓' : '　'}
    </div>
    <div className="PlaylistItem_Name" title={item.name}>
      { isPlaying ? (
      <span>{item.name || '-'}</span>
      ) : (
      <a href="#" onClick={ev => { ev.preventDefault(); onClick(item); }}>
        {item.name || '-'}
      </a>
      ) }
    </div>
    <div className="PlaylistItem_Artist" title={item.artist}>
      {item.artist || '-'}
    </div>
    <div className="PlaylistItem_Album" title={item.album}>
      {item.album || '-'}
    </div>
    <div className="PlaylistItem_Duration" title={format(item.duration)}>
      <Time seconds={item.duration} />
    </div>
  </div>
);

export const PlaylistHeader = () => (
  <div className="PlaylistItem">
    <div className="PlaylistItem_Mark">
    </div>
    <div className="PlaylistItem_Name">
      Song
    </div>
    <div className="PlaylistItem_Artist">
      Artist
    </div>
    <div className="PlaylistItem_Album">
      Album
    </div>
    <div className="PlaylistItem_Duration">
      Time
    </div>
  </div>
);

export default observer(PlaylistItem);
