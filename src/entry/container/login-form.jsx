import React from 'react';
import styled from 'styled-components';
import { inject, Observer } from 'mobx-react';

const LoginForm = ({ event, ui }) => {
  const { onLoginSubmit } = event;

  return (
    <Wrap action="/" onSubmit={ev => _onSubmit(ev, onLoginSubmit)}>
      <Input name="id" type="text" placeholder="UserName" />
      <Input name="pw" type="password" placeholder="PassWord" />
      <Button type="submit">Login</Button>

      <Observer render={() =>
        <>{ui.hasLoginError && <Error>Error!</Error>}</>
      }/>
    </Wrap>
  );
};

function _onSubmit(ev, onSubmit) {
  ev.preventDefault();
  if (ev.currentTarget instanceof HTMLFormElement) {
    const form = ev.currentTarget.elements;
    onSubmit({
      id: form.id.value,
      pw: form.pw.value,
    });
  }
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

export default inject('event', 'ui')(LoginForm);
