// @flow
import React from 'react';


class LoginApp extends React.Component {
  props: {
    event: Object;
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
          user: form.user.value,
          pass: form.pass.value,
        });
      }
    };
  }

  render() {
    return (
      <div>
        <form action="/" onSubmit={this.onSubmit}>
          <input name="user" type="text" />
          <input name="pass" type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginApp;
