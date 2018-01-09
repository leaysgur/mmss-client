import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import EntryApp from './app';
import EntryEvent from './event';
import EntryStore from './store';

export default function(musicRes: {}) {
  const store = new EntryStore(musicRes, location.hash);
  const event = new EntryEvent(store);

  ReactDOM.render(
    <Provider event={event}>
      <EntryApp store={store} />
    </Provider>,
    document.getElementById('root')
  );
}
