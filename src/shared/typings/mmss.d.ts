export interface Song {
  album: string;
  artist: string;
  name: string;
  duration: string;
  disc: string;
  track: string;
  path: string;
}

export interface Album {
  name: string;
  year: string;
  songs: Song[];
}

export interface Artist {
  name: string;
  albums: Album[];
}

export type MusicJSON = Artist[];

export interface LoginItem {
  id: string;
  pw: string;
}

export type SearchResults = {
  [key: string]: string[];
} | null;
