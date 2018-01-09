import { extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';

export type TabName = 'login' | 'search';

class UiObject {
  hasLoginError: boolean;
  visibleTab: TabName;

  constructor(initTab: TabName) {
    actionAll(this);

    extendObservable(this, {
      hasLoginError: false,
      visibleTab: initTab,
    });
  }

  showLoginError(bool: boolean): void {
    this.hasLoginError = bool;
  }

  showTab(tab: TabName): void {
    this.visibleTab = tab;
  }
}

export default UiObject;
