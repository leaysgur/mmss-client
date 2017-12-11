import SearchObject from './object/search';
import UiObject from './object/ui';

class EntryStore {
  constructor(json, hash) {
    const tabNames = ['login', 'search'];
    const match = hash.match(/#!\/(.*)/);
    const tabName = match ? match[1] : null;

    const initTab =
      tabName && tabNames.indexOf(tabName) !== -1 ? tabName : 'login';

    this.tabNames = tabNames;

    this.ui = new UiObject(initTab);
    this.search = new SearchObject(json);
  }
}

export default EntryStore;
