import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Camera, Eye } from 'lucide-react';
import { useCloudinaryCategoryPhotos } from '../hooks/useCloudinaryPhotos';
import LazyImage from '../components/LazyImage';

const PhotoCategory: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { photos, loading } = useCloudinaryCategoryPhotos(categorySlug || '');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categoryName = photos.length > 0 ? photos[0].category : categorySlug;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Top section with light background for navbar compatibility */}
      <div className="h-32 bg-gradient-to-b from-white/20 via-white/10 to-transparent backdrop-blur-sm"></div>
      
      <div className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <a href="/photo" className="inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Photography</span>
            </a>
            
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mb-2 tracking-wide">
                  {categoryName}
                </h1>
                <div className="absolute -top-2 -left-4 text-sm opacity-20 text-rose-300 flower-symbol flower-float" style={{animationDelay: '1.2s'}}>✿</div>
                <div className="absolute -top-2 -right-4 text-sm opacity-20 text-rose-300 flower-symbol flower-float" style={{animationDelay: '2.1s'}}>✿</div>
                <div className="absolute -bottom-2 -left-4 text-sm opacity-20 text-rose-300 flower-symbol flower-float" style={{animationDelay: '0.8s'}}>✿</div>
                <div className="absolute -bottom-2 -right-4 text-sm opacity-20 text-rose-300 flower-symbol flower-float" style={{animationDelay: '1.5s'}}>✿</div>
              </div>
              <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
                A curated collection of {categoryName.toLowerCase()} photography
              </p>
            </div>
          </div>

          {/* Photo Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-400"></div>
              <p className="text-stone-600 mt-4">Loading photos...</p>
            </div>
          ) : photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.map((photo) => {
                const optimizedUrl = photo.optimized_urls?.medium || photo.image_url;
                const placeholderUrl = photo.optimized_urls?.placeholder;
                
                return (
                  <div
                    key={photo.id}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer elegant-hover"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <LazyImage
                      src={optimizedUrl}
                      alt={photo.title}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      placeholder={placeholderUrl}
                      loading="lazy"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                          <p className="text-white font-medium text-lg mb-1">{photo.title}</p>
                          <p className="text-white/80 text-sm">{photo.category}</p>
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-stone-800 px-3 py-1 rounded-full text-sm font-medium">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-stone-400 mx-auto mb-4" />
              <p className="text-stone-600 text-lg">No photos available for this category</p>
              <p className="text-stone-500">Check back later for new additions!</p>
            </div>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors z-10"
            >
              ✕
            </button>
            
            <img
              src={selectedPhoto.optimized_urls?.large || selectedPhoto.image_url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h3 className="text-white text-xl font-medium mb-1">{selectedPhoto.title}</h3>
                <p className="text-white/80">{selectedPhoto.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCategory;