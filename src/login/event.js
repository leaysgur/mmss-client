// @flow

class LoginEvent {
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
          return location.reload(true);
        }
        // TODO: create store -> show error msg
        console.error(res.error);
      });
  }
}

type LoginItem = {
  id: string;
  pw: string;
};

export type LoginEventType = LoginEvent;

export default LoginEvent;
