import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import MmssApp from './container/app';
import MmssStore from './store';
import MmssEvent from './event';

export default function(json) {
  const store = new MmssStore(json);
  const event = new MmssEvent(store);

  ReactDOM.render(
    <Provider event={event} {...store}>
      <MmssApp />
    </Provider>,
    document.getElementById('root')
  );
}
