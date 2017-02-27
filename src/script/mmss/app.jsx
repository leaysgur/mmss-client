// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import Header from '../shared/component/header.jsx';
import Finder from './container/finder.jsx';
import Playlist from './container/playlist.jsx';
import Player from './container/player.jsx';

import type MmssStore from './store';
import type MmssEvent from './event';


class MmssApp extends React.Component {
  props: {
    store: MmssStore;
    event: MmssEvent;
  };

  render() {
    const {
      playlist,
      finder,
      ui,
      media,
    } = this.props.store;

    return (
      <div className="MmssApp">
        <Header onClick={this.props.event.onClickLogout} />

        <Finder
          {...{
            finder,
          }}
        />

        <div className="Footer">
          <Playlist
            {...{
              playlist,
              ui,
            }}
          />
          <Player
            {...{
              playlist,
              media,
              ui,
            }}
          />
        </div>
      </div>
    );
  }
}

export default inject('event')(observer(MmssApp));
