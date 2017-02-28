// @flow
import SearchObject from './object/search';
import UiObject from './object/ui';


class EntryStore {
  ui: UiObject;
  search: SearchObject;

  constructor(json: MusicJSON) {
    this.ui = new UiObject();
    this.search = new SearchObject(json);
  }
}

export default EntryStore;
