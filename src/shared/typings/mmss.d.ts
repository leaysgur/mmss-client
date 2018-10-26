interface Song {
  album: string;
  artist: string;
  name: string;
  duration: string;
  disc: string;
  track: string;
  path: string;
}

interface Album {
  name: string;
  year: string;
  songs: Song[];
}

interface Artist {
  name: string;
  albums: Album[];
}

export type MusicJSON = Artist[];

export interface LoginItem {
  id: string;
  pw: string;
}
