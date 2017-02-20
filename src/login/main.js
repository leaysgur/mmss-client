// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import LoginApp from './component/app.jsx';
import LoginEvent from './event';

export default () => {
  const event = new LoginEvent();
  ReactDOM.render(<LoginApp event={event} />, document.getElementById('root'));
};
