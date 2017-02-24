// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import ArtistItem from './artist-item.jsx';
import AlbumItem from './album-item.jsx';
import SongItem from './song-item.jsx';
import Playlist from './playlist.jsx';

import type MmssStore from '../store';
import type MmssEvent from '../event';


class MmssApp extends React.Component {
  props: {
    event: MmssEvent;
    store: MmssStore;
  };

  render() {
    const {
      playlist,
      finder,
    } = this.props.store;
    const {
      onClickSortArtist,
      onClickArtist,
      onClickAlbum,
      onClickPlayArtist,
      onClickPlayAlbum,
      onClickPlaySong,
    } = this.props.event;
    const {
      artists,
      albums,
      songs,
    } = finder;

    return (
      <div className="MmssApp">
        <Header />
        <div className="Finder">
          <div className="Finder_Column">
            <p>
              # Artists
              <button type="button" onClick={onClickSortArtist}>sort</button>
            </p>
            <div className="Scroller">
              <ul className="Scroller_Inner">
                { artists.map(artist => (
                <li key={artist.name}>
                  <ArtistItem
                    item={artist}
                    onClick={onClickArtist}
                    onClickPlay={onClickPlayArtist}
                  />
                </li>
                )) }
              </ul>
            </div>
          </div>

          <div className="Finder_Column">
            <p># Albums</p>
            <div className="Scroller">
              <ul className="Scroller_Inner">
                { albums.length === 0 && <li>Artist not selected</li> }
                { albums.map(album => (
                <li key={album.name}>
                  <AlbumItem
                    item={album}
                    onClick={onClickAlbum}
                    onClickPlay={onClickPlayAlbum}
                  />
                </li>
                )) }
              </ul>
            </div>
          </div>

          <div className="Finder_Column">
            <p># Songs</p>
            <div className="Scroller">
              <ul className="Scroller_Inner">
                { songs.length === 0 && <li>Album not selected</li> }
                { songs.map(song => (
                <li key={song.name}>
                  <SongItem
                    item={song}
                    onClickPlay={onClickPlaySong}
                  />
                </li>
                )) }
              </ul>
            </div>
          </div>
        </div>

        <Playlist
          playlist={playlist}
        />
      </div>
    );
  }
}

export default observer(MmssApp);
