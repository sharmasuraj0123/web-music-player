import React, { useRef, useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
} from 'lucide-react';
import { Song } from '../types';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentSong: Song;
  onNextSong: () => void;
  onPrevSong: () => void;
  isShuffle: boolean;
  setIsShuffle: (shuffle: boolean) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  setIsPlaying,
  currentSong,
  onNextSong,
  onPrevSong,
  isShuffle,
  setIsShuffle,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        if (isRepeat) {
          audio.currentTime = 0;
          audio.play();
        } else {
          onNextSong();
        }
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSong, isRepeat, onNextSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <footer className="bg-bg-primary border-t border-border px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between gap-2">
        {/* Current Song Info */}
        <div className="flex items-center gap-3 w-[30%] min-w-0">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-12 h-12 md:w-14 md:h-14 rounded flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-text-primary truncate">
              {currentSong.title}
            </h4>
            <p className="text-xs text-text-secondary truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center max-w-[45%] w-full">
          <div className="flex items-center gap-3 md:gap-6">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`text-text-secondary hover:text-text-primary transition-colors hidden sm:block ${
                isShuffle ? 'text-accent' : ''
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={onPrevSong}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-text-primary text-bg-primary hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onNextSong}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`text-text-secondary hover:text-text-primary transition-colors hidden sm:block ${
                isRepeat ? 'text-accent' : ''
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full mt-2 hidden sm:flex">
            <span className="text-xs text-text-secondary">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSliderChange}
              className="flex-1 h-1 rounded-full bg-zinc-600 appearance-none cursor-pointer"
            />
            <span className="text-xs text-text-secondary">
              {currentSong.duration}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="items-center gap-4 w-[30%] justify-end hidden md:flex">
          <Volume2 className="w-5 h-5 text-text-secondary" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 rounded-full bg-zinc-600 cursor-pointer"
          />
        </div>
      </div>
      <audio ref={audioRef} src={currentSong.audioUrl} />
    </footer>
  );
};

export default MusicPlayer;