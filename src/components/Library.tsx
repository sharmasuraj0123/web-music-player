import React, { useState } from 'react';
import { Plus, Search as SearchIcon, List } from 'lucide-react';
import { Playlist } from '../types';

const mockPlaylists: Playlist[] = Array.from({ length: 12 }, (_, i) => ({
  id: `pl${i}`,
  name: `My Playlist #${i + 1}`,
  cover: `https://images.unsplash.com/photo-${1640000000000 + i}?w=300&h=300&fit=crop`,
  songCount: Math.floor(Math.random() * 100) + 10
}));

const Library = () => {
  const [filter, setFilter] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredPlaylists = mockPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Your Library</h1>
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
          placeholder="Search in Your Library"
          className="w-full px-4 py-2 bg-zinc-800 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      <div className={view === 'grid' 
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        : "space-y-2"
      }>
        {filteredPlaylists.map(playlist => (
          view === 'grid' ? (
            <div key={playlist.id} className="p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors cursor-pointer">
              <img src={playlist.cover} alt={playlist.name} className="w-full aspect-square rounded-lg object-cover mb-4" />
              <p className="font-medium truncate">{playlist.name}</p>
              <p className="text-sm text-zinc-400">Playlist • {playlist.songCount} songs</p>
            </div>
          ) : (
            <div key={playlist.id} className="flex items-center p-2 hover:bg-zinc-800 rounded-md group cursor-pointer">
              <img src={playlist.cover} alt={playlist.name} className="w-12 h-12 rounded" />
              <div className="ml-3 md:ml-4 min-w-0">
                <p className="font-medium truncate">{playlist.name}</p>
                <p className="text-sm text-zinc-400 truncate">Playlist • {playlist.songCount} songs</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Library;