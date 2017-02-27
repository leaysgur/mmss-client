// @flow
import React from 'react';
import { observer } from 'mobx-react';


const PlaylistItem = ({
  item,
  no,
  isPlaying,
  onClick,
}: {
  item: Song;
  no: number;
  isPlaying: boolean;
  onClick: (item: Song) => void;
}) => (
  <div>
  {isPlaying ? '✓' : '　'}
  &nbsp;
  {no}
  &nbsp;
  <a href="#" onClick={ev => { ev.preventDefault(); onClick(item); }}>
    {item.name} | {item.artist} | {item.album}
  </a>
  </div>
);

export default observer(PlaylistItem);
