import React from 'react';
import { observer } from 'mobx-react';


const LoginForm = ({
  onSubmit,
  hasError,
}: {
  onSubmit: () => void;
  hasError: boolean;
}) => {
  const _onSubmit = (ev: Event) => {
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
    <input name="id" type="text" />
    <input name="pw" type="password" />
    <button type="submit">Login</button>
    { hasError && 'error!!' }
  </form>
  );
};

export default observer(LoginForm);
