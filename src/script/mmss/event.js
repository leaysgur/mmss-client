// @flow
import type MmssStore from './store';


class MmssEvent {
  store: MmssStore;

  constructor(store: MmssStore) {
    this.store = store;

    const forBindThis: any = this;
    [
      'onClickSortArtist',
      'onClickArtist', 'onClickAlbum',
      'onClickPlaySong',
    ].forEach(name => {
      forBindThis[name] = forBindThis[name].bind(this);
    });
  }

  onClickSortArtist(): void {
    this.store.sortArtist();
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

export default MmssEvent;
