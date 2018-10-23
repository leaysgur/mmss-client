import { reaction } from 'mobx';

import { initNotification, showNotification } from '../util/notifier';

import { getMediaSerial, postJSON } from '../../shared/util/fetch';
import { combineEvent, bindAll } from '../../shared/util/class';

import UiEvent from './object/ui';
import PlaylistEvent from './object/playlist';

class MmssEvent {
  constructor(store) {
    combineEvent(this, UiEvent, PlaylistEvent);
    bindAll(this);

    this.store = store;

    initNotification();

    reaction(
      () => this.store.playlist.nowPlaying,
      nowPlaying => {
        if (nowPlaying === null) {
          return;
        }
        this._onChangeNowPlaying(nowPlaying);
      }
    );
  }

  async onClickLogout() {
    await postJSON('/api/logout');
    location.reload(true);
  }

  onClickSortArtist() {
    this.store.ui.lotateSortBy();
    this.store.finder.sortArtist(this.store.ui.sortBy);
  }

  onClickArtist(item) {
    this.store.finder.initAlbums(item.albums);

    this.store.ui.setSelected('artist', item.name);
  }

  onClickAlbum(item) {
    this.store.finder.initSongs(item.songs);

    this.store.ui.setSelected('album', item.name);
  }

  onClickNowPlaying() {
    const nowPlaying = this.store.playlist.nowPlaying;
    if (!nowPlaying) {
      return;
    }

    // albumArtistはパスからしか取れない
    const [artist] = nowPlaying.path.split('/');
    this.store.ui.setFilterBy(artist);
  }

  async _onChangeNowPlaying(nowPlaying) {
    const path = nowPlaying.path;

    this.store.ui.setMediaLoading(true);

    let blob;
    const cached = this.store.mediaCache.get(path);
    if (cached) {
      blob = cached;
    } else {
      blob = await this._getAndCacheMedia(path, this.store.mediaCache);
    }

    this.store.media.setSrc(blob);
    this.store.ui.setMediaLoading(false);
    showNotification(nowPlaying);

    // prefetch next
    const nextPlaying = this.store.playlist.nextPlaying;
    nextPlaying &&
      this._getAndCacheMedia(nextPlaying.path, this.store.mediaCache);
  }

  async _getAndCacheMedia(path, cache) {
    const blob = await getMediaSerial('/api/track', { path })
      .catch(console.error);

    cache.set(path, blob);
    return blob;
  }
}

export default MmssEvent;
