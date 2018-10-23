import React from 'react';
import { inject, Observer } from 'mobx-react';

import Top from '../component/top';
import { TabTrigger, TabContent } from '../component/tab';
import LoginForm from './login-form';
import SearchForm from './search-form';

const tabContents = {
  login: LoginForm,
  search: SearchForm,
};

const EntryApp = ({ ui, constants, event }) => {
  const { onClickTab } = event;

  return (
    <>
      <Top />
      <Observer render={() =>
        <>
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
      } />
    </>
  );
};

export default inject('event', 'ui', 'constants')(EntryApp);
