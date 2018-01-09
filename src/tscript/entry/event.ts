import { autorun } from 'mobx';
import { postJSON } from '../shared/util/fetch';
import { bindAll } from '../shared/util/class';

import EntryStore from './store';
import { TabName } from './store/object/ui';
import { LoginItem } from './component/login-form';

class EntryEvent {
  store: EntryStore;

  constructor(store: EntryStore) {
    bindAll(this);

    this.store = store;

    autorun(() => {
      const tabName = this.store.ui.visibleTab;
      location.hash = `!/${tabName}`;
    });
  }

  onClickTab(tabName: TabName): void {
    this.store.ui.showTab(tabName);
  }

  async onLoginSubmit(item: LoginItem): Promise<void> {
    const id = item.id.trim();
    const pw = item.pw.trim();

    if (id.length === 0 || pw.length === 0) {
      this.store.ui.showLoginError(true);
      return;
    }

    const res = await postJSON('/api/login', { id, pw });
    const isLogin = res === null;

    this.store.ui.showLoginError(!isLogin);
    if (isLogin) {
      // セッション確立してるのでMmssアプリへ
      return location.reload(true);
    }
  }

  onChangeKeyword(keyword: string): void {
    keyword = keyword.trim();
    this.store.search.setKeyword(keyword);
  }
}

export default EntryEvent;
