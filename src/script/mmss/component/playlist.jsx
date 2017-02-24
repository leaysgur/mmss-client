// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type Playlist from '../object/playlist';


// TODO: 名前
const _Playlist = ({
  playlist,
}: {
  playlist: Playlist;
}) => (
  <div className="Playlist">
    <div className="Playlist_Inner">
      <ul>
        { playlist.items.map(song => (
        <li key={`${song.path}`}>{song.name}</li>
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

export default observer(_Playlist);
