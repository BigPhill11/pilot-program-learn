
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CSVUploaderProps {
  onUploadComplete: () => void;
}

interface UploadResult {
  inserted_count: number;
  error_count: number;
  errors: string[];
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('CSV file must have at least a header and one data row');
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const requiredHeaders = ['term', 'definition'];
      
      for (const required of requiredHeaders) {
        if (!headers.includes(required)) {
          throw new Error(`Missing required column: ${required}`);
        }
      }

      const termsData = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const termData: any = {};
        
        headers.forEach((header, index) => {
          const value = values[index] || '';
          switch (header) {
            case 'term':
              termData.term = value;
              break;
            case 'definition':
              termData.definition = value;
              break;
            case 'category':
              termData.category = value || 'general';
              break;
            case 'difficulty_level':
              termData.difficulty_level = value || 'beginner';
              break;
            case 'analogy':
              termData.analogy = value;
              break;
            case 'real_world_example':
              termData.real_world_example = value;
              break;
            case 'example_usage':
              termData.example_usage = value;
              break;
            case 'source':
              termData.source = value;
              break;
          }
        });

        return termData;
      });

      const { data, error } = await supabase.rpc('bulk_insert_financial_terms', {
        terms_data: termsData
      });

      if (error) throw error;

      const result = data[0] as UploadResult;
      setUploadResult(result);

      if (result.inserted_count > 0) {
        toast({
          title: "Upload successful",
          description: `${result.inserted_count} terms uploaded successfully`,
        });
        onUploadComplete();
      }

      if (result.error_count > 0) {
        toast({
          title: "Partial upload",
          description: `${result.error_count} terms failed to upload`,
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('CSV upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          CSV Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Upload a CSV file with financial terms. Required columns: term, definition
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Optional columns: category, difficulty_level, analogy, real_world_example, example_usage, source
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className={`cursor-pointer ${isUploading ? 'opacity-50' : ''}`}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">
                {isUploading ? 'Uploading...' : 'Click to upload CSV file'}
              </p>
            </label>
          </div>
        </div>

        {uploadResult && (
          <div className="space-y-2">
            {uploadResult.inserted_count > 0 && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">{uploadResult.inserted_count} terms uploaded successfully</span>
              </div>
            )}
            
            {uploadResult.error_count > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{uploadResult.error_count} terms failed to upload</span>
                </div>
                
                {uploadResult.errors.length > 0 && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-red-600">View errors</summary>
                    <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                      {uploadResult.errors.map((error, index) => (
                        <div key={index} className="text-red-500 bg-red-50 p-1 rounded">
                          {error}
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CSVUploader;
