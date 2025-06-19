
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Search, Save, X } from 'lucide-react';
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
  const [editingTermId, setEditingTermId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<FinancialTerm>>({});
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
    if (!confirm('Are you sure you want to delete this term?')) return;
    
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

  const startEdit = (term: FinancialTerm) => {
    setEditingTermId(term.id);
    setEditingData(term);
  };

  const cancelEdit = () => {
    setEditingTermId(null);
    setEditingData({});
  };

  const saveEdit = async () => {
    if (!editingTermId || !editingData.term || !editingData.definition) {
      toast({
        title: "Error",
        description: "Term and definition are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('financial_terms_database')
        .update({
          term: editingData.term,
          definition: editingData.definition,
          category: editingData.category || 'general',
          difficulty_level: editingData.difficulty_level || 'beginner',
          analogy: editingData.analogy || null,
          real_world_example: editingData.real_world_example || null,
          example_usage: editingData.example_usage || null,
          source: editingData.source || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingTermId);

      if (error) throw error;
      
      setTerms(terms.map(term => 
        term.id === editingTermId ? { ...term, ...editingData } as FinancialTerm : term
      ));
      
      setEditingTermId(null);
      setEditingData({});
      
      toast({
        title: "Success",
        description: "Term updated successfully"
      });
    } catch (error) {
      console.error('Error updating term:', error);
      toast({
        title: "Error",
        description: "Failed to update term",
        variant: "destructive"
      });
    }
  };

  const handleAddTerm = async (termData: Omit<FinancialTerm, 'id' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('financial_terms_database')
        .insert([{
          ...termData,
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;
      setTerms([...terms, data]);
      setShowAddForm(false);
      
      toast({
        title: "Success",
        description: "Term added successfully"
      });
    } catch (error) {
      console.error('Error adding term:', error);
      toast({
        title: "Error",
        description: "Failed to add term",
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
                  {editingTermId === term.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Term"
                          value={editingData.term || ''}
                          onChange={(e) => setEditingData({...editingData, term: e.target.value})}
                        />
                        <Select
                          value={editingData.category || 'general'}
                          onValueChange={(value) => setEditingData({...editingData, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.filter(c => c !== 'all').map(category => (
                              <SelectItem key={category} value={category}>
                                {category.replace('_', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Textarea
                        placeholder="Definition"
                        value={editingData.definition || ''}
                        onChange={(e) => setEditingData({...editingData, definition: e.target.value})}
                        rows={3}
                      />
                      
                      <Textarea
                        placeholder="Analogy (optional)"
                        value={editingData.analogy || ''}
                        onChange={(e) => setEditingData({...editingData, analogy: e.target.value})}
                        rows={2}
                      />
                      
                      <div className="flex gap-2">
                        <Button onClick={saveEdit} size="sm">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
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
                          onClick={() => startEdit(term)}
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
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Showing {filteredTerms.length} of {terms.length} terms
          </p>
        </CardContent>
      </Card>

      {showAddForm && (
        <QuickAddForm
          categories={categories.filter(c => c !== 'all')}
          difficultyLevels={difficultyLevels}
          onSave={handleAddTerm}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

const QuickAddForm: React.FC<{
  categories: string[];
  difficultyLevels: string[];
  onSave: (data: Omit<FinancialTerm, 'id' | 'status'>) => void;
  onCancel: () => void;
}> = ({ categories, difficultyLevels, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
    category: 'general',
    difficulty_level: 'beginner',
    analogy: '',
    real_world_example: '',
    example_usage: '',
    source: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.term || !formData.definition) return;
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Term</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Term *"
              value={formData.term}
              onChange={(e) => setFormData({...formData, term: e.target.value})}
              required
            />
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

          <Textarea
            placeholder="Definition *"
            value={formData.definition}
            onChange={(e) => setFormData({...formData, definition: e.target.value})}
            required
            rows={3}
          />

          <Textarea
            placeholder="Analogy (optional)"
            value={formData.analogy}
            onChange={(e) => setFormData({...formData, analogy: e.target.value})}
            rows={2}
          />

          <div className="flex gap-2">
            <Button type="submit">Add Term</Button>
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
