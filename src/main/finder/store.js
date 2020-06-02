import { writable, derived, get } from "svelte/store";

export const createStore = ({ json }) => {
  const isSortedByName = writable(false);
  const toggleNameSort = () => {
    isSortedByName.set(!get(isSortedByName));
  };

  const artists = derived(isSortedByName, ($isSortedByName, set) => {
    const sorted = $isSortedByName
      ? [...json].sort((a, b) => (a.name < b.name ? -1 : 1))
      : [...json];
    set(sorted);
  });
  const albums = writable([]);
  const songs = writable([]);

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
    isSortedByName,
    toggleNameSort,
    selectedArtist,
    selectedAlbum,
    selectArtist,
    selectAlbum,
  };
};
