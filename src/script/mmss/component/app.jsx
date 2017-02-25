// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import Finder from './finder.jsx';
import Playlist from './playlist.jsx';
import Player from './player.jsx';

import type MmssStore from '../store';


class MmssApp extends React.Component {
  props: {
    store: MmssStore;
  };

  render() {
    const {
      playlist,
      finder,
      ui,
    } = this.props.store;

    return (
      <div className="MmssApp">
        <Header />

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
          <Player />
        </div>
      </div>
    );
  }
}

export default observer(MmssApp);
