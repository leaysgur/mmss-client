import EntryMain from './entry/main';
// import MmssMain from './mmss/main';
const MmssMain = (a: {}) => a;

import { getJSON } from './shared/util/fetch';

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
