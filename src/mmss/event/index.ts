import { reaction } from 'mobx';

import { getMediaSerial, postJSON } from '../../shared/util/fetch';
import { bindAll } from '../../shared/util/class';

import UiEvent from './object/ui';
import PlaylistEvent from './object/playlist';

import MmssStore from '../store';
import { Artist, Album, Song } from '../../shared/typings/mmss';

class MmssEvent {
  playlistEvent: PlaylistEvent;
  uiEvent: UiEvent;
  private store: MmssStore;

  constructor(store: MmssStore) {
    bindAll(this);

    this.store = store;
    this.playlistEvent = new PlaylistEvent(store.playlist);
    this.uiEvent = new UiEvent(store.ui);

    reaction(
      () => this.store.playlist.nowPlaying,
      nowPlaying => {
        if (nowPlaying === null) {
          return;
        }
        this.onChangeNowPlaying(nowPlaying);
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

  onClickArtist(item: Artist) {
    this.store.finder.initAlbums(item.albums);

    this.store.ui.setSelected('artist', item.name);
  }

  onClickAlbum(item: Album) {
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

  private async onChangeNowPlaying(nowPlaying: Song) {
    const path = nowPlaying.path;

    this.store.ui.setMediaLoading(true);

    let blob;
    const cached = this.store.mediaCache.get(path);
    if (cached) {
      blob = cached;
    } else {
      blob = await this.getAndCacheMedia(path, this.store.mediaCache);
    }

    this.store.media.setSrc(blob);
    this.store.ui.setMediaLoading(false);

    // prefetch next
    const nextPlaying = this.store.playlist.nextPlaying;
    if (nextPlaying) {
      this.getAndCacheMedia(nextPlaying.path, this.store.mediaCache);
    }
  }

  private async getAndCacheMedia(path: string, cache: MmssStore['mediaCache']): Promise<Blob> {
    const blob = await getMediaSerial('/api/track', { path })
      .catch(console.error) as Blob;

    cache.set(path, blob);
    return blob;
  }
}

export default MmssEvent;
