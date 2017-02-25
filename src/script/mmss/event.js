// @flow
import { reaction } from 'mobx';

import type MmssStore from './store';
import type { Song, Album, Artist } from './store/object/finder';


class MmssEvent {
  store: MmssStore;

  _mediaXhr: XMLHttpRequest;

  constructor(store: MmssStore) {
    this.store = store;

    this._mediaXhr;

    reaction(
      () => this.store.playlist.nowPlaying,
      (nowPlaying) => {
        if (!nowPlaying) { return; }

        console.log(nowPlaying);
        if (this._mediaXhr) {
          if (this._mediaXhr.readyState !== 4) {
            this._mediaXhr.abort();
          }
        } else {
          this._mediaXhr = new XMLHttpRequest();
        }

        this._mediaXhr.open('GET', `/api/track?path=${nowPlaying.path}`);
        this._mediaXhr.responseType = 'blob';

        this._mediaXhr.onload = () => {
          this.store.media.setSrc(this._mediaXhr.response);
        };

        this._mediaXhr.send();
      }
    );

    const forBindThis: any = this;
    [
      'onClickSortArtist',
      'onClickArtist', 'onClickAlbum',
      'onClickPlayArtist', 'onClickPlayAlbum', 'onClickPlaySong',
      'onClickTogglePlaylist',
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
}

export default MmssEvent;
