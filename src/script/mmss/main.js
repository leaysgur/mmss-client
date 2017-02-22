// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import MmssApp from './component/app.jsx';
import MmssStore from './store';
import MmssEvent from './event';

import type { MmssStoreType } from './store';
import type { MmssEventType } from './event';


export default function(json: JSON) {
  const store: MmssStoreType = new MmssStore(json);
  const event: MmssEventType = new MmssEvent(store);

  ReactDOM.render(
    <MmssApp event={event} store={store} />,
    document.getElementById('root')
  );
}
