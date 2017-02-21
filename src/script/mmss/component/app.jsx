// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import FinderItem from './finder-item.jsx';

import type { MmssStoreType } from '../store';
import type { MmssEventType } from '../event';


class MmssApp extends React.Component {
  props: {
    event: MmssEventType;
    store: MmssStoreType;
  };

  render() {
    const {
      artists,
      albums,
      songs,
    } = this.props.store;
    const {
      onClickArtist,
      onClickAlbum,
      onClickPlaySong,
    } = this.props.event;

    return (
      <div>
        <Header />
        <div className="Finder">
          <div className="Finder_Column">
            <p># Artists</p>
            <ul>
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

          <div className="Finder_Column">
            <p># Albums</p>
            <ul>
              { albums.length === 0 && <li>Artist not selected</li> }
              { albums.map(name => (
              <li key={name}>
                <FinderItem
                  item={{ name }}
                  onClick={onClickAlbum}
                  onClickPlay={(s) => { console.log(s); }}
                />
              </li>
              )) }
            </ul>
          </div>

          <div className="Finder_Column">
            <p># Songs</p>
            <ul>
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
    );
  }
}

export default observer(MmssApp);
