// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import LoginApp from './component/app.jsx';
import LoginEvent from './event';
import type { LoginEventType } from './event';


export default function() {
  const event: LoginEventType = new LoginEvent();
  ReactDOM.render(
    <LoginApp event={event} />,
    document.getElementById('root')
  );
}
