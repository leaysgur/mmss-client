const React = require('react');


class LoginApp extends React.Component {
  constructor() {
    super();

    this.onSubmit = (ev) => {
      ev.preventDefault();

      const form = ev.currentTarget;
      console.log(form.user.value, form.pass.value);
    };
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.onSubmit}>
          <input name="user" type="text" />
          <input name="pass" type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

module.exports = LoginApp;
