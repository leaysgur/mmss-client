// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Logo from '../../shared/component/logo.jsx';

import type { LoginItem } from '../event';


const LoginForm = ({
  onSubmit,
  hasError,
}: {
  onSubmit: (item: LoginItem) => void;
  hasError: boolean;
}) => {
  const _onSubmit = (ev: Event): void => {
    ev.preventDefault();
    if (ev.currentTarget instanceof HTMLFormElement) {
      // XXX: ほんとはフォーム要素ごとに型をつける
      const form: any = ev.currentTarget.elements;
      onSubmit({
        id: form.id.value,
        pw: form.pw.value,
      });
    }
  };

  return (
    <div className="LoginForm">
      <Logo />
      <form action="/" onSubmit={_onSubmit}>
        <div>
          <input name="id" type="text" placeholder="user" />
        </div>
        <div>
          <input name="pw" type="password" placeholder="pass" />
        </div>
        <div>
          <button type="submit">Entry</button>
        </div>
        { hasError && 'error!!' }
      </form>
    </div>
  );
};

export default observer(LoginForm);
