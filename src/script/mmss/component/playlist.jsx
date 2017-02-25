// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type PlaylistObject from '../object/playlist';
import type UiObject from '../object/ui';


class Playlist extends React.Component {
  props: {
    playlist: PlaylistObject;
    ui: UiObject;
  };

  render() {
    const { items } = this.props.playlist;
    const { isPlaylistShown } = this.props.ui;

    if (items.length === 0 || isPlaylistShown === false) { return null; }

    return (
    <div className="Playlist">
      <div className="Playlist_Inner">
        <ul>
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
