import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { Song } from '../types';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentSong: Song;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, setIsPlaying, currentSong }) => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 w-[30%] min-w-0">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-12 h-12 md:w-14 md:h-14 rounded flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold truncate">{currentSong.title}</h4>
            <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center max-w-[45%] w-full">
          <div className="flex items-center gap-3 md:gap-6">
            <button className="text-zinc-200 hover:text-white transition-colors hidden sm:block">
              <Shuffle className="w-4 h-4" />
            </button>
            <button className="text-zinc-200 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button className="text-zinc-200 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-zinc-200 hover:text-white transition-colors hidden sm:block">
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full mt-2 hidden sm:flex">
            <span className="text-xs text-zinc-400">2:14</span>
            <div className="flex-1 h-1 rounded-full bg-zinc-600">
              <div className="w-[30%] h-full rounded-full bg-white"></div>
            </div>
            <span className="text-xs text-zinc-400">{currentSong.duration}</span>
          </div>
        </div>

        <div className="items-center gap-4 w-[30%] justify-end hidden md:flex">
          <Volume2 className="w-5 h-5" />
          <div className="w-24 h-1 rounded-full bg-zinc-600">
            <div className="w-[80%] h-full rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;