// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type { LoginItemType } from '../event';


const LoginForm = ({
  onSubmit,
  hasError,
}: {
  onSubmit: (item: LoginItemType) => void;
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
  <form action="/" onSubmit={_onSubmit}>
    <div>
      <input name="id" type="text" placeholder="user" />
    </div>
    <div>
      <input name="pw" type="password" placeholder="pass" />
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
    { hasError && 'error!!' }
  </form>
  );
};

export default observer(LoginForm);
