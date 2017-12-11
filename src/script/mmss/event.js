import { reaction } from 'mobx';

import { initNotification, showNotification } from './util/notifier';

import { getMediaSerial, postJSON } from '../shared/util/fetch';
import { bindAll } from '../shared/util/class';

class MmssEvent {
  constructor(store) {
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

  onClickLogout() {
    postJSON('/api/logout').then(() => {
      location.reload(true);
    });
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

  onClickPlayArtist(item) {
    let items = [];
    item.albums.forEach(album => {
      items = items.concat(album.songs);
    });
    this.store.playlist.init(items);
  }

  onClickPlayAlbum(item) {
    this.store.playlist.init(item.songs);
  }

  onClickPlaySong(item) {
    this.store.playlist.init([item]);
  }

  onMouseEnterPlayer() {
    this.store.ui.setHoverPlayer(true);
  }
  onMouseLeavePlayer() {
    this.store.ui.setHoverPlayer(false);
  }
  onMouseEnterPlaylist() {
    this.store.ui.setHoverPlaylist(true);
  }
  onMouseLeavePlaylist() {
    this.store.ui.setHoverPlaylist(false);
  }

  onEndedMedia() {
    this.store.playlist.next();
  }

  onClickPrev() {
    this.store.playlist.prev();
  }

  onClickNext() {
    this.store.playlist.next();
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

  onClickPlaylistItem(item) {
    this.store.playlist.jump(item);
  }

  _onChangeNowPlaying(nowPlaying) {
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
      .then(blob => {
        this.store.media.setSrc(blob);
        this.store.ui.setMediaLoading(false);
        showNotification(nowPlaying);
      })
      .then(() => {
        const nextPlaying = this.store.playlist.nextPlaying;
        nextPlaying &&
          _getAndCacheMedia(nextPlaying.path, this.store.mediaCache);
      })
      .catch(() => {
        location.reload(true);
      });

    function _getAndCacheMedia(path, cache) {
      return getMediaSerial('/api/track', { path })
        .then(blob => {
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
