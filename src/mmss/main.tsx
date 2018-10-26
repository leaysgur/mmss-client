import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import MmssApp from './container/app';
import MmssStore from './store';
import MmssEvent from './event';

import { MusicJSON } from '../shared/typings/mmss';

export default function(musicRes: MusicJSON) {
  const store = new MmssStore(musicRes);
  const event = new MmssEvent(store);

  ReactDOM.render(
    <Provider event={event} store={store}>
      <MmssApp />
    </Provider>,
    document.getElementById('root')
  );
}
