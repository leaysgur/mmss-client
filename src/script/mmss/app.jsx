import React from 'react';
import { inject, observer } from 'mobx-react';

import Finder from './container/finder.jsx';
import Playlist from './container/playlist.jsx';
import Player from './container/player.jsx';

const MmssApp = ({ store }) => {
  const { playlist, finder, ui, media } = store;

  return (
    <div className="MmssApp">
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
};

export default inject('event')(observer(MmssApp));
