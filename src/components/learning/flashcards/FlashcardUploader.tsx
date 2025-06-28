
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FlashcardUploaderProps {
  onUploadComplete: () => void;
}

const FlashcardUploader: React.FC<FlashcardUploaderProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const handleUpload = async () => {
    if (!file || !level) {
      toast.error('Please select a file and difficulty level');
      return;
    }

    setUploading(true);
    
    try {
      // Read and parse CSV file
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const flashcards = lines.slice(1).map(line => {
        const [term, definition] = line.split(',').map(item => item.trim().replace(/"/g, ''));
        return { term, definition };
      }).filter(card => card.term && card.definition);

      // Store in localStorage for now (in a real app, you'd save to database)
      const storageKey = `flashcards_${level}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updated = [...existing, ...flashcards];
      localStorage.setItem(storageKey, JSON.stringify(updated));

      toast.success(`Uploaded ${flashcards.length} flashcards to ${level} level`);
      onUploadComplete();
      setFile(null);
      setLevel('');
    } catch (error) {
      toast.error('Error uploading flashcards');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800">CSV Format Requirements</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your CSV should have two columns: <strong>Term,Definition</strong>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Example: "Stock","A share of ownership in a company"
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
        onClick={handleUpload} 
        disabled={!file || !level || uploading}
        className="w-full"
      >
        <Upload className="h-4 w-4 mr-2" />
        {uploading ? 'Uploading...' : 'Upload Flashcards'}
      </Button>
    </div>
  );
};

export default FlashcardUploader;
