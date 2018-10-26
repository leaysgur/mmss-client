import SearchObject from './object/search';
import UiObject from './object/ui';

import { MusicJSON } from '../../shared/typings/mmss';

class EntryStore {
  constants: {
    tabNames: string[];
  };
  ui: UiObject;
  search: SearchObject;

  constructor(json: MusicJSON, hash: string) {
    const tabNames = ['login', 'search'];
    const match = hash.match(/#!\/(.*)/);
    const tabName = match ? match[1] : null;

    const initTab =
      tabName && tabNames.indexOf(tabName) !== -1 ? tabName : 'login';

    this.constants = { tabNames };

    this.ui = new UiObject(initTab);
    this.search = new SearchObject(json);
  }
}

export default EntryStore;
