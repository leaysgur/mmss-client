// @flow
import React from 'react';
import { observer } from 'mobx-react';

import ArtistItem from './artist-item.jsx';

import type UiObject from '../../store/object/ui';


const ArtistColumn = ({
  ui,
  artists,
  onClickSortArtist,
  onClickArtist,
  onClickPlayArtist,
}: {
  ui: UiObject;
  artists: Artist[];
  onClickSortArtist: () => void;
  onClickArtist: (artist: Artist) => void;
  onClickPlayArtist: (artist: Artist) => void;
}) => (
  <div className="Finder_Column">
    <div>
      <div className="Finder_Head">
        <p># Artists</p>
        <a
          href="#"
          onClick={ev => { ev.preventDefault(); onClickSortArtist(); }}
        >[sort by {ui.sortBy}]</a>
      </div>
    </div>
    <div className="Scroller">
      <ul>
        { artists.map(artist => (
        <li className="Finder_Row" key={artist.name}>
          <ArtistItem
            item={artist}
            isSelected={artist.name === ui.selected.artist}
            onClick={onClickArtist}
            onClickPlay={onClickPlayArtist}
          />
        </li>
        )) }
      </ul>
    </div>
  </div>
);

export default observer(ArtistColumn);
