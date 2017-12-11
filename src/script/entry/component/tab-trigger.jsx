import React from 'react';
import { observer } from 'mobx-react';

const TabTrigger = ({ tabNames, visibleTab, onClick }) => (
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
