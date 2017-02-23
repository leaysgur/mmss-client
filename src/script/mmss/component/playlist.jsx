// @flow
import React from 'react';
import { observer } from 'mobx-react';


const Playlist = ({
  src
}: {
  src: string;
}) => (
  <div className="Playlist">
    <div className="Playlist_Inner">
      <audio
        className="Audio"
        src={src}
        autoPlay
        controls
      ></audio>
    </div>
  </div>
);

export default observer(Playlist);
