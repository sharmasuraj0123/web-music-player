import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Music2, X } from 'lucide-react';

interface SidebarProps {
  currentView: 'home' | 'search' | 'library';
  onViewChange: (view: 'home' | 'search' | 'library') => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-64 bg-black p-6 
        transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="flex items-center justify-between gap-2 mb-8">
          <div className="flex items-center gap-2">
            <Music2 className="w-8 h-8" />
            <span className="text-xl font-bold">Spotify Clone</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-full md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-6">
          <div className="space-y-3">
            <button
              onClick={() => {
                onViewChange('home');
                onClose();
              }}
              className={`flex items-center gap-3 text-sm font-semibold w-full text-left ${
                currentView === 'home' ? 'text-white' : 'text-zinc-400 hover:text-white'
              } transition-colors`}
            >
              <Home className="w-6 h-6" />
              Home
            </button>
            <button
              onClick={() => {
                onViewChange('search');
                onClose();
              }}
              className={`flex items-center gap-3 text-sm font-semibold w-full text-left ${
                currentView === 'search' ? 'text-white' : 'text-zinc-400 hover:text-white'
              } transition-colors`}
            >
              <Search className="w-6 h-6" />
              Search
            </button>
            <button
              onClick={() => {
                onViewChange('library');
                onClose();
              }}
              className={`flex items-center gap-3 text-sm font-semibold w-full text-left ${
                currentView === 'library' ? 'text-white' : 'text-zinc-400 hover:text-white'
              } transition-colors`}
            >
              <Library className="w-6 h-6" />
              Your Library
            </button>
          </div>

          <div className="space-y-3">
            <button className="flex items-center gap-3 text-sm font-semibold text-zinc-400 hover:text-white transition-colors w-full text-left">
              <PlusSquare className="w-6 h-6" />
              Create Playlist
            </button>
            <button className="flex items-center gap-3 text-sm font-semibold text-zinc-400 hover:text-white transition-colors w-full text-left">
              <Heart className="w-6 h-6" />
              Liked Songs
            </button>
          </div>

          <div className="pt-6 border-t border-zinc-800 space-y-3 text-sm text-zinc-400">
            {Array.from({ length: 10 }).map((_, i) => (
              <button key={i} className="block hover:text-white transition-colors w-full text-left truncate">
                My Playlist #{i + 1}
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;