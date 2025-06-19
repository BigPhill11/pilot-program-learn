
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  analogy?: string;
  real_world_example?: string;
  category: string;
  difficulty_level: string;
}

export const useFinancialTerms = () => {
  const [terms, setTerms] = useState<FinancialTerm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const { data, error } = await supabase
          .from('financial_terms_database')
          .select('id, term, definition, analogy, real_world_example, category, difficulty_level')
          .eq('status', 'active')
          .order('term');

        if (error) throw error;
        setTerms(data || []);
      } catch (error) {
        console.error('Error fetching financial terms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return { terms, loading };
};
