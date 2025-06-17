
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const useHeadlines = (userLevel: string = 'beginner') => {
  const fetchHeadlines = async () => {
    console.log('Fetching headlines...');
    const { data, error } = await supabase.functions.invoke('market-headlines', {
      body: { userLevel }
    });
    if (error) {
      console.error('Headlines fetch error:', error);
      throw new Error(error.message);
    }
    console.log('Headlines data received:', data);
    return data || { headlines: [], marketRecap: null };
  };

  return useQuery({
    queryKey: ['marketHeadlines', userLevel],
    queryFn: fetchHeadlines,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - refresh once daily
    refetchInterval: 1000 * 60 * 60 * 24 * 14, // 14 days - refresh every 2 weeks
  });
};

export default useHeadlines;
