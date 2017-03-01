// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import PlaylistItem, { PlaylistHeader } from '../component/playlist/item.jsx';

import type MmssEvent from '../event';
import type PlaylistObject from '../store/object/playlist';
import type UiObject from '../store/object/ui';


class Playlist extends React.Component {
  props: {
    event: MmssEvent;
    playlist: PlaylistObject;
    ui: UiObject;
  };

  render() {
    const {
      items,
      nowPlayingIdx,
    } = this.props.playlist;
    const { isPlaylistShown } = this.props.ui;
    const { onClickPlaylistItem } = this.props.event;

    if (items.length === 0 || isPlaylistShown === false) { return null; }

    return (
    <div className="Playlist">
      <div className="Playlist_Header">
        <PlaylistHeader />
      </div>
      <ul className="Playlist_Inner">
        { items.map((song, idx) => (
        <li
          key={`${song.path}`}
          className="Playlist_Row"
        >
          <PlaylistItem
            item={song}
            isPlaying={nowPlayingIdx === idx}
            onClick={onClickPlaylistItem}
          />
        </li>
        )) }
      </ul>
    </div>
    );
  }
}

export default inject('event')(observer(Playlist));
