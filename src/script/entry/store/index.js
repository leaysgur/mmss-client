// @flow
import { actionAll } from '../../shared/util/class';

import SearchObject from './object/search';
import UiObject from './object/ui';


class EntryStore {
  searchObject: SearchObject;
  uiObject: UiObject;

  constructor(json: MusicJSON) {
    actionAll(this);

    this.searchObject = new SearchObject(json);
    this.uiObject = new UiObject();
  }
}

export default EntryStore;
