// @flow
import {
  action,
  extendObservable,
} from 'mobx';


class LoginStore {
  hasLoginError: boolean;

  constructor() {
    extendObservable(this, {
      hasLoginError: false,
    });

    const forBindThis: any = this;
    forBindThis.showError = action(this.showError);
  }

  showError(bool: boolean): void {
    this.hasLoginError = bool;
  }
}

export type LoginStoreType = LoginStore;
export default LoginStore;
