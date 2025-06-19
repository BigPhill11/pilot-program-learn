
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CSVUploader from './CSVUploader';

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
}

const FinancialTermsManager = () => {
  const [terms, setTerms] = useState<FinancialTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingTerm, setEditingTerm] = useState<FinancialTerm | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const categories = ['all', 'general', 'stocks', 'bonds', 'investing', 'banking', 'insurance', 'real_estate', 'crypto'];
  const difficultyLevels = ['beginner', 'intermediate', 'advanced'];

  const fetchTerms = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_terms_database')
        .select('*')
        .order('term');

      if (error) throw error;
      setTerms(data || []);
    } catch (error) {
      console.error('Error fetching terms:', error);
      toast({
        title: "Error",
        description: "Failed to fetch financial terms",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('financial_terms_database')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTerms(terms.filter(term => term.id !== id));
      toast({
        title: "Success",
        description: "Term deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting term:', error);
      toast({
        title: "Error",
        description: "Failed to delete term",
        variant: "destructive"
      });
    }
  };

  const handleSave = async (termData: Partial<FinancialTerm>) => {
    try {
      if (editingTerm) {
        // Update existing term
        const { error } = await supabase
          .from('financial_terms_database')
          .update({
            ...termData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingTerm.id);

        if (error) throw error;
        
        setTerms(terms.map(term => 
          term.id === editingTerm.id ? { ...term, ...termData } as FinancialTerm : term
        ));
      } else {
        // Add new term
        const { data, error } = await supabase
          .from('financial_terms_database')
          .insert([termData])
          .select()
          .single();

        if (error) throw error;
        setTerms([...terms, data]);
      }

      setEditingTerm(null);
      setShowAddForm(false);
      toast({
        title: "Success",
        description: `Term ${editingTerm ? 'updated' : 'added'} successfully`
      });
    } catch (error) {
      console.error('Error saving term:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingTerm ? 'update' : 'add'} term`,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <CSVUploader onUploadComplete={fetchTerms} />
      
      <Card>
        <CardHeader>
          <CardTitle>Financial Terms Database</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Term
            </Button>
          </div>

          <div className="space-y-4">
            {filteredTerms.map((term) => (
              <Card key={term.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{term.term}</h3>
                        <Badge variant="outline">{term.category}</Badge>
                        <Badge variant="secondary">{term.difficulty_level}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{term.definition}</p>
                      {term.analogy && (
                        <p className="text-xs text-blue-600 mb-1"><strong>Analogy:</strong> {term.analogy}</p>
                      )}
                      {term.real_world_example && (
                        <p className="text-xs text-green-600"><strong>Example:</strong> {term.real_world_example}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingTerm(term)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(term.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Showing {filteredTerms.length} of {terms.length} terms
          </p>
        </CardContent>
      </Card>

      {(editingTerm || showAddForm) && (
        <TermForm
          term={editingTerm}
          categories={categories.filter(c => c !== 'all')}
          difficultyLevels={difficultyLevels}
          onSave={handleSave}
          onCancel={() => {
            setEditingTerm(null);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

const TermForm: React.FC<{
  term: FinancialTerm | null;
  categories: string[];
  difficultyLevels: string[];
  onSave: (data: Partial<FinancialTerm>) => void;
  onCancel: () => void;
}> = ({ term, categories, difficultyLevels, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    term: term?.term || '',
    definition: term?.definition || '',
    category: term?.category || 'general',
    difficulty_level: term?.difficulty_level || 'beginner',
    analogy: term?.analogy || '',
    real_world_example: term?.real_world_example || '',
    example_usage: term?.example_usage || '',
    source: term?.source || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{term ? 'Edit Term' : 'Add New Term'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Term *</label>
              <Input
                value={formData.term}
                onChange={(e) => setFormData({...formData, term: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Definition *</label>
            <Textarea
              value={formData.definition}
              onChange={(e) => setFormData({...formData, definition: e.target.value})}
              required
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Difficulty Level</label>
            <Select
              value={formData.difficulty_level}
              onValueChange={(value) => setFormData({...formData, difficulty_level: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Analogy</label>
            <Textarea
              value={formData.analogy}
              onChange={(e) => setFormData({...formData, analogy: e.target.value})}
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Real World Example</label>
            <Textarea
              value={formData.real_world_example}
              onChange={(e) => setFormData({...formData, real_world_example: e.target.value})}
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FinancialTermsManager;
