import React from 'react';
import { inject, observer } from 'mobx-react';

import Top from '../component/shared/top';
import { TabTrigger, TabContent } from '../component/shared/tab';
import Login from './login';
import Search from './search';

const tabContents = {
  login: Login,
  search: Search,
};

const EntryApp = ({ ui, constants, event }) => {
  const { onClickTab } = event;

  return (
    <>
      <Top />
      <TabTrigger
        tabTriggers={constants.tabNames}
        visibleTab={ui.visibleTab}
        onClick={onClickTab}
      />
      <TabContent
        tabContents={tabContents}
        visibleTab={ui.visibleTab}
      />
    </>
  );
};

export default inject('event', 'ui', 'constants')(observer(EntryApp));
