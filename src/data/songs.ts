import { Song, Album } from '../types';

export const albums: Album[] = [
  {
    id: 'a1',
    title: 'Midnight Memories',
    artist: 'The Night Collective',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
    year: '2023'
  },
  {
    id: 'a2',
    title: 'Ocean Waves',
    artist: 'Coastal Dreams',
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop',
    year: '2023'
  },
  {
    id: 'a3',
    title: 'Urban Jungle',
    artist: 'City Lights',
    cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop',
    year: '2023'
  },
  {
    id: 'a4',
    title: 'Desert Wind',
    artist: 'Sand Stories',
    cover: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=400&fit=crop',
    year: '2023'
  },
  {
    id: 'a5',
    title: 'Mountain Echo',
    artist: 'Peak Performance',
    cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
    year: '2023'
  },
  {
    id: 'a6',
    title: 'Forest Tales',
    artist: 'Woodland Whispers',
    cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    year: '2023'
  }
];

export const songs: Song[] = [
  {
    id: 's1',
    title: 'Midnight Dreams',
    artist: 'The Night Collective',
    album: 'Midnight Memories',
    albumId: 'a1',
    duration: '3:45',
    cover: albums[0].cover,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 's2',
    title: 'Waves of Change',
    artist: 'Coastal Dreams',
    album: 'Ocean Waves',
    albumId: 'a2',
    duration: '4:12',
    cover: albums[1].cover,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 's3',
    title: 'City Lights',
    artist: 'City Lights',
    album: 'Urban Jungle',
    albumId: 'a3',
    duration: '3:56',
    cover: albums[2].cover,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 's4',
    title: 'Desert Storm',
    artist: 'Sand Stories',
    album: 'Desert Wind',
    albumId: 'a4',
    duration: '4:30',
    cover: albums[3].cover,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: 's5',
    title: 'Mountain High',
    artist: 'Peak Performance',
    album: 'Mountain Echo',
    albumId: 'a5',
    duration: '3:22',
    cover: albums[4].cover,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: 's6',
    title: 'Forest Dreams',
    artist: 'Woodland Whispers',
    album: 'Forest Tales',
    albumId: 'a6',
    duration: '4:15',
    cover: albums[5].cover,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  }
];