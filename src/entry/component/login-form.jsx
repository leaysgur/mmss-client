import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const LoginForm = ({ onSubmit, hasError }) => (
  <Wrap action="/" onSubmit={ev => _onSubmit(ev, onSubmit)}>
    <div>
      <Input name="id" type="text" placeholder="UserName" />
    </div>
    <div>
      <Input name="pw" type="password" placeholder="PassWord" />
    </div>
    <div>
      <Button type="submit">Login</Button>
    </div>
    {hasError && <Error>Error!</Error>}
  </Wrap>
);

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
  --_width: 200px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: var(--_width);
  padding: 5px 10px;
  margin-bottom: 10px;
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

export default observer(LoginForm);
