import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Finder from './container/finder.jsx';
import Playlist from './container/playlist.jsx';
import Player from './container/player.jsx';

const MmssApp = ({ store }) => {
  const { playlist, finder, ui, media } = store;

  return (
    <Wrap>
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
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  height: var(--mmssHeight);
  overflow: hidden;

  --mmssHeight: 100vh;
  --finderHeight: calc(var(--mmssHeight) - var(--footerHeight));
  --footerHeight: 10vh;
`;

export default inject('event')(observer(MmssApp));
