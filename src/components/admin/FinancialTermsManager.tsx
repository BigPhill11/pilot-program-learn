
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, Plus, Search, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface FinancialTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  difficulty_level: string;
  analogy?: string;
  real_world_example?: string;
  example_usage?: string;
  source?: string;
  status: string;
  created_at: string;
}

const FinancialTermsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [isAddingTerm, setIsAddingTerm] = useState(false);
  
  const [newTerm, setNewTerm] = useState({
    term: '',
    definition: '',
    category: 'general',
    difficulty_level: 'beginner',
    analogy: '',
    real_world_example: '',
    example_usage: '',
    source: ''
  });

  // Fetch financial terms
  const { data: terms, isLoading } = useQuery({
    queryKey: ['financial-terms', searchTerm, filterCategory, filterDifficulty],
    queryFn: async () => {
      let query = supabase
        .from('financial_terms_database')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('term', `%${searchTerm}%`);
      }
      
      if (filterCategory !== 'all') {
        query = query.eq('category', filterCategory);
      }
      
      if (filterDifficulty !== 'all') {
        query = query.eq('difficulty_level', filterDifficulty);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as FinancialTerm[];
    }
  });

  // Add single term mutation
  const addTermMutation = useMutation({
    mutationFn: async (termData: typeof newTerm) => {
      const { data, error } = await supabase
        .from('financial_terms_database')
        .insert([termData])
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-terms'] });
      setNewTerm({
        term: '',
        definition: '',
        category: 'general',
        difficulty_level: 'beginner',
        analogy: '',
        real_world_example: '',
        example_usage: '',
        source: ''
      });
      setIsAddingTerm(false);
      toast({
        title: "Success",
        description: "Financial term added successfully!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add financial term: " + error.message,
        variant: "destructive"
      });
    }
  });

  // CSV upload mutation
  const uploadCSVMutation = useMutation({
    mutationFn: async (csvData: any[]) => {
      const { data, error } = await supabase.rpc('bulk_insert_financial_terms', {
        terms_data: csvData
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['financial-terms'] });
      toast({
        title: "CSV Upload Complete",
        description: `Inserted: ${result[0]?.inserted_count || 0}, Errors: ${result[0]?.error_count || 0}`
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.replace(/["\r]/g, '').trim());
      
      const csvData = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.replace(/["\r]/g, '').trim());
          const obj: any = {};
          headers.forEach((header, index) => {
            if (values[index]) {
              obj[header] = values[index];
            }
          });
          return obj;
        });

      uploadCSVMutation.mutate(csvData);
    };
    reader.readAsText(file);
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      ['term', 'definition', 'category', 'difficulty_level', 'analogy', 'real_world_example', 'example_usage', 'source'],
      ['Stock', 'A share of ownership in a company', 'investments', 'beginner', 'Like owning a slice of pizza from the whole pizza', 'Buying Apple stock means you own a tiny piece of Apple company', 'I bought 10 stocks of Microsoft', 'Investopedia'],
      ['Dividend', 'A payment made by companies to shareholders', 'investments', 'beginner', 'Like getting an allowance from a company', 'Coca-Cola pays shareholders $1.68 per share annually', 'The dividend yield is 3.2%', 'SEC.gov']
    ];
    
    const csvContent = sampleData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial_terms_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Terms Database</h1>
        <p className="text-muted-foreground">Manage financial terms, definitions, and examples</p>
      </div>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Financial Terms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploadCSVMutation.isPending}>
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
            </Button>
            <Button variant="outline" onClick={downloadSampleCSV}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <Button variant="outline" onClick={() => setIsAddingTerm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Single Term
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
          />
          <p className="text-sm text-muted-foreground">
            CSV should include columns: term, definition, category, difficulty_level, analogy, real_world_example, example_usage, source
          </p>
        </CardContent>
      </Card>

      {/* Add Term Form */}
      {isAddingTerm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Financial Term</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Term"
                value={newTerm.term}
                onChange={(e) => setNewTerm({...newTerm, term: e.target.value})}
              />
              <Select value={newTerm.category} onValueChange={(value) => setNewTerm({...newTerm, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="investments">Investments</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="trading">Trading</SelectItem>
                  <SelectItem value="economics">Economics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Definition"
              value={newTerm.definition}
              onChange={(e) => setNewTerm({...newTerm, definition: e.target.value})}
            />
            <Textarea
              placeholder="Analogy (optional)"
              value={newTerm.analogy}
              onChange={(e) => setNewTerm({...newTerm, analogy: e.target.value})}
            />
            <Textarea
              placeholder="Real World Example (optional)"
              value={newTerm.real_world_example}
              onChange={(e) => setNewTerm({...newTerm, real_world_example: e.target.value})}
            />
            <div className="flex gap-2">
              <Button onClick={() => addTermMutation.mutate(newTerm)} disabled={addTermMutation.isPending}>
                Add Term
              </Button>
              <Button variant="outline" onClick={() => setIsAddingTerm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="investments">Investments</SelectItem>
                <SelectItem value="banking">Banking</SelectItem>
                <SelectItem value="trading">Trading</SelectItem>
                <SelectItem value="economics">Economics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Terms List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <div>Loading terms...</div>
        ) : (
          terms?.map((term) => (
            <Card key={term.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{term.term}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{term.category}</Badge>
                    <Badge variant="outline">{term.difficulty_level}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm"><strong>Definition:</strong> {term.definition}</p>
                {term.analogy && (
                  <p className="text-sm"><strong>Analogy:</strong> {term.analogy}</p>
                )}
                {term.real_world_example && (
                  <p className="text-sm"><strong>Example:</strong> {term.real_world_example}</p>
                )}
                {term.source && (
                  <p className="text-xs text-muted-foreground"><strong>Source:</strong> {term.source}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FinancialTermsManager;
