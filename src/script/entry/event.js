// @flow
import { postJSON } from '../shared/util/fetch';
import { bindAll } from '../shared/util/class';

import type EntryStore from './store';


class EntryEvent {
  store: EntryStore;

  constructor(store: EntryStore) {
    bindAll(this);

    this.store = store;
  }

  onClickTab(tabName: string): void {
    this.store.ui.showTab(tabName);
  }

  onLoginSubmit(item: LoginItem): void {
    postJSON('/api/login', item)
      .then((res: APIJSONRes) => {
        if (res === null) {
          this.store.ui.showLoginError(false);
          return location.reload(true);
        }
        this.store.ui.showLoginError(true);
      })
      .catch(console.error);
  }

  onInputKeyword(keyword: string): void {
    keyword = keyword.trim();
    this.store.search.setKeyword(keyword);
  }
}

export type LoginItem = {
  id: string;
  pw: string;
};
export default EntryEvent;
