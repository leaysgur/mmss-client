// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import LoginForm from './login-form.jsx';
import SearchForm from './search-form.jsx';

import type { EntryStoreType } from '../store';
import type { EntryEventType } from '../event';

const TabTrigger = ({
  tabNames,
  visibleTab,
  onClick,
}: {
  tabNames: string[];
  visibleTab: string;
  onClick: (name: string) => void;
}) => (
  <div>
    { tabNames.map(name => (
      visibleTab !== name
        ? <a key={name} href="#" onClick={(ev) => { ev.preventDefault(); onClick(name); }}>{name}</a>
        : <span key={name}>{name}</span>
    )) }
  </div>
);


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
