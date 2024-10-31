export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumId: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: string;
}

export interface Playlist {
  id: string;
  name: string;
  cover: string;
  songCount: number;
}

export interface SearchResults {
  songs: Song[];
  playlists: Playlist[];
  artists: {
    id: string;
    name: string;
    image: string;
    followers: string;
  }[];
}