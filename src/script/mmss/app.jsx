import React from 'react';
import { inject, observer } from 'mobx-react';

import Header from './container/header.jsx';
import Finder from './container/finder.jsx';
import Playlist from './container/playlist.jsx';
import Player from './container/player.jsx';

class MmssApp extends React.Component {
  render() {
    const { playlist, finder, ui, media } = this.props.store;

    return (
      <div className="MmssApp">
        <Header />
        <Finder
          {...{
            finder,
            ui,
          }}
        />
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
    );
  }
}

export default inject('event')(observer(MmssApp));
