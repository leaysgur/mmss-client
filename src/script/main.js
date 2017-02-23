// @flow
import { useStrict } from 'mobx';

import EntryMain from './entry/main';
import MmssMain from './mmss/main';


useStrict(true);

const YYYYMMDD = new Date().toJSON().split('T')[0].split('-').join('');

Promise.all([
  fetch('/api/check', { credentials: 'same-origin' })
    .then(res => res.json()),
  fetch(`./dist/music.json?_=${YYYYMMDD}`)
    .then(res => res.json()),
])
  .then(([
    isLoginRes: JSON,
    musicRes: JSON,
  ]) => {
    const isLogin = isLoginRes === null;
    isLogin ? MmssMain(musicRes) : EntryMain(musicRes);
  })
  .catch(console.error);
