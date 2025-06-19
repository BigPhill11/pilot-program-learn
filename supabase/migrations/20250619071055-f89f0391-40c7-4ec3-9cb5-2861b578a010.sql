
-- Create a table for financial terms
CREATE TABLE public.financial_terms_database (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  difficulty_level TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  analogy TEXT,
  real_world_example TEXT,
  example_usage TEXT,
  related_terms TEXT[],
  source TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending_review'))
);

-- Create indexes for better performance
CREATE INDEX idx_financial_terms_term ON public.financial_terms_database(term);
CREATE INDEX idx_financial_terms_category ON public.financial_terms_database(category);
CREATE INDEX idx_financial_terms_difficulty ON public.financial_terms_database(difficulty_level);
CREATE INDEX idx_financial_terms_status ON public.financial_terms_database(status);

-- Enable Row Level Security
ALTER TABLE public.financial_terms_database ENABLE ROW LEVEL SECURITY;

-- Create policies for financial terms
CREATE POLICY "Anyone can view active financial terms" 
  ON public.financial_terms_database 
  FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Authenticated users can insert financial terms" 
  ON public.financial_terms_database 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own financial terms" 
  ON public.financial_terms_database 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = created_by);

-- Create a function to bulk insert financial terms from CSV data
CREATE OR REPLACE FUNCTION public.bulk_insert_financial_terms(terms_data JSONB)
RETURNS TABLE(inserted_count INTEGER, error_count INTEGER, errors TEXT[])
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  term_record JSONB;
  inserted_count INTEGER := 0;
  error_count INTEGER := 0;
  errors TEXT[] := '{}';
  error_msg TEXT;
BEGIN
  FOR term_record IN SELECT * FROM jsonb_array_elements(terms_data)
  LOOP
    BEGIN
      INSERT INTO public.financial_terms_database (
        term, 
        definition, 
        category, 
        difficulty_level, 
        analogy, 
        real_world_example, 
        example_usage,
        source,
        created_by
      ) VALUES (
        term_record->>'term',
        term_record->>'definition',
        COALESCE(term_record->>'category', 'general'),
        COALESCE(term_record->>'difficulty_level', 'beginner'),
        term_record->>'analogy',
        term_record->>'real_world_example',
        term_record->>'example_usage',
        term_record->>'source',
        auth.uid()
      );
      inserted_count := inserted_count + 1;
    EXCEPTION WHEN OTHERS THEN
      error_count := error_count + 1;
      error_msg := SQLERRM || ' - Term: ' || COALESCE(term_record->>'term', 'Unknown');
      errors := array_append(errors, error_msg);
    END;
  END LOOP;
  
  RETURN QUERY SELECT inserted_count, error_count, errors;
END;
$$;
