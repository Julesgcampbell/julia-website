import React, { useState, useEffect, createContext, useContext } from 'react';
import { db } from '../lib/supabase';

interface PreloadContextType {
  isPreloading: boolean;
  preloadProgress: number;
  preloadedImages: Set<string>;
  preloadImage: (url: string) => Promise<void>;
}

const PreloadContext = createContext<PreloadContextType | undefined>(undefined);

export const usePreloader = () => {
  const context = useContext(PreloadContext);
  if (!context) {
    throw new Error('usePreloader must be used within a PreloadProvider');
  }
  return context;
};

interface PreloadProviderProps {
  children: React.ReactNode;
}

export const PreloadProvider: React.FC<PreloadProviderProps> = ({ children }) => {
  const [isPreloading, setIsPreloading] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  const preloadImage = async (url: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, url]));
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        resolve(); // Don't reject, just continue
      };
      img.src = url;
    });
  };

  const preloadAllImages = async () => {
    try {
      console.log('🚀 Starting image preloading...');
      
      // Get all photos from database
      const { data: photos, error } = await db.getPhotos();
      if (error) {
        console.error('Error loading photos for preloading:', error);
        setIsPreloading(false);
        return;
      }

      if (!photos || photos.length === 0) {
        console.log('No photos to preload');
        setIsPreloading(false);
        return;
      }

      console.log(`📸 Preloading ${photos.length} photos...`);
      
      // Get all unique image URLs
      const imageUrls = Array.from(new Set(photos.map(photo => photo.image_url)));
      
      // Preload images in batches for better performance
      const batchSize = 10;
      let loadedCount = 0;

      for (let i = 0; i < imageUrls.length; i += batchSize) {
        const batch = imageUrls.slice(i, i + batchSize);
        
        // Preload batch in parallel
        await Promise.allSettled(
          batch.map(url => preloadImage(url))
        );
        
        loadedCount += batch.length;
        const progress = Math.round((loadedCount / imageUrls.length) * 100);
        setPreloadProgress(progress);
        
        console.log(`📊 Preload progress: ${progress}% (${loadedCount}/${imageUrls.length})`);
        
        // Small delay between batches to prevent overwhelming the browser
        if (i + batchSize < imageUrls.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      console.log('✅ All images preloaded successfully!');
      
    } catch (error) {
      console.error('Error during image preloading:', error);
    } finally {
      setIsPreloading(false);
    }
  };

  useEffect(() => {
    // Start preloading immediately when the provider mounts
    preloadAllImages();
  }, []);

  const value: PreloadContextType = {
    isPreloading,
    preloadProgress,
    preloadedImages,
    preloadImage
  };

  return (
    <PreloadContext.Provider value={value}>
      {children}
    </PreloadContext.Provider>
  );
};

// Loading screen component
export const PreloadScreen: React.FC = () => {
  const { isPreloading, preloadProgress } = usePreloader();

  if (!isPreloading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-stone-800 mb-2">JULIA CAMPBELL</h1>
          <p className="text-lg text-stone-600">Creative Portfolio</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${preloadProgress}%` }}
            />
          </div>
          <p className="text-sm text-stone-600 mt-2">
            Loading portfolio images... {preloadProgress}%
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                ...
                require('../../../docs/optional-imports.txt').optionalImports.split(',').map(imp => imp.trim())
              }}
            />
          ))}
        </div>

        {/* Loading Message */}
        <p className="text-sm text-stone-500 mt-4">
          Preparing your visual experience...
        </p>
      </div>
    </div>
  );
};