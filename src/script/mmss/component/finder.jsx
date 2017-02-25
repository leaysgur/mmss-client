// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import ArtistItem from './finder/artist-item.jsx';
import AlbumItem from './finder/album-item.jsx';
import SongItem from './finder/song-item.jsx';

import type MmssEvent from '../event';


class Finder extends React.Component {
  props: {
    finder: FinderObject;
    event: MmssEvent;
  };

  render() {
    const {
      finder,
      event,
    } = this.props;
    const {
      artists,
      albums,
      songs,
    } = finder;
    const {
      onClickSortArtist,
      onClickArtist, onClickAlbum,
      onClickPlayArtist, onClickPlayAlbum, onClickPlaySong,
    } = event;

    return (
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
    );
  }
}

export default inject('event')(observer(Finder));
