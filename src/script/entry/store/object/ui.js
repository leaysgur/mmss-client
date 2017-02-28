// @flow
import { extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';


class UiObject {
  hasLoginError: boolean;
  visibleTab: string;

  constructor() {
    actionAll(this);

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

export default UiObject;
