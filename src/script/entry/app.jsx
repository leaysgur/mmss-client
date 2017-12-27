import React from 'react';
import { inject, observer } from 'mobx-react';

import LoginForm from './component/login-form.jsx';
import SearchForm from './component/search-form.jsx';
import TabTrigger from './component/tab-trigger.jsx';
import TabContent from './component/tab-content.jsx';

const EntryApp = ({ store, event }) => {
  const { search, ui, tabNames } = store;
  const { onClickTab, onLoginSubmit, onChangeKeyword } = event;

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
