import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Service } from '../types';

export function useServices(category?: 'professionals' | 'individuals') {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        let query = supabase.from('services').select('*');
        
        if (category) {
          query = query.eq('category', category);
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [category]);

  return { services, loading, error };
}