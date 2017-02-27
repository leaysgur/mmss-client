// @flow
import { reaction } from 'mobx';

import {
  initNotification,
  showNotification,
} from './notifier';

import {
  getMediaSerial,
  postJSON,
} from '../shared/util/fetch';
import { bindAll } from '../shared/util/class';

import type MmssStore from './store';


class MmssEvent {
  store: MmssStore;

  constructor(store: MmssStore) {
    bindAll(this);

    this.store = store;

    initNotification();

    reaction(
      () => this.store.playlist.nowPlaying,
      this._onChangeNowPlaying,
    );
  }

  onClickLogout(): void {
    postJSON('/api/logout')
      .then(() => { location.reload(true); });
  }

  onClickSortArtist(): void {
    this.store.finder.sortArtist();
  }

  onClickArtist(item: Artist): void {
    this.store.finder.initAlbums(item.albums);
  }

  onClickAlbum(item: Album): void {
    this.store.finder.initSongs(item.songs);
  }

  onClickPlayArtist(item: Artist): void {
    let items = [];
    item.albums.forEach(album => {
      items = items.concat(album.songs);
    });
    this.store.playlist.init(items);
  }

  onClickPlayAlbum(item: Album): void {
    this.store.playlist.init(item.songs);
  }

  onClickPlaySong(item: Song): void {
    this.store.playlist.init([item]);
  }

  onClickTogglePlaylist(): void {
    this.store.ui.togglePlaylist();
  }

  onEndedMedia(): void {
    this.store.playlist.next();
  }

  onClickPrev(): void {
    this.store.playlist.prev();
  }

  onClickNext(): void {
    this.store.playlist.next();
  }

  onClickPlaylistItem(item: Song): void {
    this.store.playlist.jump(item);
  }

  _onChangeNowPlaying(nowPlaying) {
    if (!nowPlaying) { return; }

    this.store.ui.setMediaLoading(true);
    getMediaSerial('/api/track', { path: nowPlaying.path })
      .then((blob: Blob) => {
        if (blob.type !== 'audio/mpeg') {
          return location.reload(true);
        }

        this.store.media.setSrc(blob);
        this.store.ui.setMediaLoading(false);
        nowPlaying && showNotification(nowPlaying);
      })
      .catch(console.error);
  }
}

export default MmssEvent;
