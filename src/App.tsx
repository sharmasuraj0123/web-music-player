import React, { useState, useEffect } from 'react';
import { Heart, Clock3, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Search from './components/Search';
import Library from './components/Library';
import AddSong from './components/AddSong';
import { Song } from './types';
import { albums, songs as initialSongs } from './data/songs';
import { shuffleArray } from './utils';
import { MESSAGES } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'library' | 'addSong'>('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);
  const [playbackQueue, setPlaybackQueue] = useState<Song[]>(songs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song>(playbackQueue[0]);

  useEffect(() => {
    setCurrentSong(playbackQueue[currentIndex]);
  }, [currentIndex, playbackQueue]);

  useEffect(() => {
    let newQueue: Song[];
    if (isShuffle) {
      newQueue = shuffleArray(songs);
    } else {
      newQueue = [...songs];
    }
    setPlaybackQueue(newQueue);

    const index = newQueue.findIndex((song) => song.id === currentSong.id);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
    }
  }, [isShuffle, songs]);

  const handleNextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playbackQueue.length);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? playbackQueue.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  const handlePlaySong = (song: Song) => {
    const index = playbackQueue.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      const newQueue = [...playbackQueue];
      newQueue.splice(currentIndex + 1, 0, song);
      setPlaybackQueue(newQueue);
      setCurrentIndex(currentIndex + 1);
    }
    setIsPlaying(true);
  };

  const handleAddSong = (newSong: Song) => {
    const updatedSongs = [...songs, newSong];
    setSongs(updatedSongs);
    setCurrentView('library');
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'search':
        return <Search onPlaySong={handlePlaySong} songsList={songs} />;
      case 'library':
        return <Library songsList={songs} onPlaySong={handlePlaySong} />;
      case 'addSong':
        return <AddSong onAddSong={handleAddSong} />;
      default:
        return (
          <main className="flex-1 overflow-y-auto bg-gradient-to-b p-4 md:p-8">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-zinc-800 rounded-full md:hidden"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {MESSAGES.GOOD_EVENING}
                </h1>
              </div>
              <button className="hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="bg-zinc-800/50 hover:bg-zinc-800 transition-colors group rounded-lg flex items-center overflow-hidden cursor-pointer"
                >
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-[4rem] h-[4rem] md:w-[4.5rem] md:h-[4.5rem] object-cover"
                  />
                  <div className="px-3 md:px-4 truncate">
                    <h3 className="font-semibold truncate">{album.title}</h3>
                    <p className="text-sm text-zinc-400 truncate">{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              {MESSAGES.RECENTLY_PLAYED}
            </h2>
            <div className="bg-zinc-900/90 rounded-lg overflow-hidden">
              <div className="px-4 md:px-6 py-3 md:py-4 flex items-center text-sm text-zinc-400 border-b border-zinc-800">
                <span className="w-8">#</span>
                <span className="flex-1 md:w-[45%] md:flex-none">Title</span>
                <span className="hidden md:block md:w-[30%]">Album</span>
                <span className="w-[4.5rem] flex justify-end"><Clock3 className="w-4 h-4" /></span>
              </div>
              {songs.map((song, i) => (
                <div
                  key={song.id}
                  onClick={() => handlePlaySong(song)}
                  className="px-4 md:px-6 py-2 md:py-3 flex items-center hover:bg-zinc-800/50 group transition-colors cursor-pointer"
                >
                  <span className="w-8 text-sm text-zinc-400">{i + 1}</span>
                  <div className="flex-1 md:w-[45%] md:flex-none flex items-center gap-3 min-w-0">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-10 h-10 rounded flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-white truncate">{song.title}</p>
                      <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                    </div>
                  </div>
                  <span className="hidden md:block md:w-[30%] text-sm text-zinc-400 truncate">{song.album}</span>
                  <span className="w-[4.5rem] text-sm text-zinc-400 text-right">{song.duration}</span>
                </div>
              ))}
            </div>
          </main>
        );
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {renderMainContent()}
      </div>

      {currentView !== 'addSong' && (
        <MusicPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          onNextSong={handleNextSong}
          onPrevSong={handlePrevSong}
          isShuffle={isShuffle}
          setIsShuffle={setIsShuffle}
        />
      )}
    </div>
  );
}

export default App;