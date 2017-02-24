// @flow
import React from 'react';
import { observer } from 'mobx-react';

import ArtistItem from './finder/artist-item.jsx';
import AlbumItem from './finder/album-item.jsx';
import SongItem from './finder/song-item.jsx';

import type FinderObject, {
  Artist, Album, Song,
} from '../object/finder';


const Finder = ({
  finder,
  onClickSortArtist,
  onClickArtist,
  onClickAlbum,
  onClickPlayArtist,
  onClickPlayAlbum,
  onClickPlaySong,
}: {
  finder: FinderObject;
  onClickSortArtist: () => void;
  onClickArtist: (artist: Artist) => void;
  onClickAlbum: (album: Album) => void;
  onClickPlayArtist: (artist: Artist) => void;
  onClickPlayAlbum: (album: Album) => void;
  onClickPlaySong: (song: Song) => void;
}) => {
  const {
    artists,
    albums,
    songs,
  } = finder;

  return (
  <div className="Finder">
    <div className="Finder_Column">
      <p>
        # Artists
        <button type="button" onClick={onClickSortArtist}>sort</button>
      </p>
      <div className="Scroller">
        <ul className="Scroller_Inner">
          { artists.map(artist => (
          <li key={artist.name}>
            <ArtistItem
              item={artist}
              onClick={onClickArtist}
              onClickPlay={onClickPlayArtist}
            />
          </li>
          )) }
        </ul>
      </div>
    </div>

    <div className="Finder_Column">
      <p># Albums</p>
      <div className="Scroller">
        <ul className="Scroller_Inner">
          { albums.length === 0 && <li>Artist not selected</li> }
          { albums.map(album => (
          <li key={album.name}>
            <AlbumItem
              item={album}
              onClick={onClickAlbum}
              onClickPlay={onClickPlayAlbum}
            />
          </li>
          )) }
        </ul>
      </div>
    </div>

    <div className="Finder_Column">
      <p># Songs</p>
      <div className="Scroller">
        <ul className="Scroller_Inner">
          { songs.length === 0 && <li>Album not selected</li> }
          { songs.map(song => (
          <li key={song.name}>
            <SongItem
              item={song}
              onClickPlay={onClickPlaySong}
            />
          </li>
          )) }
        </ul>
      </div>
    </div>
  </div>
  );
};

export default observer(Finder);
