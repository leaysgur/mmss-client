// @flow
import { reaction } from 'mobx';

import { getMediaSerial } from '../shared/utils';

import type MmssStore from './store';
import type { Song, Album, Artist } from './store/object/finder';


class MmssEvent {
  store: MmssStore;

  constructor(store: MmssStore) {
    this.store = store;

    reaction(
      () => this.store.playlist.nowPlaying,
      (nowPlaying) => {
        if (!nowPlaying) { return; }

        this.store.ui.setMediaLoading(true);
        getMediaSerial('/api/track', { path: nowPlaying.path })
          .then(blob => {
            this.store.media.setSrc(blob);
            this.store.ui.setMediaLoading(false);
          });
      }
    );

    const forBindThis: any = this;
    [
      'onClickSortArtist',
      'onClickArtist', 'onClickAlbum',
      'onClickPlayArtist', 'onClickPlayAlbum', 'onClickPlaySong',
      'onClickTogglePlaylist',
      'onEndedMedia',
      'onClickPrev', 'onClickNext',
    ].forEach(name => {
      forBindThis[name] = forBindThis[name].bind(this);
    });
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
    Object.keys(item.albums).forEach(album => {
      items = items.concat(item.albums[album].songs);
    });
    // TODO: とりあえずコレで古い順にいい感じにソートされてるけど
    //       やっぱ前もってソートしておく
    items.reverse();
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
}

export default MmssEvent;
