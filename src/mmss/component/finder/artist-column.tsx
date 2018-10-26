import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import ArtistItem from './artist-item';

const ArtistColumn = ({
  ui,
  artists,
  onClickSortArtist,
  onClickArtist,
  onClickPlayArtist,
}) => (
  <Wrap>
    <Head>
      <p>Artists</p>
      <Sorter onClick={() => onClickSortArtist()}>
        {ui.sortBy}
        <img src="/image/i-sort.png" />
      </Sorter>
    </Head>

    <Body>
      <ul>
        {artists
          // 絞込されてるならそれ、されてないなら全部
          .filter(artist => (ui.filterBy ? artist.name === ui.filterBy : true))
          .map(artist => (
            <li key={artist.name}>
              <ArtistItem
                item={artist}
                isSelected={artist.name === ui.selected.artist}
                onClick={onClickArtist}
                onClickPlay={onClickPlayArtist}
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

const Sorter = styled.a`
  font-size: .6rem;
  color: inherit;

  & img {
    height: 10px;
    vertical-align: text-top;
    margin-left: 5px;
  }
`;

const Body = styled.div`
  overflow: scroll;
`;

export default observer(ArtistColumn);
