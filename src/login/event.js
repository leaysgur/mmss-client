// @flow

class LoginEvent {
  onLoginSubmit(item: LoginItem) {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
}

type LoginItem = {
  id: string;
  pw: string;
};

export type LoginEventType = {
  onLoginSubmit: (LoginItem) => void;
};

export default LoginEvent;
