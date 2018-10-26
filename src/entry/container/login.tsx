import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import EntryStore from '../store';
import EntryEvent from '../event';

interface LoginProps {
  event: EntryEvent;
  ui: EntryStore['ui'];
}
interface LoginFormElements extends HTMLFormControlsCollection {
  id: HTMLInputElement;
  pw: HTMLInputElement;
}

const Login = ({ event, ui }: LoginProps) => {
  const { onLoginSubmit } = event;

  return (
    <Wrap action="/" onSubmit={ev => _onSubmit(ev, onLoginSubmit)}>
      <Input name="id" type="text" placeholder="UserName" />
      <Input name="pw" type="password" placeholder="PassWord" />
      <Button type="submit">Login</Button>

      {ui.hasLoginError && <Error>Error!</Error>}
    </Wrap>
  );
};

function _onSubmit(ev: React.FormEvent<HTMLFormElement>, onSubmit: LoginProps['event']['onLoginSubmit']) {
  ev.preventDefault();
  const form = ev.currentTarget.elements as LoginFormElements;
  onSubmit({
    id: form.id.value,
    pw: form.pw.value,
  });
}

const Wrap = styled.form`
  text-align: center;
  --_width: 250px;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: var(--_width);
  padding: 5px 10px;
  margin: 0 auto 10px;
  font-size: 1rem;

  &:hover,
  &:focus {
    border: 2px solid var(--linkColor);
    outline: none;
  }
`;

const Button = styled.button`
  box-sizing: border-box;
  width: var(--_width);
  height: 35px;
  font-size: 1rem;
`;

const Error = styled.div`
  margin: 10px auto;
  color: #f44242;
`;

export default inject('event', 'ui')(observer(Login));