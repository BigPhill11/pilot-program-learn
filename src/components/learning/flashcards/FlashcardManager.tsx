
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Save, X, Lightbulb, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  level: string;
}

interface FlashcardManagerProps {
  level: 'beginner' | 'intermediate' | 'pro';
  onUpdate: () => void;
}

const FlashcardManager: React.FC<FlashcardManagerProps> = ({ level, onUpdate }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Flashcard>>({});

  useEffect(() => {
    loadFlashcards();
  }, [level]);

  const loadFlashcards = () => {
    const storageKey = `flashcards_${level}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setFlashcards(JSON.parse(stored));
    }
  };

  const saveFlashcards = (updatedCards: Flashcard[]) => {
    const storageKey = `flashcards_${level}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedCards));
    setFlashcards(updatedCards);
    onUpdate();
  };

  const handleEdit = (card: Flashcard) => {
    setEditingId(card.id);
    setEditForm(card);
  };

  const handleSave = () => {
    if (!editForm.term || !editForm.definition) {
      toast.error('Term and definition are required');
      return;
    }

    const updatedCards = flashcards.map(card => 
      card.id === editingId ? { ...card, ...editForm } : card
    );
    
    saveFlashcards(updatedCards);
    setEditingId(null);
    setEditForm({});
    toast.success('Flashcard updated successfully!');
  };

  const handleDelete = (id: string) => {
    const updatedCards = flashcards.filter(card => card.id !== id);
    saveFlashcards(updatedCards);
    toast.success('Flashcard deleted successfully!');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  if (flashcards.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            No flashcards available for {level} level. Upload some flashcards to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage {level} Flashcards</h3>
        <Badge variant="outline">{flashcards.length} cards</Badge>
      </div>

      <div className="grid gap-4">
        {flashcards.map((card) => (
          <Card key={card.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {editingId === card.id ? (
                    <Input
                      value={editForm.term || ''}
                      onChange={(e) => setEditForm({ ...editForm, term: e.target.value })}
                      className="font-semibold"
                      placeholder="Term"
                    />
                  ) : (
                    <CardTitle className="text-lg">{card.term}</CardTitle>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  {editingId === card.id ? (
                    <>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(card)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(card.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Definition</label>
                {editingId === card.id ? (
                  <Textarea
                    value={editForm.definition || ''}
                    onChange={(e) => setEditForm({ ...editForm, definition: e.target.value })}
                    rows={3}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1">{card.definition}</p>
                )}
              </div>

              {(card.philExample || editingId === card.id) && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Phil's Example
                  </label>
                  {editingId === card.id ? (
                    <Textarea
                      value={editForm.philExample || ''}
                      onChange={(e) => setEditForm({ ...editForm, philExample: e.target.value })}
                      rows={2}
                      className="mt-1"
                      placeholder="Phil's fun explanation..."
                    />
                  ) : (
                    <p className="mt-1 text-sm italic">{card.philExample}</p>
                  )}
                </div>
              )}

              {(card.realWorldExample || editingId === card.id) && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Globe className="h-4 w-4 text-blue-500" />
                    Real World Example
                  </label>
                  {editingId === card.id ? (
                    <Textarea
                      value={editForm.realWorldExample || ''}
                      onChange={(e) => setEditForm({ ...editForm, realWorldExample: e.target.value })}
                      rows={2}
                      className="mt-1"
                      placeholder="Real world application..."
                    />
                  ) : (
                    <p className="mt-1 text-sm">{card.realWorldExample}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashcardManager;
