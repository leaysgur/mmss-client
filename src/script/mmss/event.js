// @flow
import type { MmssStoreType } from './store';


class MmssEvent {
  store: MmssStoreType;

  constructor(store: MmssStoreType) {
    this.store = store;

    const forBindThis: any = this;
    [
      'onClickArtist', 'onClickAlbum',
      'onClickPlaySong',
    ].forEach(name => {
      forBindThis[name] = forBindThis[name].bind(this);
    });
  }

  onClickArtist(item: Object): void {
    this.store.selectArtist(item.name);
  }

  onClickAlbum(item: Object): void {
    this.store.selectAlbum(item.name);
  }

  onClickPlaySong(item: Object): void {
    // TODO: ここでやらない
    fetch(`/api/track?path=${item.path}`, {
      credentials: 'same-origin',
    })
      .then(res => res.blob())
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);

        const audio: HTMLAudioElement = document.createElement('audio');
        audio.autoplay = true;
        audio.onload = () => {
          URL.revokeObjectURL(objectUrl);
        };

        audio.src = objectUrl;
      });
  }
}

export type MmssEventType = MmssEvent;
export default MmssEvent;
