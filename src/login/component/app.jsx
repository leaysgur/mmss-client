// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Header from '../../shared/component/header.jsx';
import LoginForm from './form.jsx';

import type { LoginStoreType } from '../store';
import type { LoginEventType } from '../event';


class LoginApp extends React.Component {
  props: {
    event: LoginEventType;
    store: LoginStoreType;
  };

  render() {
    const { hasLoginError } = this.props.store;
    const { onLoginSubmit } = this.props.event;

    return (
      <div>
        <Header />
        <p>LOGOとか説明とか</p>
        <LoginForm
          onSubmit={onLoginSubmit}
          hasError={hasLoginError}
        />
      </div>
    );
  }
}

export default observer(LoginApp);
