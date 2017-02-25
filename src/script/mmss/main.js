// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import MmssApp from './app.jsx';
import MmssStore from './store';
import MmssEvent from './event';


export default function(json: JSON) {
  const store: MmssStore = new MmssStore(json);
  const event: MmssEvent = new MmssEvent(store);

  ReactDOM.render(
    <Provider event={event}>
      <MmssApp store={store} />
    </Provider>,
    document.getElementById('root')
  );
}
