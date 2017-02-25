// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import Finder from './finder.jsx';
import Playlist from './playlist.jsx';
import Player from './player.jsx';

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

    return (
      <div className="MmssApp">
        <Header />

        <Finder
          {...{
            finder,
            onClickSortArtist,
            onClickArtist,
            onClickAlbum,
            onClickPlayArtist,
            onClickPlayAlbum,
            onClickPlaySong,
          }}
        />

        <div className="Footer">
          <Playlist
            {...{
              playlist,
            }}
          />
          <Player />
        </div>
      </div>
    );
  }
}

export default observer(MmssApp);
