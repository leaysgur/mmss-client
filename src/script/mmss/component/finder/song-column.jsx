import React from 'react';
import { observer } from 'mobx-react';

import SongItem from './song-item.jsx';

const SongColumn = ({ songs, onClickPlaySong }) => (
  <div className="Finder_Column">
    <div>
      <div className="Finder_Head">
        <p># Songs</p>
      </div>
    </div>
    <div className="Scroller">
      <ul>
        {songs.length === 0 && (
          <li className="Finder_Row">Album not selected</li>
        )}
        {songs.map((song, idx) => (
          <li className="Finder_Row" key={song.name + idx}>
            <SongItem item={song} onClickPlay={onClickPlaySong} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default observer(SongColumn);
