// @flow
import { reaction } from 'mobx';

import {
  initNotification,
  showNotification,
} from './util/notifier';

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
      (nowPlaying) => {
        if (nowPlaying === null) { return; }
        this._onChangeNowPlaying(nowPlaying);
      },
    );
  }

  onClickLogout(): void {
    postJSON('/api/logout')
      .then(() => { location.reload(true); });
  }

  onClickSortArtist(): void {
    this.store.ui.lotateSortBy();
    this.store.finder.sortArtist(this.store.ui.sortBy);
  }

  onClickArtist(item: Artist): void {
    this.store.finder.initAlbums(item.albums);

    this.store.ui.setSelected('artist', item.name);
  }

  onClickAlbum(item: Album): void {
    this.store.finder.initSongs(item.songs);

    this.store.ui.setSelected('album', item.name);
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

  onMouseEnterPlayer(): void {
    this.store.ui.setHoverPlayer(true);
  }
  onMouseLeavePlayer(): void {
    this.store.ui.setHoverPlayer(false);
  }
  onMouseEnterPlaylist(): void {
    this.store.ui.setHoverPlaylist(true);
  }
  onMouseLeavePlaylist(): void {
    this.store.ui.setHoverPlaylist(false);
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

  _onChangeNowPlaying(nowPlaying: Song): void {
    const path = nowPlaying.path;
    const cached = this.store.mediaCache.get(path);

    let getMedia;
    if (cached) {
      getMedia = Promise.resolve(cached);
    } else {
      getMedia = _getAndCacheMedia(path, this.store.mediaCache);
    }

    this.store.ui.setMediaLoading(true);
    getMedia
      .then((blob: Blob) => {
        this.store.media.setSrc(blob);
        this.store.ui.setMediaLoading(false);
        showNotification(nowPlaying);
      })
      .then(() => {
        const nextPlaying = this.store.playlist.nextPlaying;
        nextPlaying && _getAndCacheMedia(nextPlaying.path, this.store.mediaCache);
      })
      .catch(() => {
        location.reload(true);
      });

    function _getAndCacheMedia(path: string, cache: Map<string, Blob>): Promise<Blob> {
      return getMediaSerial('/api/track', { path })
      .then((blob: Blob) => {
        if (blob.type !== 'audio/mpeg') {
          return Promise.reject();
        }

        cache.set(path, blob);
        return Promise.resolve(blob);
      })
      .catch(console.error);
    }
  }
}

export default MmssEvent;
