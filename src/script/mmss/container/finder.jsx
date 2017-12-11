import React from 'react';
import { inject, observer } from 'mobx-react';

import ArtistColumn from '../component/finder/artist-column.jsx';
import AlbumColumn from '../component/finder/album-column.jsx';
import SongColumn from '../component/finder/song-column.jsx';

class Finder extends React.Component {
  render() {
    const { finder, ui, event } = this.props;
    const {
      onClickSortArtist,
      onClickArtist,
      onClickAlbum,
      onClickPlayArtist,
      onClickPlayAlbum,
      onClickPlaySong,
    } = event;

    return (
      <div className="Finder">
        <div className="Finder_Index">
          <ArtistColumn
            ui={ui}
            artists={finder.artists}
            onClickSortArtist={onClickSortArtist}
            onClickArtist={onClickArtist}
            onClickPlayArtist={onClickPlayArtist}
          />
          <AlbumColumn
            ui={ui}
            albums={finder.albums}
            onClickAlbum={onClickAlbum}
            onClickPlayAlbum={onClickPlayAlbum}
          />
        </div>

        <div className="Finder_Detail">
          <SongColumn songs={finder.songs} onClickPlaySong={onClickPlaySong} />
        </div>
      </div>
    );
  }
}

export default inject('event')(observer(Finder));
