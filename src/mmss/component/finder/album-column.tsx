import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import AlbumItem from './album-item';

import { Album } from '../../../shared/typings/mmss';

interface Props {
  selectedAlbum: string | null;
  albums: Album[];
  onClickAlbum(item: Album): void;
  onClickPlayAlbum(item: Album): void;
}

const AlbumColumn = ({ selectedAlbum, albums, onClickAlbum, onClickPlayAlbum }: Props) => (
  <Wrap>
    <Head>
      <p>Albums</p>
    </Head>
    <Body>
      <ul>
        {albums.map(album => (
          <li key={album.name}>
            <AlbumItem
              item={album}
              isSelected={album.name === selectedAlbum}
              onClick={onClickAlbum}
              onClickPlay={onClickPlayAlbum}
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

export default observer(AlbumColumn);
