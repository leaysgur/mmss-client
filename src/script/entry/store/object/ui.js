import { extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';

class UiObject {
  constructor(initTab) {
    actionAll(this);

    extendObservable(this, {
      hasLoginError: false,
      visibleTab: initTab,
    });
  }

  showLoginError(bool) {
    this.hasLoginError = bool;
  }

  showTab(tabName) {
    this.visibleTab = tabName;
  }
}

export default UiObject;
