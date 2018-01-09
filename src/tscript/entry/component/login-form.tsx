import * as React from 'react';
import { observer } from 'mobx-react';

export type LoginItem = {
  id: string,
  pw: string,
};
type OnSubmit = (item: LoginItem) => Promise<void>;
interface LoginFormProps {
  onSubmit: OnSubmit,
  hasError: boolean,
}
interface FormElms extends HTMLFormElement {
  user: HTMLInputElement,
  pass: HTMLInputElement,
}

function _onSubmit(ev: React.FormEvent<HTMLFormElement>, onSubmit: OnSubmit): void {
  ev.preventDefault();
  const form = ev.currentTarget.elements as FormElms;
  onSubmit({
    id: form.user.value,
    pw: form.pass.value,
  });
}

const LoginForm: React.SFC<LoginFormProps> = ({ onSubmit, hasError }) => (
  <div className="LoginForm">
    <img src="./image/icon.png" className="Logo" />

    <form action="/" onSubmit={ev => _onSubmit(ev, onSubmit)}>
      <div>
        <input name="user" type="text" placeholder="Username" />
      </div>
      <div>
        <input name="pass" type="password" placeholder="Password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      {hasError && <div className="LoginForm_Error">Error!</div>}
    </form>
  </div>
);

export default observer(LoginForm);
