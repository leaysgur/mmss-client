// @flow
import { extendObservable } from 'mobx';


class LoginStore {
  hasLoginError: boolean;

  constructor() {
    extendObservable(this, {
      hasLoginError: false,
    });
  }
}

export type LoginStoreType = LoginStore;
export default LoginStore;
