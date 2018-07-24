import React from 'react';
import { observer } from 'mobx-react';

import SongItem from './song-item.jsx';

const SongColumn = ({ songs, onClickPlaySong, onClickAddSongToPlaylist }) => (
  <div className="Finder_Column">
    <div className="Finder_Head">
      <p>Songs</p>
    </div>
    <div className="Finder_Body">
      <ul>
        {songs.map((song, idx) => (
          <li key={song.name + idx}>
            <SongItem
              item={song}
              onClickPlay={onClickPlaySong}
              onClickAddToPlaylist={onClickAddSongToPlaylist}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default observer(SongColumn);
