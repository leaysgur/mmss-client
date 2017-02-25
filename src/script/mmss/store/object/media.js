// @flow
import {
  action,
  extendObservable,
} from 'mobx';


class Media {
  currentSrc: string;

  constructor() {
    extendObservable(this, {
      currentSrc: '',
    });

    const forBindThis: any = this;
    [
      'setSrc',
    ].forEach(name => {
      forBindThis[name] = action(forBindThis[name]);
    });
  }

  setSrc(blob: Blob): void {
    const objectUrl = URL.createObjectURL(blob);
    if (this.currentSrc.length !== 0) {
      URL.revokeObjectURL(this.currentSrc);
    }
    this.currentSrc = objectUrl;
  }
}

export default Media;
