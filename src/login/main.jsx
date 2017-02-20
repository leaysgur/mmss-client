// @flow
const React = require('react');


class LoginApp extends React.Component {
  onSubmit: (ev: Event) => void;

  constructor() {
    super();

    this.onSubmit = (ev: Event) => {
      ev.preventDefault();
      if (ev.currentTarget instanceof HTMLFormElement) {
        // XXX: ほんとはフォーム要素ごとに型をつける
        const form: any = ev.currentTarget.elements;
        console.log(form.user.value, form.pass.value);
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

module.exports = LoginApp;
