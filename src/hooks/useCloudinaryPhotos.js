import { useState, useEffect, useCallback } from 'react';
import CloudinaryPhotoService from '../lib/cloudinaryPhotoService.js';

export const useCloudinaryPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoService] = useState(() => new CloudinaryPhotoService());

  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allPhotos = await photoService.getAllPhotos();
      setPhotos(allPhotos);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load photos:', err);
    } finally {
      setLoading(false);
    }
  }, [photoService]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return {
    photos,
    loading,
    error,
    reload: loadPhotos
  };
};

export const useCloudinaryFeaturedPhotos = () => {
  const { photos, loading, error, reload } = useCloudinaryPhotos();
  const featuredPhotos = photos.filter(photo => photo.is_featured === true);
  return {
    photos: featuredPhotos,
    loading,
    error,
    reload
  };
};

export const useCloudinaryCategories = () => {
  const { photos, loading, error, reload } = useCloudinaryPhotos();
  
  const categories = photos.reduce((acc, photo) => {
    const existing = acc.find(cat => cat.slug === photo.category_slug);
    if (existing) {
      existing.photo_count = (existing.photo_count || 0) + 1;
    } else {
      acc.push({
        id: photo.category_slug,
        name: photo.category,
        slug: photo.category_slug,
        image_url: photo.image_url,
        photo_count: 1,
        is_visible: true,
        is_featured: photo.category_slug === 'portrait'
      });
    }
    return acc;
  }, []);
  
  return {
    categories,
    loading,
    error,
    reload
  };
};

export default useCloudinaryPhotos;