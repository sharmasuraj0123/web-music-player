import React, { useState } from 'react';
import { Song } from '../types';
import { 
  Music, 
  User, 
  Album, 
  Clock3, 
  ImageIcon, 
  Link, 
  PlusCircle, 
  Upload, 
  Globe 
} from 'lucide-react';
import { BUTTON_LABELS, MESSAGES } from '../constants';

interface AddSongProps {
  onAddSong: (song: Song) => void;
}

const AddSong: React.FC<AddSongProps> = ({ onAddSong }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [duration, setDuration] = useState('');
  const [coverOption, setCoverOption] = useState<'url' | 'upload'>('url');
  const [cover, setCover] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let coverImage = cover;
    if (coverOption === 'upload' && coverFile) {
      coverImage = URL.createObjectURL(coverFile);
    }

    const newSong: Song = {
      id: `s${Date.now()}`,
      title,
      artist,
      album,
      albumId: '',
      duration,
      cover: coverImage,
      audioUrl,
    };
    onAddSong(newSong);

    // Reset form fields
    setTitle('');
    setArtist('');
    setAlbum('');
    setDuration('');
    setCover('');
    setCoverFile(null);
    setAudioUrl('');
    setCoverOption('url');
  };

  return (
    <div className="p-4 md:p-6 h-screen w-full overflow-auto">
      <div className="bg-zinc-800/70 p-6 pb-10 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <PlusCircle className="w-7 h-7 text-green-500" />
          {MESSAGES.ADD_NEW_SONG}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <div className="relative">
              <Music className="absolute left-3 top-3 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-md border border-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                placeholder="Song Title"
                required
              />
            </div>
          </div>

          {/* Artist */}
          <div>
            <label className="block text-sm font-medium mb-2">Artist</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-md border border-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                placeholder="Artist Name"
                required
              />
            </div>
          </div>

          {/* Album */}
          <div>
            <label className="block text-sm font-medium mb-2">Album</label>
            <div className="relative">
              <Album className="absolute left-3 top-3 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-md border border-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                placeholder="Album Name"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <div className="relative">
              <Clock3 className="absolute left-3 top-3 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-md border border-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 3:45"
                required
              />
            </div>
          </div>

          {/* Cover Image Option */}
          <div>
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setCoverOption('url')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  coverOption === 'url' ? 'bg-green-600 text-white' : 'bg-zinc-700 text-zinc-300'
                }`}
              >
                <Globe className="w-5 h-5" />
                URL
              </button>
              <button
                type="button"
                onClick={() => setCoverOption('upload')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  coverOption === 'upload' ? 'bg-green-600 text-white' : 'bg-zinc-700 text-zinc-300'
                }`}
              >
                <Upload className="w-5 h-5" />
                Upload
              </button>
            </div>

            {coverOption === 'url' && (
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-md border border-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  placeholder="Cover Image URL"
                  required={coverOption === 'url'}
                />
              </div>
            )}

            {coverOption === 'upload' && (
              <div className="relative">
                <Upload className="absolute left-3 top-3 text-zinc-400 w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-md text-zinc-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  required={coverOption === 'upload'}
                />
              </div>
            )}
          </div>

          {/* Audio URL */}
          <div>
            <label className="block text-sm font-medium mb-2">Audio URL</label>
            <div className="relative">
              <Link className="absolute left-3 top-3 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-md border border-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
                placeholder="Audio File URL"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition-colors"
          >
            {BUTTON_LABELS.ADD_SONG}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSong; 