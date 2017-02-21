// @flow
import React from 'react';
import { observer } from 'mobx-react';

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
        <p>LOGOとか</p>
        <LoginForm
          onSubmit={onLoginSubmit}
          hasError={hasLoginError}
        />
      </div>
    );
  }
}

export default observer(LoginApp);
