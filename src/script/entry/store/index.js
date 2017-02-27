// @flow
import {
  extendObservable,
} from 'mobx';

import { actionAll } from '../../shared/util/class';
import SearchObject from './object/search';


class EntryStore {
  searchObject: SearchObject;
  hasLoginError: boolean;
  visibleTab: string;

  constructor(json: MusicJSON) {
    actionAll(this);

    this.searchObject = new SearchObject(json);

    extendObservable(this, {
      hasLoginError: false,
      visibleTab: 'login',
    });
  }

  showLoginError(bool: boolean): void {
    this.hasLoginError = bool;
  }

  showTab(tabName: string): void {
    this.visibleTab = tabName;
  }
}

export default EntryStore;
