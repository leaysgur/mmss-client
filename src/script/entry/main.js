// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import EntryApp from './component/app.jsx';
import EntryStore from './store';
import EntryEvent from './event';

import type { EntryStoreType } from './store';
import type { EntryEventType } from './event';


export default function(musicRes: JSON) {
  const store: EntryStoreType = new EntryStore(musicRes);
  const event: EntryEventType = new EntryEvent(store);

  ReactDOM.render(
    <EntryApp event={event} store={store} />,
    document.getElementById('root')
  );
}
