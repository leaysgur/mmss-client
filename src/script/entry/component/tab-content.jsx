// @flow
import React from 'react';
import { observer } from 'mobx-react';


const TabContent = ({
  tabContents,
  visibleTab,
}: {
  tabContents: { [string]: React$Element<any>; };
  visibleTab: string;
}) => (
  <div className="TabContent">{tabContents[visibleTab]}</div>
);

export default observer(TabContent);
