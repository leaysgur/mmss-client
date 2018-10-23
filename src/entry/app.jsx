import React from 'react';
import { inject, observer } from 'mobx-react';

import Top from './component/top';
import LoginForm from './component/login-form';
import SearchForm from './component/search-form';
import TabTrigger from './component/tab-trigger';

const EntryApp = ({ store, event }) => {
  const { search, ui, tabNames } = store;
  const { onClickTab, onLoginSubmit, onChangeKeyword } = event;

  const TabContent = {
    login: (
      <LoginForm
        onSubmit={onLoginSubmit}
        hasError={ui.hasLoginError}
      />
    ),
    search: (
      <SearchForm
        keyword={search.keyword}
        results={search.results}
        onChange={onChangeKeyword}
      />
    ),
  }[ui.visibleTab];

  return (
    <>
      <Top />

      <TabTrigger
        tabNames={tabNames}
        visibleTab={ui.visibleTab}
        onClick={onClickTab}
      />
      {TabContent}
    </>
  );
};

export default inject('event')(observer(EntryApp));
