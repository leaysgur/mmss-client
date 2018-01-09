import * as React from 'react';
import { observer } from 'mobx-react';

import { TabName } from '../store/object/ui';

interface TabContentProps {
  tabContents: { [key: string]: React.ReactElement<any> },
  visibleTab: TabName,
}

const TabContent: React.SFC<TabContentProps> = ({ tabContents, visibleTab }) => (
  <div className="TabContent">{tabContents[visibleTab]}</div>
);

export default observer(TabContent);
