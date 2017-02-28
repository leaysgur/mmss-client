// @flow
// import React from 'react';
import { observer } from 'mobx-react';


const TabContent = ({
  tabContents,
  visibleTab,
}: {
  tabContents: { [string]: React$Element<any>; };
  visibleTab: string;
}) => {
  return tabContents[visibleTab];
};

export default observer(TabContent);
