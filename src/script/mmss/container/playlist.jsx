// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import PlaylistItem from '../component/playlist/item.jsx';

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
      <div className="Playlist_Inner">
        <ul>
          { items.map((song, idx) => (
          <li
            key={`${song.path}`}
          >
            <PlaylistItem
              item={song}
              no={idx + 1}
              isPlaying={nowPlayingIdx === idx}
              onClick={onClickPlaylistItem}
            />
          </li>
          )) }
        </ul>
      </div>
    </div>
    );
  }
}

export default inject('event')(observer(Playlist));
