import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import EntryApp from './container/app';
import EntryStore from './store';
import EntryEvent from './event';

import { MusicJSON } from '../shared/typings/mmss';

export default function(musicRes: MusicJSON) {
  const store = new EntryStore(musicRes, location.hash);
  const event = new EntryEvent(store);

  ReactDOM.render(
    <Provider event={event} {...store}>
      <EntryApp />
    </Provider>,
    document.getElementById('root')
  );
}
