// @flow
import { extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';


class UiObject {
  hasLoginError: boolean;
  visibleTab: string;

  constructor(initTab: string) {
    actionAll(this);

    extendObservable(this, {
      hasLoginError: false,
      visibleTab: initTab,
    });
  }

  showLoginError(bool: boolean): void {
    this.hasLoginError = bool;
  }

  showTab(tabName: string): void {
    this.visibleTab = tabName;
  }
}

export default UiObject;
