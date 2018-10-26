import React, { ReactType } from 'react';
import { inject, observer } from 'mobx-react';

import Top from '../component/shared/top';
import { TabTrigger, TabContent } from '../component/shared/tab';
import Login from './login';
import Search from './search';

import EntryStore from '../store';
import EntryEvent from '../event';

interface Props {
  event?: EntryEvent;
  store?: EntryStore;
}

const tabContents: {
  [key: string]: ReactType;
} = {
  login: Login,
  search: Search,
};

const EntryApp = (props: Props) => {
  const { onClickTab } = props.event!;
  const { constants, ui } = props.store!;

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

export default inject('event', 'store')(observer(EntryApp));
