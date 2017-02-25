// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type PlaylistObject from '../object/playlist';


class Playlist extends React.Component {
  props: {
    playlist: PlaylistObject;
  };
  state: {
    isPlaylistShown: boolean;
  };

  constructor() {
    super();

    this.state = { isPlaylistShown: false };
  }

  render() {
    const { items } = this.props.playlist;

    return (
    <div className="Playlist">
      <div className="Playlist_Inner">
        <ul style={{display: this.state.isPlaylistShown ? 'block' : 'none'}}>
          { items.map((song, idx) => (
          <li key={`${song.path}`}>
          {idx + 1} {song.name}
          </li>
          )) }
        </ul>
      </div>
    </div>
    );
  }
}

export default observer(Playlist);
