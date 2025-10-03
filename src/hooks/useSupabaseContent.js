import { useState, useEffect } from 'react';
import SupabaseService from '../lib/supabaseService.js';

export const useSupabaseContent = () => {
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supabaseService] = useState(() => new SupabaseService());

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const content = await supabaseService.getSiteContent();
        setSiteContent(content);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load site content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [supabaseService]);

  return {
    siteContent,
    loading,
    error,
    reload: async () => {
      try {
        setLoading(true);
        setError(null);
        const content = await supabaseService.getSiteContent();
        setSiteContent(content);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };
};

export default useSupabaseContent;