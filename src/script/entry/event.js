// @flow
import type EntryStore from './store';


class EntryEvent {
  store: EntryStore;

  constructor(store: EntryStore) {
    this.store = store;

    const forBindThis: any = this;
    [
      'onClickTab',
      'onLoginSubmit',
      'onInputKeyword',
    ].forEach(name => {
      forBindThis[name] = forBindThis[name].bind(this);
    });
  }

  onClickTab(tabName: string): void {
    this.store.showTab(tabName);
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
          this.store.showLoginError(false);
          return location.reload(true);
        }
        this.store.showLoginError(true);
      })
      .catch(console.error);
  }

  onInputKeyword(keyword: string): void {
    keyword = keyword.trim();
    this.store.searchObject.setKeyword(keyword);
  }
}

export type LoginItem = {
  id: string;
  pw: string;
};
export default EntryEvent;
