// Browser-compatible Cloudinary photo service
// Uses Cloudinary URL-based API instead of Node.js SDK

class CloudinaryPhotoService {
  constructor() {
    this.cloudName = 'dm1cqbdc7';
    this.baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`;
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get all photos from Cloudinary
   * Loads from photo-storage.json which contains the database data
   */
  async getAllPhotos() {
    const cacheKey = 'all-photos';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      console.log('🔄 Loading photos from database...');
      
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
        // Browser environment - use fetch
        const response = await fetch('/photo-storage.json');
        if (!response.ok) {
          throw new Error(`Failed to load photos: ${response.status}`);
        }
        
        const photoData = await response.json();
        console.log('✅ Photos loaded:', photoData.length);
        
        // Cache the data
        this.setCachedData(cacheKey, photoData);
        
        return photoData;
      } else {
        throw new Error('Browser environment required');
      }
    } catch (error) {
      console.error('❌ Failed to load photos:', error);
      return [];
    }
  }

  /**
   * Get photos by category
   */
  async getPhotosByCategory(categorySlug) {
    const allPhotos = await this.getAllPhotos();
    return allPhotos.filter(photo => photo.category_slug === categorySlug);
  }

  /**
   * Get featured photos only
   */
  async getFeaturedPhotos() {
    const allPhotos = await this.getAllPhotos();
    return allPhotos.filter(photo => photo.is_featured === true);
  }

  /**
   * Generate optimized URL for different sizes
   */
  getOptimizedUrl(publicId, options = {}) {
    const defaults = {
      quality: 'auto',
      format: 'auto',
      fetch_format: 'auto'
    };
    
    const transformations = { ...defaults, ...options };
    const params = Object.entries(transformations)
      .map(([key, value]) => `${key}_${value}`)
      .join(',');
    
    return `${this.baseUrl}/${params}/${publicId}`;
  }

  /**
   * Cache management
   */
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }
    if (cached) {
      this.cache.delete(key);
    }
    return null;
  }

  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }
}

export default CloudinaryPhotoService;