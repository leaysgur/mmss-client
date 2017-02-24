// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type { Song } from '../store';


const SongItem = ({
  item,
  onClickPlay,
}: {
  item: Song;
  onClickPlay: (item: Song) => void;
}) => (
  <div>
    <div>
    [{item.disc || 1}-{item.track}] {item.artist} - {item.name}
    </div>
    <a href="#" onClick={(ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      onClickPlay(item);
    }}>[play]</a>
  </div>
);

export default observer(SongItem);
