import EntryMain from './entry/main';
import MmssMain from './mmss/main';

import { getJSON } from './shared/util/fetch';

import { MusicJSON } from './shared/typings/mmss';

// キャッシュ飛ばしたい時もあると思うのでとりあえず
const YYYYMMDD = new Date()
  .toJSON()
  .split('T')[0]
  .split('-')
  .join('');

// セッションがあればアプリを、なければログイン画面を
(async () => {
  const isLoginRes = await getJSON('/api/session').then(() => true).catch(() => false);
  const musicRes = await getJSON('./dist/music.json', { _: YYYYMMDD }) as MusicJSON;

  isLoginRes ? MmssMain(musicRes) : EntryMain(musicRes);
})().catch(console.error);
