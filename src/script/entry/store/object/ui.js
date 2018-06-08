import { decorate, observable } from 'mobx';

class UiObject {
  constructor(initTab) {
    this.hasLoginError = false;
    this.visibleTab = initTab;
  }

  showLoginError(bool) {
    this.hasLoginError = bool;
  }

  showTab(tabName) {
    this.visibleTab = tabName;
  }
}

decorate(UiObject, {
  hasLoginError: observable,
  visibleTab: observable,
});
export default UiObject;
