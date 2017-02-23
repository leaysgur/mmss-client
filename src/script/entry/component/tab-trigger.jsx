// @flow
import React from 'react';
import { observer } from 'mobx-react';


const TabTrigger = ({
  tabNames,
  visibleTab,
  onClick,
}: {
  tabNames: string[];
  visibleTab: string;
  onClick: (name: string) => void;
}) => (
  <div>
    { tabNames.map(name => (
      visibleTab !== name
        ? <a key={name} href="#" onClick={(ev) => { ev.preventDefault(); onClick(name); }}>{name}</a>
        : <span key={name}>{name}</span>
    )) }
  </div>
);

export default observer(TabTrigger);
