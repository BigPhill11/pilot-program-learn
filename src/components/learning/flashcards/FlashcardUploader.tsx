import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Upload, FileText, AlertCircle, Plus, Lightbulb, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface FlashcardUploaderProps {
  onUploadComplete: () => void;
}

const FlashcardUploader: React.FC<FlashcardUploaderProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  
  // Manual card creation
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const [philExample, setPhilExample] = useState('');
  const [realWorldExample, setRealWorldExample] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const saveAndNotify = (updatedCards: any[], levelKey: string) => {
    localStorage.setItem(levelKey, JSON.stringify(updatedCards));
    onUploadComplete();
    
    // Trigger update event for the game
    const levelName = levelKey.replace('flashcards_', '') as 'beginner' | 'intermediate' | 'pro';
    window.dispatchEvent(new CustomEvent('flashcardsUpdated', { 
      detail: { level: levelName, cards: updatedCards } 
    }));
  };

  const handleCSVUpload = async () => {
    if (!file || !level) {
      toast.error('Please select a file and difficulty level');
      return;
    }

    setUploading(true);
    
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const flashcards = lines.slice(1).map(line => {
        const [term, definition, philEx = '', realEx = ''] = line.split(',').map(item => item.trim().replace(/"/g, ''));
        return { 
          id: `${Date.now()}-${Math.random()}`,
          term, 
          definition,
          philExample: philEx,
          realWorldExample: realEx,
          level
        };
      }).filter(card => card.term && card.definition);

      const storageKey = `flashcards_${level}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = [...existing, ...flashcards];
      
      saveAndNotify(updated, storageKey);
      toast.success(`Uploaded ${flashcards.length} flashcards to ${level} level`);
      setFile(null);
      setLevel('');
    } catch (error) {
      toast.error('Error uploading flashcards');
    } finally {
      setUploading(false);
    }
  };

  const handleManualAdd = () => {
    if (!newTerm || !newDefinition || !level) {
      toast.error('Please fill in term, definition, and select a level');
      return;
    }

    const newCard = {
      id: `${Date.now()}-${Math.random()}`,
      term: newTerm,
      definition: newDefinition,
      philExample,
      realWorldExample,
      level
    };

    const storageKey = `flashcards_${level}`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updated = [...existing, newCard];
    
    saveAndNotify(updated, storageKey);
    toast.success('Flashcard added successfully!');
    setNewTerm('');
    setNewDefinition('');
    setPhilExample('');
    setRealWorldExample('');
  };

  return (
    <Tabs defaultValue="csv-upload" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="csv-upload">CSV Upload</TabsTrigger>
        <TabsTrigger value="manual-add">Add Single Card</TabsTrigger>
      </TabsList>

      <TabsContent value="csv-upload" className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">CSV Format Requirements</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your CSV should have columns: <strong>Term,Definition,Phil's Example,Real World Example</strong>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Example: "Stock","A share of ownership in a company","Like owning a slice of pizza from the whole pizza!","Apple stock represents ownership in Apple Inc."
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="csv-file">Select CSV File</Label>
            <div className="mt-1">
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            {file && (
              <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                <FileText className="h-4 w-4" />
                {file.name}
              </div>
            )}
          </div>

          <div>
            <Label>Difficulty Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleCSVUpload} 
          disabled={!file || !level || uploading}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Flashcards'}
        </Button>
      </TabsContent>

      <TabsContent value="manual-add" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="term">Term *</Label>
            <Input
              id="term"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              placeholder="Enter financial term"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Difficulty Level *</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="definition">Definition *</Label>
          <Textarea
            id="definition"
            value={newDefinition}
            onChange={(e) => setNewDefinition(e.target.value)}
            placeholder="Enter the definition"
            className="mt-1"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Phil's Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={philExample}
                onChange={(e) => setPhilExample(e.target.value)}
                placeholder="Phil's fun way to explain this term..."
                rows={3}
                className="text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-blue-500" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={realWorldExample}
                onChange={(e) => setRealWorldExample(e.target.value)}
                placeholder="Real world application or example..."
                rows={3}
                className="text-sm"
              />
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={handleManualAdd} 
          disabled={!newTerm || !newDefinition || !level}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Flashcard
        </Button>
      </TabsContent>
    </Tabs>
  );
};

export default FlashcardUploader;
