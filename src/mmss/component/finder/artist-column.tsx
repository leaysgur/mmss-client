import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import ArtistItem from './artist-item';

import MmssStore from '../../store';
import { Artist } from '../../../shared/typings/mmss';

interface Props {
  ui: MmssStore['ui'];
  artists: Artist[];
  onClickSortArtist(): void;
  onClickArtist(item: Artist): void;
  onClickPlayArtist(item: Artist): void;
}

const ArtistColumn = ({
  ui,
  artists,
  onClickSortArtist,
  onClickArtist,
  onClickPlayArtist,
}: Props) => (
  <Wrap>
    <Head>
      <p>Artists</p>
      <Controller onClick={() => onClickSortArtist()}>
        {ui.sortBy}
        <img src="/image/i-sort.svg" />
      </Controller>
    </Head>

    <Body>
      <ul>
        {artists
          // 絞込されてるならそれ、されてないなら全部
          .filter(artist => (ui.pinnedArtist !== null ? artist.name === ui.pinnedArtist : true))
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

const Controller = styled.div`
  display: flex;
  align-items: center;
  font-size: .6rem;
  cursor: pointer;

  & img {
    height: 12px;
    vertical-align: text-top;
    margin: 0 5px;
  }
`;

const Body = styled.div`
  overflow: scroll;
`;

export default observer(ArtistColumn);
