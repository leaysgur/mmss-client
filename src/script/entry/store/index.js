// @flow
import SearchObject from './object/search';
import UiObject from './object/ui';


class EntryStore {
  search: SearchObject;
  ui: UiObject;

  constructor(json: MusicJSON) {
    this.search = new SearchObject(json);
    this.ui = new UiObject();
  }
}

export default EntryStore;
