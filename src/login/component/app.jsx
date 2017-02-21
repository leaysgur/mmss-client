// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type { LoginStoreType } from '../store';
import type { LoginEventType } from '../event';


class LoginApp extends React.Component {
  props: {
    event: LoginEventType;
    store: LoginStoreType;
  };
  onSubmit: (ev: Event) => void;

  constructor() {
    super();

    this.onSubmit = (ev: Event) => {
      ev.preventDefault();
      if (ev.currentTarget instanceof HTMLFormElement) {
        // XXX: ほんとはフォーム要素ごとに型をつける
        const form: any = ev.currentTarget.elements;
        this.props.event.onLoginSubmit({
          id: form.id.value,
          pw: form.pw.value,
        });
      }
    };
  }

  render() {
    const { hasLoginError } = this.props.store;

    return (
      <div>
        <form action="/" onSubmit={this.onSubmit}>
          <input name="id" type="text" />
          <input name="pw" type="password" />
          <button type="submit">Login</button>
        </form>
        { hasLoginError && 'error!!' }
      </div>
    );
  }
}

export default observer(LoginApp);
