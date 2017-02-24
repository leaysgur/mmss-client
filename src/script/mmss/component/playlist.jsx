// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type PlaylistObject from '../object/playlist';


const Playlist = ({
  playlist,
}: {
  playlist: PlaylistObject;
}) => (
  <div className="Playlist">
    <div className="Playlist_Inner">
      <ul>
        { playlist.items.map((song, idx) => (
        <li key={`${song.path}`}>
        {idx + 1} {song.name}
        </li>
        )) }
      </ul>
      <audio
        className="Audio"
        autoPlay
        controls
      ></audio>
    </div>
  </div>
);

export default observer(Playlist);
