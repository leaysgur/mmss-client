import SearchObject from './object/search';
import UiObject, { TabName } from './object/ui';

class EntryStore {
  tabNames: TabName[];
  ui: UiObject;
  search: SearchObject;

  constructor(json: any, hash: string) {
    const tabNames: string[] = ['login', 'search'];

    const match = hash.match(/#!\/(.*)/);
    const tabName = match ? match[1] : '';

    let initTab: TabName;
    if (tabNames.includes(tabName)) {
      initTab = tabName as TabName;
    } else {
      initTab = 'login';
    }

    this.tabNames = tabNames as TabName[];

    this.ui = new UiObject(initTab);
    this.search = new SearchObject(json);
  }
}

export default EntryStore;
