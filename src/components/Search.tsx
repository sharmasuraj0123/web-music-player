import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { SearchResults, Song } from '../types';
import { songs } from '../data/songs';

interface SearchProps {
  onPlaySong: (song: Song) => void;
}

const mockSearchResults: SearchResults = {
  songs: songs.slice(0, 5),
  playlists: Array.from({ length: 4 }, (_, i) => ({
    id: `p${i}`,
    name: `Discovered Playlist ${i + 1}`,
    cover: `https://images.unsplash.com/photo-${1620000000000 + i}?w=300&h=300&fit=crop`,
    songCount: Math.floor(Math.random() * 100) + 20
  })),
  artists: Array.from({ length: 6 }, (_, i) => ({
    id: `a${i}`,
    name: `Artist ${i + 1}`,
    image: `https://images.unsplash.com/photo-${1630000000000 + i}?w=300&h=300&fit=crop`,
    followers: `${Math.floor(Math.random() * 1000)}K`
  }))
};

const Search: React.FC<SearchProps> = ({ onPlaySong }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      setTimeout(() => setResults(mockSearchResults), 300);
    } else {
      setResults(null);
    }
  };

  return (
    <div className="p-4 md:p-6 overflow-y-auto">
      <div className="relative mb-6 md:mb-8">
        <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="What do you want to listen to?"
          className="w-full pl-12 pr-4 py-3 bg-zinc-800 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {results && (
        <div className="space-y-6 md:space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Songs</h2>
            <div className="grid gap-2 md:gap-4">
              {results.songs.map(song => (
                <div
                  key={song.id}
                  onClick={() => onPlaySong(song)}
                  className="flex items-center p-2 hover:bg-zinc-800 rounded-md group cursor-pointer"
                >
                  <img src={song.cover} alt={song.title} className="w-12 h-12 rounded" />
                  <div className="ml-3 md:ml-4 flex-1 min-w-0">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                  </div>
                  <span className="text-sm text-zinc-400 ml-2">{song.duration}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Artists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {results.artists.map(artist => (
                <div key={artist.id} className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors group cursor-pointer">
                  <img src={artist.image} alt={artist.name} className="w-full aspect-square rounded-full object-cover mb-4" />
                  <p className="font-medium truncate">{artist.name}</p>
                  <p className="text-sm text-zinc-400 truncate">Artist • {artist.followers} followers</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.playlists.map(playlist => (
                <div key={playlist.id} className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors cursor-pointer">
                  <img src={playlist.cover} alt={playlist.name} className="w-full aspect-square rounded-lg object-cover mb-4" />
                  <p className="font-medium truncate">{playlist.name}</p>
                  <p className="text-sm text-zinc-400">{playlist.songCount} songs</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Search;