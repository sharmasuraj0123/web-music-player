import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Music2, X } from 'lucide-react';
import { APP_TITLE, NAVIGATION_LABELS } from '../constants';

interface SidebarProps {
  currentView: 'home' | 'search' | 'library' | 'addSong';
  onViewChange: (view: 'home' | 'search' | 'library' | 'addSong') => void;
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
        fixed md:static inset-y-0 left-0 w-64 bg-bg-primary p-6 
        transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="flex items-center justify-between gap-2 mb-8">
          <div className="flex items-center gap-2">
            <Music2 className="w-8 h-8" />
            <span className="text-xl font-bold">{APP_TITLE}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-border rounded-full md:hidden"
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
                currentView === 'home' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              } transition-colors`}
            >
              <Home className="w-6 h-6" />
              {NAVIGATION_LABELS.HOME}
            </button>
            <button
              onClick={() => {
                onViewChange('search');
                onClose();
              }}
              className={`flex items-center gap-3 text-sm font-semibold w-full text-left ${
                currentView === 'search' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              } transition-colors`}
            >
              <Search className="w-6 h-6" />
              {NAVIGATION_LABELS.SEARCH}
            </button>
            <button
              onClick={() => {
                onViewChange('library');
                onClose();
              }}
              className={`flex items-center gap-3 text-sm font-semibold w-full text-left ${
                currentView === 'library' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              } transition-colors`}
            >
              <Library className="w-6 h-6" />
              {NAVIGATION_LABELS.LIBRARY}
            </button>
            <button
              onClick={() => {
                onViewChange('addSong');
                onClose();
              }}
              className={`flex items-center gap-3 text-sm font-semibold w-full text-left ${
                currentView === 'addSong' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              } transition-colors`}
            >
              <PlusSquare className="w-6 h-6" />
              {NAVIGATION_LABELS.ADD_SONG}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;