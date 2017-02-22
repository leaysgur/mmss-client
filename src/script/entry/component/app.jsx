// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import LoginForm from './login-form.jsx';
import SearchForm from './search-form.jsx';

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
      searchResults,
    } = this.props.store;
    const {
      onLoginSubmit,
      onInputKeyword,
    } = this.props.event;

    return (
      <div>
        <Header />
        <p>LOGOとか説明とか</p>
        <p>Tabに</p>
        <LoginForm
          onSubmit={onLoginSubmit}
          hasError={hasLoginError}
        />
        <SearchForm
          results={searchResults}
          onInput={onInputKeyword}
        />
      </div>
    );
  }
}

export default observer(EntryApp);
