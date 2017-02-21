// @flow
import React from 'react';
import { observer } from 'mobx-react';

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
    } = this.props.event;

    return (
      <div style={{display:'flex'}}>
        <ul>
          { artists.map(name => (
          <li key={name}>
            <a href="#" onClick={(ev) => {
              ev.preventDefault();
              onClickArtist(name);
            }}>{name}</a>
          </li>
          )) }
        </ul>
        <ul>
          { albums.map(name => (
          <li key={name}>
            <a href="#" onClick={(ev) => {
              ev.preventDefault();
              onClickAlbum(name);
            }}>{name}</a>
          </li>
          )) }
        </ul>
        <ul>
          { songs.map(song => (
          <li key={song.name}>
            <a href="#" onClick={(ev) => {
              ev.preventDefault();
              console.log(song);
            }}>{song.name}</a>
          </li>
          )) }
        </ul>
      </div>
    );
  }
}

export default observer(MmssApp);
