import React from 'react';
import { observer } from 'mobx-react';

import ArtistItem from './artist-item.jsx';

const ArtistColumn = ({
  ui,
  artists,
  onClickSortArtist,
  onClickArtist,
  onClickPlayArtist,
}) => (
  <div className="Finder_Column">
    <div className="Finder_Head">
      <p>Artists</p>
      <a
        href="#"
        onClick={ev => {
          ev.preventDefault();
          onClickSortArtist();
        }}
      >
        [sort by {ui.sortBy}]
      </a>
    </div>
    <div className="Finder_Body">
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
    </div>
  </div>
);

export default observer(ArtistColumn);
