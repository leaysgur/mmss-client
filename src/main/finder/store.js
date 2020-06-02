import { writable, get } from "svelte/store";

export const createStore = ({ json }) => {
  const artists = writable(json.slice());
  const albums = writable([]);
  const songs = writable([]);

  const isSortedByName = writable(false);
  const toggleNameSort = () => {
    isSortedByName.set(!get(isSortedByName));
  };

  const sortArtist = (isNameSort) => {
    const sorted = isNameSort
      ? [...json].sort((a, b) => (a.name < b.name ? -1 : 1))
      : [...json];
    artists.set(sorted);
  };

  const selectedArtist = writable("");
  const selectedAlbum = writable("");

  const selectArtist = (artist) => {
    selectedArtist.set(artist.name);
    selectedAlbum.set("");
    albums.set(artist.albums);
    songs.set([]);
  };

  const selectAlbum = (album) => {
    selectedAlbum.set(album.name);
    songs.set(album.songs);
  };

  return {
    artists,
    albums,
    songs,
    sortArtist,
    isSortedByName,
    toggleNameSort,
    selectedArtist,
    selectedAlbum,
    selectArtist,
    selectAlbum,
  };
};
