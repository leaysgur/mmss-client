// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import MmssApp from './component/app.jsx';
import MmssStore from './store';
import MmssEvent from './event';

import type { MmssStoreType } from './store';
import type { MmssEventType } from './event';


export default function() {
  const YYYYMMDD = new Date().toJSON().split('T')[0].split('-').join('');
  fetch(`./dist/music.json?_=${YYYYMMDD}`)
    .then((res) => res.json())
    .then(json => {
      const store: MmssStoreType = new MmssStore(json);
      const event: MmssEventType = new MmssEvent(store);

      ReactDOM.render(
        <MmssApp event={event} store={store} />,
        document.getElementById('root')
      );
    })
    .catch(console.error);
}
