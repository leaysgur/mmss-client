// @flow
import { useStrict } from 'mobx';

import EntryMain from './entry/main';
import MmssMain from './mmss/main';

import { getJSON } from './shared/util/fetch';


useStrict(true);

const YYYYMMDD = new Date().toJSON().split('T')[0].split('-').join('');

Promise.all([
  getJSON('/api/session'),
  getJSON('./dist/music.json', { _: YYYYMMDD }),
])
  .then(([
    isLoginRes: JSON,
    musicRes: MusicJSON,
  ]) => {
    const isLogin = isLoginRes === null;
    isLogin ? MmssMain(musicRes) : EntryMain(musicRes);
  })
  .catch(console.error);
