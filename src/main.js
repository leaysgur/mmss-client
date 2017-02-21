// @flow
import { useStrict } from 'mobx';

import LoginMain from './login/main';
import MmssMain from './mmss/main';


useStrict(true);

fetch('/api/check', {
    credentials: 'same-origin',
  })
  .then(res => res.json())
  .then(res => {
    if (res !== null) {
      return LoginMain();
    }

    MmssMain();
  })
  .catch(console.error);
