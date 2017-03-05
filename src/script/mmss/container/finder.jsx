// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import ArtistItem from '../component/finder/artist-item.jsx';
import AlbumItem from '../component/finder/album-item.jsx';
import SongItem from '../component/finder/song-item.jsx';

import type MmssEvent from '../event';
import type FinderObject from '../store/object/finder';


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
        <div className="Finder_Index">
          <div className="Finder_Column">
            <div>
              <div className="Finder_Head">
                <p># Artists</p>
                <a href="#" onClick={(ev) => { ev.preventDefault(); onClickSortArtist(); }}>[sort]</a>
              </div>
            </div>
            <div className="Scroller">
              <ul>
                { artists.map(artist => (
                <li className="Finder_Row" key={artist.name}>
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
            <div>
              <div className="Finder_Head">
                <p># Albums</p>
              </div>
            </div>
            <div className="Scroller">
              <ul>
                { albums.length === 0 &&
                  <li className="Finder_Row">Artist not selected</li>
                }
                { albums.map(album => (
                <li className="Finder_Row" key={album.name}>
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
        </div>

        <div className="Finder_Detail">
          <div className="Finder_Column">
            <div>
              <div className="Finder_Head">
                <p># Songs</p>
              </div>
            </div>
            <div className="Scroller">
              <ul>
                { songs.length === 0 &&
                  <li className="Finder_Row">Album not selected</li>
                }
                { songs.map(song => (
                <li className="Finder_Row" key={song.name}>
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
      </div>
    );
  }
}

export default inject('event')(observer(Finder));
