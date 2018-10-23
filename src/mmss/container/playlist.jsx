import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import { PlaylistItem, PlaylistHeader } from '../component/playlist/item';

const Playlist = ({ playlist, ui, event }) => {
  const { items, nowPlayingIdx } = playlist;
  const { isPlaylistShown } = ui;
  const {
    onClickPlaylistItem,
    onMouseEnterPlaylist,
    onMouseLeavePlaylist,
  } = event;

  return (
    <Wrap
      className={isPlaylistShown ? 'isShown' : ''}
      onMouseEnter={onMouseEnterPlaylist}
      onMouseLeave={onMouseLeavePlaylist}
    >
      <Header>
        <PlaylistHeader />
      </Header>
      {items.length === 0 && <NoItem>No item</NoItem>}
      <Inner>
        {items.map((song, idx) => (
          <Row key={`${song.path}`}>
            <PlaylistItem
              no={idx + 1}
              item={song}
              isPlaying={nowPlayingIdx === idx}
              onClick={onClickPlaylistItem}
            />
          </Row>
        ))}
      </Inner>
    </Wrap>
  );
};

const Wrap = styled.div`
  --_playlistHeight: 33vh;
  --_playlistRowHeight: 20px;

  position: fixed;
  bottom: var(--footerHeight);
  left: 0;
  right: 0;
  height: var(--_playlistHeight);
  background-color: #fafafa;
  font-size: .8rem;
  transform: translateY(100vh);
  transition: transform .25s ease;

  &.isShown {
    transform: translateY(0);
  }
`;

const Header = styled.div`
  position: relative;
  height: var(--_playlistRowHeight);
  background-color: #9cc2c3;
  color: #fff;
  text-transform: uppercase;
`;

const Inner = styled.ul`
  height: calc(var(--_playlistHeight) - var(--_playlistRowHeight));
  overflow: scroll;
`;

const Row = styled.li`
  height: var(--_playlistRowHeight);
  background-color: #fff;

  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const NoItem = styled.div`
  text-align: center;
  padding-top: 10vh;
`;

export default inject('event', 'playlist', 'ui')(observer(Playlist));
