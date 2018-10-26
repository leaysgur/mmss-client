import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import ArtistColumn from '../component/finder/artist-column';
import AlbumColumn from '../component/finder/album-column';
import SongColumn from '../component/finder/song-column';

import MmssEvent from '../event';
import MmssStore from '../store';

interface Props {
  event?: MmssEvent;
  store?: MmssStore;
}

const Finder = ({ store, event }: Props) => {
  const {
    onClickSortArtist,
    onClickArtist,
    onClickAlbum,
  } = event!;
  const {
    onClickPlayArtist,
    onClickPlayAlbum,
    onClickPlaySong,
    onClickAddSongToPlaylist,
  } = event!.playlistEvent;
  const { ui, finder } = store!;

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
        selectedAlbum={ui.selected.album}
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

export default inject('event', 'store')(observer(Finder));
