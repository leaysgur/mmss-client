// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import Header from '../shared/component/header.jsx';
import LoginForm from './component/login-form.jsx';
import SearchForm from './component/search-form.jsx';
import TabTrigger from './component/tab-trigger.jsx';
import TabContent from './component/tab-content.jsx';

import type EntryStore from './store';
import type EntryEvent from './event';


class EntryApp extends React.Component {
  props: {
    event: EntryEvent;
    store: EntryStore;
  };

  render() {
    const {
      hasLoginError,
      visibleTab,
      searchObject,
    } = this.props.store;
    const {
      onClickTab,
      onLoginSubmit,
      onInputKeyword,
    } = this.props.event;

    return (
      <div>
        <Header />
        <p>LOGOとか説明とか</p>

        <TabTrigger
          tabNames={['login', 'search']}
          visibleTab={visibleTab}
          onClick={onClickTab}
        />
        <TabContent
          tabContents={{
            login: <LoginForm
                     onSubmit={onLoginSubmit}
                     hasError={hasLoginError}
                   />,
            search: <SearchForm
                      results={searchObject.results}
                      onInput={onInputKeyword}
                    />
          }}
          visibleTab={visibleTab}
        />
      </div>
    );
  }
}

export default inject('event')(observer(EntryApp));
