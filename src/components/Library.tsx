import React, { useState } from 'react';
import { Plus, Search as SearchIcon, List } from 'lucide-react';
import { Playlist } from '../types';
import { MESSAGES } from '../constants';

const mockPlaylists: Playlist[] = Array.from({ length: 12 }, (_, i) => ({
  id: `pl${i}`,
  name: `My Playlist #${i + 1}`,
  cover: `https://images.unsplash.com/photo-${1640000000000 + i}?w=300&h=300&fit=crop`,
  songCount: Math.floor(Math.random() * 100) + 10
}));

interface LibraryProps {
  songsList: Song[];
  onPlaySong: (song: Song) => void;
}

const Library: React.FC<LibraryProps> = ({ songsList, onPlaySong }) => {
  const [filter, setFilter] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredSongs = songsList.filter(song =>
    song.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold">{MESSAGES.YOUR_LIBRARY}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            className="p-2 hover:bg-zinc-800 rounded-full"
          >
            <List className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-zinc-800 rounded-full">
            <SearchIcon className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-zinc-800 rounded-full">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4 md:mb-6">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={MESSAGES.SEARCH_PLACEHOLDER}
          className="w-full px-4 py-2 bg-border rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-text-primary"
        />
      </div>

      <div className={view === 'grid' 
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        : "space-y-2"
      }>
        {filteredSongs.map(song => (
          view === 'grid' ? (
            <div
              key={song.id}
              className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors cursor-pointer"
              onClick={() => onPlaySong(song)}
            >
              <img src={song.cover} alt={song.title} className="w-full aspect-square rounded-lg object-cover mb-4" />
              <p className="font-medium truncate">{song.title}</p>
              <p className="text-sm text-zinc-400">{song.artist}</p>
            </div>
          ) : (
            <div
              key={song.id}
              className="flex items-center p-2 hover:bg-zinc-800 rounded-md group cursor-pointer"
              onClick={() => onPlaySong(song)}
            >
              <img src={song.cover} alt={song.title} className="w-12 h-12 rounded" />
              <div className="ml-3 md:ml-4 min-w-0">
                <p className="font-medium truncate">{song.title}</p>
                <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Library;