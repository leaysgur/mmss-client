// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import FinderItem from './finder-item.jsx';
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
      artists,
      albums,
      songs,
      nowPlayingSrc,
    } = this.props.store;
    const {
      onClickSortArtist,
      onClickArtist,
      onClickAlbum,
      onClickPlaySong,
    } = this.props.event;

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
                { artists.map(name => (
                <li key={name}>
                  <FinderItem
                    item={{ name }}
                    onClick={onClickArtist}
                    onClickPlay={(s) => { console.log(s); }}
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
                  <FinderItem
                    item={album}
                    onClick={onClickAlbum}
                    onClickPlay={(s) => { console.log(s); }}
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
                  <FinderItem
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
          src={nowPlayingSrc}
        />
      </div>
    );
  }
}

export default observer(MmssApp);
