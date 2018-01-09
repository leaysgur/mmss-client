import 'core-js/fn/object/entries';
import 'whatwg-fetch';

import { useStrict } from 'mobx';

import EntryMain from './entry/main';
// import MmssMain from './mmss/main';
const MmssMain = (a: {}) => { console.log(a); };

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
  const isLoginRes = await Promise.resolve({});
  const musicRes = await getJSON('./dist/music.json', { _: YYYYMMDD });

  isLoginRes === null ? MmssMain(musicRes) : EntryMain(musicRes);
})();
