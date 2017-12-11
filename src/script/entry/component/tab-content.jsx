import React from 'react';
import { observer } from 'mobx-react';

const TabContent = ({ tabContents, visibleTab }) => (
  <div className="TabContent">{tabContents[visibleTab]}</div>
);

export default observer(TabContent);
