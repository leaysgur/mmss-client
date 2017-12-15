import React from 'react';
import { observer } from 'mobx-react';

import Time, { format } from '../shared/time.jsx';

export const PlaylistItem = observer(({ no, item, isPlaying, onClick }) => (
  <div className="PlaylistItem">
    <div className="PlaylistItem_No">{no}</div>
    <div className="PlaylistItem_Mark">
      {isPlaying ? (
        <img src="/image/i-playing.png" />
      ) : null }
    </div>
    <div className="PlaylistItem_Name" title={item.name}>
      {isPlaying ? (
        <span>{item.name || '-'}</span>
      ) : (
        <a
          href="#"
          onClick={ev => {
            ev.preventDefault();
            onClick(item);
          }}
        >
          {item.name || '-'}
        </a>
      )}
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
));

export const PlaylistHeader = () => (
  <div className="PlaylistItem">
    <div className="PlaylistItem_No" />
    <div className="PlaylistItem_Mark" />
    <div className="PlaylistItem_Name">Song</div>
    <div className="PlaylistItem_Artist">Artist</div>
    <div className="PlaylistItem_Album">Album</div>
    <div className="PlaylistItem_Duration">Time</div>
  </div>
);
