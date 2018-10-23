import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import SongItem from './song-item.jsx';

const SongColumn = ({ songs, onClickPlaySong, onClickAddSongToPlaylist }) => (
  <Wrap>
    <Head>
      <p>Songs</p>
    </Head>
    <Body>
      <ul>
        {songs.map((song, idx) => (
          <li key={song.name + idx}>
            <SongItem
              item={song}
              onClickPlay={onClickPlaySong}
              onClickAddToPlaylist={onClickAddSongToPlaylist}
            />
          </li>
        ))}
      </ul>
    </Body>
  </Wrap>
);

const Wrap = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  height: inherit;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 30px;
  background-color: #9cc2c3;
  color: #fff;
  text-transform: uppercase;
  font-size: .8rem;
`;

const Body = styled.div`
  overflow: scroll;
`;

export default observer(SongColumn);
