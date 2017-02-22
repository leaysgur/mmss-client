// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import LoginApp from './component/app.jsx';
import LoginStore from './store';
import LoginEvent from './event';
import type { LoginStoreType } from './store';
import type { LoginEventType } from './event';


export default function(json: JSON) {
  const store: LoginStoreType = new LoginStore(json);
  const event: LoginEventType = new LoginEvent(store);

  ReactDOM.render(
    <LoginApp event={event} store={store} />,
    document.getElementById('root')
  );
}
