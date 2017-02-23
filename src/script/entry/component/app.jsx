// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import LoginForm from './login-form.jsx';
import SearchForm from './search-form.jsx';
import TabTrigger from './tab-trigger.jsx';

import type { EntryStoreType } from '../store';
import type { EntryEventType } from '../event';


class EntryApp extends React.Component {
  props: {
    event: EntryEventType;
    store: EntryStoreType;
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
        { visibleTab === 'login' && <LoginForm
          onSubmit={onLoginSubmit}
          hasError={hasLoginError}
        /> }
        { visibleTab === 'search' && <SearchForm
          results={searchObject.results}
          onInput={onInputKeyword}
        /> }
      </div>
    );
  }
}

export default observer(EntryApp);
