import 'whatwg-fetch';
import 'core-js/fn/object/entries';

import { useStrict } from 'mobx';

import EntryMain from './entry/main';
import MmssMain from './mmss/main';

import { getJSON } from './shared/util/fetch';

// use mobx strict
useStrict(true);

// キャッシュ飛ばしたい時もあると思うのでとりあえず
const YYYYMMDD = new Date()
  .toJSON()
  .split('T')[0]
  .split('-')
  .join('');

// セッションがあればアプリを、なければログイン画面を
(async () => {
  const [isLoginRes, musicRes] = await Promise.all([
    getJSON('/api/session'),
    getJSON('./dist/music.json', { _: YYYYMMDD }),
  ])
  .catch(console.error);

  isLoginRes === null ? MmssMain(musicRes) : EntryMain(musicRes);
})();
