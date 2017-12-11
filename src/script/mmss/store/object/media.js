import { extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';

class Media {
  constructor() {
    actionAll(this);

    extendObservable(this, {
      currentSrc: null,
    });
  }

  setSrc(blob) {
    const objectUrl = URL.createObjectURL(blob);
    if (this.currentSrc) {
      URL.revokeObjectURL(this.currentSrc);
    }
    this.currentSrc = objectUrl;
  }
}

export default Media;
