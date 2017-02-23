// @flow
import React from 'react';
import { observer } from 'mobx-react';


const FinderItem = ({
  item,
  onClick,
  onClickPlay,
}: {
  item: Object;
  onClick: ?(item: Object) => void;
  onClickPlay: (item: Object) => void;
}) => (
  <div onClick={() => {
    onClick && onClick(item);
  }}>
    {JSON.stringify(item, null, 2)}
    <a href="#" onClick={(ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      onClickPlay(item);
    }}>[再生]</a>
  </div>
);

export default observer(FinderItem);
