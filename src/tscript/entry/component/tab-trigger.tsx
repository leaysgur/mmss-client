import * as React from 'react';
import { observer } from 'mobx-react';

import { TabName } from '../store/object/ui';

interface TabTriggerProps {
  tabNames: TabName[],
  visibleTab: TabName,
  onClick: (tab: TabName) => void,
}

const TabTrigger: React.SFC<TabTriggerProps> = ({ tabNames, visibleTab, onClick }) => (
  <div className="TabTrigger">
    {tabNames.map(name => (
      <a
        key={name}
        {...(visibleTab === name
          ? {
              className: 'TabTrigger_Item isSelected',
            }
          : {
              className: 'TabTrigger_Item',
              href: '#',
              onClick: ev => {
                ev.preventDefault();
                onClick(name);
              },
            })}
      >
        {name}
      </a>
    ))}
  </div>
);

export default observer(TabTrigger);
