import React from 'react';
import { inject, observer } from 'mobx-react';

import ArtistColumn from '../component/finder/artist-column.jsx';
import AlbumColumn from '../component/finder/album-column.jsx';
import SongColumn from '../component/finder/song-column.jsx';

const Finder = ({ finder, ui, event }) => {
  const {
    onClickSortArtist,
    onClickArtist,
    onClickAlbum,
    onClickPlayArtist,
    onClickPlayAlbum,
    onClickPlaySong,
    onClickAddSongToPlaylist,
  } = event;

  return (
    <div className="Finder">
      <ArtistColumn
        ui={ui}
        artists={finder.artists}
        onClickSortArtist={onClickSortArtist}
        onClickArtist={onClickArtist}
        onClickPlayArtist={onClickPlayArtist}
      />
      <AlbumColumn
        ui={ui}
        albums={finder.albums}
        onClickAlbum={onClickAlbum}
        onClickPlayAlbum={onClickPlayAlbum}
      />
      <SongColumn
        songs={finder.songs}
        onClickPlaySong={onClickPlaySong}
        onClickAddSongToPlaylist={onClickAddSongToPlaylist}
      />
    </div>
  );
};

export default inject('event')(observer(Finder));
