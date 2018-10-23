import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import ArtistColumn from '../component/finder/artist-column';
import AlbumColumn from '../component/finder/album-column';
import SongColumn from '../component/finder/song-column';

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
    <Wrap>
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
    </Wrap>
  );
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 50%;
  height: var(--finderHeight);
`;

export default inject('event','finder', 'ui')(observer(Finder));
