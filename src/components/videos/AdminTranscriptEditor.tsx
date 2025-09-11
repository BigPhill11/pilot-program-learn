import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Plus,
  Edit,
  Save,
  X,
  Clock,
  Tag,
  FileText
} from 'lucide-react';

interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  confidence: number;
}

interface VideoSegment {
  id: string;
  start_time: number;
  end_time: number;
  title: string;
  description: string;
  keywords: string[];
  segment_type: string;
}

interface AdminTranscriptEditorProps {
  videoId: string;
  videoUrl: string;
  onClose: () => void;
}

const AdminTranscriptEditor: React.FC<AdminTranscriptEditorProps> = ({
  videoId,
  videoUrl,
  onClose
}) => {
  const { toast } = useToast();
  const [transcript, setTranscript] = useState('');
  const [wordTimestamps, setWordTimestamps] = useState<WordTimestamp[]>([]);
  const [segments, setSegments] = useState<VideoSegment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedWords, setHighlightedWords] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState('');
  const [newSegment, setNewSegment] = useState({
    title: '',
    description: '',
    keywords: '',
    start_time: 0,
    end_time: 0
  });
  const [showNewSegment, setShowNewSegment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTranscriptData();
    fetchSegments();
  }, [videoId]);

  useEffect(() => {
    if (searchQuery) {
      highlightSearchResults();
    } else {
      setHighlightedWords([]);
    }
  }, [searchQuery, wordTimestamps]);

  const fetchTranscriptData = async () => {
    try {
      const { data, error } = await supabase
        .from('video_transcripts')
        .select('*')
        .eq('video_id', videoId)
        .single();

      if (error) throw error;

      if (data) {
        setTranscript(data.raw_content || '');
        setEditedTranscript(data.raw_content || '');
        setWordTimestamps(Array.isArray(data.word_timestamps) ? data.word_timestamps as unknown as WordTimestamp[] : []);
      }
    } catch (error) {
      console.error('Error fetching transcript:', error);
      toast({
        title: 'Error',
        description: 'Failed to load transcript data',
        variant: 'destructive'
      });
    }
  };

  const fetchSegments = async () => {
    try {
      const { data, error } = await supabase
        .from('video_segments')
        .select('*')
        .eq('video_id', videoId)
        .order('start_time');

      if (error) throw error;
      setSegments(data || []);
    } catch (error) {
      console.error('Error fetching segments:', error);
    }
  };

  const highlightSearchResults = () => {
    if (!searchQuery || !wordTimestamps.length) return;

    const query = searchQuery.toLowerCase();
    const matchingIndices: number[] = [];

    wordTimestamps.forEach((wordData, index) => {
      if (wordData.word.toLowerCase().includes(query)) {
        matchingIndices.push(index);
      }
    });

    setHighlightedWords(matchingIndices);
  };

  const handleWordClick = (wordData: WordTimestamp) => {
    if (videoRef.current) {
      videoRef.current.currentTime = wordData.start;
      setCurrentTime(wordData.start);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const saveTranscript = async () => {
    try {
      const { error } = await supabase
        .from('video_transcripts')
        .update({
          raw_content: editedTranscript,
          searchable_content: editedTranscript.toLowerCase(),
          updated_at: new Date().toISOString()
        })
        .eq('video_id', videoId);

      if (error) throw error;

      setTranscript(editedTranscript);
      setIsEditing(false);
      
      toast({
        title: 'Success',
        description: 'Transcript updated successfully'
      });
    } catch (error) {
      console.error('Error saving transcript:', error);
      toast({
        title: 'Error',
        description: 'Failed to save transcript',
        variant: 'destructive'
      });
    }
  };

  const createSegment = async () => {
    try {
      const { error } = await supabase
        .from('video_segments')
        .insert({
          video_id: videoId,
          start_time: newSegment.start_time,
          end_time: newSegment.end_time,
          title: newSegment.title,
          description: newSegment.description,
          keywords: newSegment.keywords.split(',').map(k => k.trim()).filter(k => k),
          segment_type: 'custom'
        });

      if (error) throw error;

      setNewSegment({
        title: '',
        description: '',
        keywords: '',
        start_time: 0,
        end_time: 0
      });
      setShowNewSegment(false);
      fetchSegments();

      toast({
        title: 'Success',
        description: 'Segment created successfully'
      });
    } catch (error) {
      console.error('Error creating segment:', error);
      toast({
        title: 'Error',
        description: 'Failed to create segment',
        variant: 'destructive'
      });
    }
  };

  const jumpToSegment = (segment: VideoSegment) => {
    if (videoRef.current) {
      videoRef.current.currentTime = segment.start_time;
      setCurrentTime(segment.start_time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTranscriptWithHighlights = () => {
    if (!wordTimestamps.length) {
      return (
        <div className="text-muted-foreground">
          {transcript || 'No transcript available'}
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {wordTimestamps.map((wordData, index) => (
          <span
            key={index}
            className={`
              inline-block mr-1 mb-1 px-1 py-0.5 rounded cursor-pointer text-sm
              transition-colors duration-200
              ${highlightedWords.includes(index) 
                ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100' 
                : 'hover:bg-muted'
              }
              ${Math.abs(currentTime - wordData.start) < 0.5 
                ? 'bg-primary/20 text-primary' 
                : ''
              }
            `}
            onClick={() => handleWordClick(wordData)}
            title={`${formatTime(wordData.start)} - ${formatTime(wordData.end)} (${Math.round(wordData.confidence * 100)}% confidence)`}
          >
            {wordData.word}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto p-6">
      {/* Video Player Section */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Video Player
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
              />
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <span className="text-sm text-muted-foreground">
                {formatTime(currentTime)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Segments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Video Segments
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNewSegment(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {segments.map((segment) => (
                <div
                  key={segment.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => jumpToSegment(segment)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{segment.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {formatTime(segment.start_time)} - {formatTime(segment.end_time)}
                    </Badge>
                  </div>
                  {segment.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {segment.description}
                    </p>
                  )}
                  {segment.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {segment.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showNewSegment && (
              <div className="mt-4 p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Create New Segment</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowNewSegment(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Start time (seconds)"
                    type="number"
                    value={newSegment.start_time}
                    onChange={(e) => setNewSegment(prev => ({
                      ...prev,
                      start_time: parseFloat(e.target.value) || 0
                    }))}
                  />
                  <Input
                    placeholder="End time (seconds)"
                    type="number"
                    value={newSegment.end_time}
                    onChange={(e) => setNewSegment(prev => ({
                      ...prev,
                      end_time: parseFloat(e.target.value) || 0
                    }))}
                  />
                </div>
                
                <Input
                  placeholder="Segment title"
                  value={newSegment.title}
                  onChange={(e) => setNewSegment(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
                
                <Textarea
                  placeholder="Description"
                  value={newSegment.description}
                  onChange={(e) => setNewSegment(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
                
                <Input
                  placeholder="Keywords (comma-separated)"
                  value={newSegment.keywords}
                  onChange={(e) => setNewSegment(prev => ({
                    ...prev,
                    keywords: e.target.value
                  }))}
                />
                
                <Button
                  size="sm"
                  onClick={createSegment}
                  disabled={!newSegment.title || newSegment.end_time <= newSegment.start_time}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Segment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transcript Section */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Interactive Transcript
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            </CardTitle>
            <CardDescription>
              Click on any word to jump to that timestamp in the video
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transcript..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {highlightedWords.length > 0 && (
              <Alert className="mb-4">
                <AlertDescription>
                  Found {highlightedWords.length} matches for "{searchQuery}"
                </AlertDescription>
              </Alert>
            )}

            <Separator className="mb-4" />

            {/* Transcript Content */}
            <div
              ref={transcriptRef}
              className="max-h-96 overflow-y-auto p-4 border rounded-lg"
            >
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedTranscript}
                    onChange={(e) => setEditedTranscript(e.target.value)}
                    className="min-h-80"
                    placeholder="Edit transcript text..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveTranscript}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setEditedTranscript(transcript);
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                renderTranscriptWithHighlights()
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminTranscriptEditor;