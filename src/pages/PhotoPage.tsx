import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Sparkles } from 'lucide-react';
import { useCloudinaryCategories } from '../hooks/useCloudinaryPhotos';

const PhotoPage: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { categories, loading: categoriesLoading } = useCloudinaryCategories();

  useEffect(() => {
    set_imagesLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Creative animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-200/40 to-rose-300/40 rounded-full blur-lg animate-bounce" style={{animationDuration: '3s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-60 right-1/3 w-20 h-20 bg-gradient-to-br from-pink-300/30 to-rose-200/30 rounded-full blur-md animate-bounce" style={{animationDuration: '4s', animationDelay: '2s'}}></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #f472b6 2px, transparent 2px),
                         radia_gradient(circle at 75% 75%, #ec4899 2px, transparent 2px)`,
        backgroundSize: '60px 60px'
      }}></div>
      
      {/* Top section with glass effect for navbar */}
      <div className="h-32 bg-gradient-to-b from-white/20 via-white/10 to-transparent backdrop-blur-sm"></div>
      
      <div className="pt-8 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mb-2 tracking-wide">Photography</h1>
            <div className="absolute -top-2 -left-4 text-sm opacity-20 text-rose-300 flower-symbol flower-float" style={{animationDelay: '1.2s'}}>✿</div>
            <div className="absolute -top-2 -right-4 text-sm opacity-20 text-rose-300 flower-symbol flower-float" style={{animationDelay: '2.1s'}}>✿</div>
            <div className="absolute -bottom-2 -left-4 text-sm opacity-20 text-rose-300 flower-symbol flower-float" style={{animationDelay: '0.8s'}}>✿</div>
            <div className="absolute -bottom-2 -right-4 text-sm opacity-20 text-rose-300 flower-symbol flower-float" style={{animationDelay: '1.5s'}}>✿</div>
          </div>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Explore my collection of photography work across different categories
          </p>
        </div>

        {/* Category Grid */}
        {categoriesLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-400"></div>
            <p className="text-stone-600 mt-4">Loading categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.filter(cat => cat.is_visible).map((category) => (
              <Link
                key={category.id}
                to={`/photo/${category.slug}`}
                className="elegant-hover category-card group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden photo-container">
                  <img
                    src={encodeURI(category.image_url)}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      console.error('Category image failed to load:', category.image_url);
                    }}
                    onLoad={() => {
                      console.log('Category image loaded successfully:', category.image_url);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl md:text-4xl font-serif font-light text-white mb-2 drop-shadow-lg tracking-wide">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                      <span className="text-sm font-light">View Gallery</span>
                      <span className="text-xs ml-2 flower-symbol">✿</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;