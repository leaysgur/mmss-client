import { decorate, observable } from 'mobx';

class UiObject {
  hasLoginError: boolean;
  visibleTab: string;

  constructor(initTab: string) {
    this.hasLoginError = false;
    this.visibleTab = initTab;
  }

  showLoginError(bool: boolean) {
    this.hasLoginError = bool;
  }

  showTab(tabName: string) {
    this.visibleTab = tabName;
  }
}

decorate(UiObject, {
  hasLoginError: observable,
  visibleTab: observable,
});
export default UiObject;
