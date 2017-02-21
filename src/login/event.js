// @flow
import type { LoginStoreType } from './store';


class LoginEvent {
  store: LoginStoreType;

  constructor(store: LoginStoreType) {
    this.store = store;

    const forBindThis: any = this;
    forBindThis.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onLoginSubmit(item: LoginItem): void {
    fetch('/api/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(res => {
        if (res === null) {
          this.store.showError(false);
          return location.reload(true);
        }
        this.store.showError(true);
      })
      .catch(console.error);
  }
}

type LoginItem = {
  id: string;
  pw: string;
};

export type LoginEventType = LoginEvent;
export default LoginEvent;
