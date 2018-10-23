import React from 'react';
import styled from 'styled-components';

import Finder from './finder';
import Playlist from './playlist';
import Player from './player';

const MmssApp = () => (
  <Wrap>
    <Finder />
    <Playlist />
    <Player />
  </Wrap>
);

const Wrap = styled.div`
  position: relative;
  height: var(--mmssHeight);
  overflow: hidden;

  --mmssHeight: 100vh;
  --finderHeight: calc(var(--mmssHeight) - var(--footerHeight));
  --footerHeight: 10vh;
`;

// Appなのでcontainerにしたけど、inject()するものがない
export default MmssApp;
