import React from 'react';
import { observer } from 'mobx-react';

const LoginForm = ({ onSubmit, hasError }) => {
  const _onSubmit = ev => {
    ev.preventDefault();
    if (ev.currentTarget instanceof HTMLFormElement) {
      const form = ev.currentTarget.elements;
      onSubmit({
        id: form.id.value,
        pw: form.pw.value,
      });
    }
  };

  return (
    <div className="LoginForm">
      <img src="./image/icon.png" className="Logo" />

      <form action="/" onSubmit={_onSubmit}>
        <div>
          <input name="id" type="text" placeholder="Username" />
        </div>
        <div>
          <input name="pw" type="password" placeholder="Password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {hasError && <div className="LoginForm_Error">Error!</div>}
      </form>
    </div>
  );
};

export default observer(LoginForm);
