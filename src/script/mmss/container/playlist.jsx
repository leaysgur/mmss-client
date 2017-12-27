import React from 'react';
import { inject, observer } from 'mobx-react';

import { PlaylistItem, PlaylistHeader } from '../component/playlist/item.jsx';

const Playlist = ({ playlist, ui, event }) => {
  const { items, nowPlayingIdx } = playlist;
  const { isPlaylistShown } = ui;
  const {
    onClickPlaylistItem,
    onMouseEnterPlaylist,
    onMouseLeavePlaylist,
  } = event;

  return (
    <div
      className={`Playlist ${isPlaylistShown ? '-shown' : ''}`}
      onMouseEnter={onMouseEnterPlaylist}
      onMouseLeave={onMouseLeavePlaylist}
    >
      <div className="Playlist_Header">
        <PlaylistHeader />
      </div>
      {items.length === 0 && <div className="Playlist_NoItem">No item</div>}
      <ul className="Playlist_Inner">
        {items.map((song, idx) => (
          <li key={`${song.path}`} className="Playlist_Row">
            <PlaylistItem
              no={idx + 1}
              item={song}
              isPlaying={nowPlayingIdx === idx}
              onClick={onClickPlaylistItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default inject('event')(observer(Playlist));
