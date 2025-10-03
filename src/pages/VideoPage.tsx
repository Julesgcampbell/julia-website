import React, { useState } from 'react';
import { Play, Camera, Film, Sparkles } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  video_url?: string;
  thumbnail_url?: string;
  duration?: number;
  category: string;
  created_at?: string;
}

const VideoPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'short' | 'long'>('short');
  
  const videos: Video[] = [
    {
      id: 'video-1',
      title: 'Coming Soon',
      description: 'Video content will be added here soon.',
      category: 'Short Films',
      duration: 30
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <div className="h-32 bg-gradient-to-b from-white/20 via-white/10 to-transparent backdrop-blur-sm"></div>
      
      <div className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mb-6 tracking-wide">Film & Video</h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-serif font-light">Explore my cinematic work, from short films to documentary projects</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-rose-100">
              <button className="px-6 py-3 rounded-md font-serif font-medium bg-gradient-to-r from-rose-200 to-pink-200 text-stone-800">Short Films</button>
              <button className="px-6 py-3 rounded-md font-serif font-medium text-stone-600 hover:text-stone-800">Long Form</button>
            </div>
          </div>

          <div className="text-center py-12">
            <Film className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium text-stone-600 mb-2">No videos yet</h3>
            <p className="text-stone-500 font-serif font-light">Short films coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;