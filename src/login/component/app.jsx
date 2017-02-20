// @flow
import React from 'react';

import type { LoginEventType } from '../event';


class LoginApp extends React.Component {
  props: {
    event: LoginEventType;
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
    return (
      <div>
        <form action="/" onSubmit={this.onSubmit}>
          <input name="id" type="text" />
          <input name="pw" type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginApp;
