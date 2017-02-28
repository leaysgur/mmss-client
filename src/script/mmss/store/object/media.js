// @flow
import { extendObservable } from 'mobx';

import { actionAll } from '../../../shared/util/class';


class Media {
  currentSrc: string | null;

  constructor() {
    actionAll(this);

    extendObservable(this, {
      currentSrc: null,
    });
  }

  setSrc(blob: Blob): void {
    const objectUrl = URL.createObjectURL(blob);
    if (this.currentSrc) {
      URL.revokeObjectURL(this.currentSrc);
    }
    this.currentSrc = objectUrl;
  }
}

export default Media;
