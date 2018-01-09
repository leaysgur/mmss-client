import * as React from 'react';
import { inject, observer } from 'mobx-react';

import LoginForm from './component/login-form';
import SearchForm from './component/search-form';
import TabTrigger from './component/tab-trigger';
import TabContent from './component/tab-content';

import EntryStore from './store';
import EntryEvent from './event';

interface EntryAppProps {
  store: EntryStore,
  event?: EntryEvent,
}

const EntryApp: React.SFC<EntryAppProps> = ({ store, event }) => {
  const { search, ui, tabNames } = store;
  const { onClickTab, onLoginSubmit, onChangeKeyword } = event!;

  return (
    <div className="EntryApp">
      <div className="Top">
        <span>MMSS</span>
      </div>

      <TabTrigger
        tabNames={tabNames}
        visibleTab={ui.visibleTab}
        onClick={onClickTab}
      />
      <TabContent
        tabContents={{
          login: (
            <LoginForm onSubmit={onLoginSubmit} hasError={ui.hasLoginError} />
          ),
          search: (
            <SearchForm
              keyword={search.keyword}
              results={search.results}
              onChange={onChangeKeyword}
            />
          ),
        }}
        visibleTab={ui.visibleTab}
      />
    </div>
  );
};

export default inject('event')(observer(EntryApp));
