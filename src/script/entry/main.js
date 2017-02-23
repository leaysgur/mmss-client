// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import EntryApp from './component/app.jsx';
import EntryStore from './store';
import EntryEvent from './event';


export default function(musicRes: JSON) {
  const store: EntryStore = new EntryStore(musicRes);
  const event: EntryEvent = new EntryEvent(store);

  ReactDOM.render(
    <EntryApp event={event} store={store} />,
    document.getElementById('root')
  );
}
