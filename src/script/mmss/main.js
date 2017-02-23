// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import MmssApp from './component/app.jsx';
import MmssStore from './store';
import MmssEvent from './event';


export default function(json: JSON) {
  const store: MmssStore = new MmssStore(json);
  const event: MmssEvent = new MmssEvent(store);

  ReactDOM.render(
    <MmssApp event={event} store={store} />,
    document.getElementById('root')
  );
}
