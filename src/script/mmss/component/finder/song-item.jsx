// @flow
import React from 'react';
import { observer } from 'mobx-react';

// TODO: shared
import Time from '../playlist/time.jsx';

const SongItem = ({
  item,
  onClickPlay,
}: {
  item: Song;
  onClickPlay: (item: Song) => void;
}) => (
  <div className="SongItem">
    <a className="SongItem_Action" href="#" onClick={(ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      onClickPlay(item);
    }}>[play]</a>
    <div className="SongItem_Body">
      <div>
         {item.name}
      </div>
      <div className="SongItem_Body_Artist">
         {item.artist}
      </div>
      <div className="SongItem_Body_Sub">
        Disc {item.disc || '-'} / Track {item.track || '-'} / <Time seconds={item.duration} />
      </div>
    </div>
  </div>
);

export default observer(SongItem);
