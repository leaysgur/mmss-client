// @flow
import React from 'react';
import { observer } from 'mobx-react';


const FinderItem = ({
  item,
  onClick,
}: {
  item: Object;
  onClick: (item: Object) => void;
}) => (
  <a href="#" onClick={(ev) => {
    ev.preventDefault();
    onClick(item);
  }}>{item.name}</a>
);

export default observer(FinderItem);
