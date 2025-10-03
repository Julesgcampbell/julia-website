import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FullScreenPhotoViewer from '../components/FullScreenPhotoViewer';
import LazyImage from '../components/LazyImage';

const PhotoCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [fullScreenViewer, setFullScreenViewer] = useState({
    isOpen: false,
    currentIndex: 0
  });

  return (
    <div className="pt-20 pb-20 min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-stone-800 mb-4">{category}</h1>
        </div>
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-stone-600 mb-2">Category photos loading...</h3>
        </div>
      </div>

      <FullScreenPhotoViewer
        photos={[]}
        currentIndex={fullScreenViewer.currentIndex}
        isOpen={fullScreenViewer.isOpen}
        onClose={() => setFullScreenViewer({ isOpen: false, currentIndex: 0 })}
        onNavigate={() => {}}
      />
    </div>
  );
};

export default PhotoCategoryPage;