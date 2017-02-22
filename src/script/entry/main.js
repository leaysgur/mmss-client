// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import EntryApp from './component/app.jsx';
import EntryStore from './store';
import EntryEvent from './event';

import type { EntryStoreType } from './store';
import type { EntryEventType } from './event';
import type { MusicModelType } from '../shared/model/music';


export default function(musicModel: MusicModelType) {
  const store: EntryStoreType = new EntryStore(musicModel);
  const event: EntryEventType = new EntryEvent(store);

  ReactDOM.render(
    <EntryApp event={event} store={store} />,
    document.getElementById('root')
  );
}
