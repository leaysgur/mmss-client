import MmssStore from '../../store';
import { Artist, Album, Song } from '../../../shared/typings/mmss';

class PlaylistEvent {
  private playlist: MmssStore['playlist'];

  constructor(playlist: MmssStore['playlist']) {
    this.playlist = playlist;
  }

  onClickPlayArtist(item: Artist) {
    let items: Song[] = [];
    item.albums.forEach(album => {
      items = items.concat(album.songs);
    });
    this.playlist.init(items);
  }

  onClickPlayAlbum(item: Album) {
    this.playlist.init(item.songs);
  }

  onClickPlaySong(item: Song) {
    this.playlist.init([item]);
  }

  onClickAddSongToPlaylist(item: Song) {
    this.playlist.add(item);
  }

  onEndedMedia() {
    this.playlist.next();
  }

  onClickPrev() {
    this.playlist.prev();
  }

  onClickNext() {
    this.playlist.next();
  }

  onClickPlaylistItem(item: Song) {
    this.playlist.jump(item);
  }
}

export default PlaylistEvent;
