import { decorate, observable } from 'mobx';

class Media {
  currentSrc: string | null;

  constructor() {
    this.currentSrc = null;
  }

  setSrc(blob: Blob) {
    const objectUrl = URL.createObjectURL(blob);
    if (this.currentSrc) {
      URL.revokeObjectURL(this.currentSrc);
    }
    this.currentSrc = objectUrl;
  }
}

decorate(Media, {
  currentSrc: observable,
});
export default Media;
