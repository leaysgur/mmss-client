import SearchObject from './object/search';
import UiObject from './object/ui';
import ConstantsObject from './object/constants';

import { MusicJSON } from '../../shared/typings/mmss';

class EntryStore {
  constants: typeof ConstantsObject;
  ui: UiObject;
  search: SearchObject;

  constructor(json: MusicJSON, hash: string) {
    this.constants = ConstantsObject;

    const initTab = this.getInitTabByHash(this.constants.tabNames, hash);
    this.ui = new UiObject(initTab);
    this.search = new SearchObject(json);
  }

  private getInitTabByHash(tabNames: string[], hash: string): string {
    const match = hash.match(/#!\/(.*)/);
    const tabName = match ? match[1] : null;

    return tabName && tabNames.includes(tabName) ? tabName : 'login';
  }
}

export default EntryStore;
