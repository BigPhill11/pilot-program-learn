
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, Brain, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AskPhil = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [aiProvider, setAiProvider] = useState<'perplexity' | 'openai'>('perplexity');

    const handleAsk = async () => {
        if (!question.trim()) {
            setError('Please enter a question.');
            return;
        }

        setIsLoading(true);
        setAnswer('');
        setError('');

        try {
            const functionName = aiProvider === 'perplexity' ? 'phil-chat' : 'phil-chat-openai';
            
            const { data, error: functionError } = await supabase.functions.invoke(functionName, {
                body: { message: question }
            });

            if (functionError) {
                throw new Error(functionError.message || `Failed to get response from Phil using ${aiProvider}`);
            }

            if (data?.error) {
                throw new Error(data.error);
            }

            setAnswer(data.response);

        } catch (e: any) {
            console.error('Error asking Phil:', e);
            setError(e.message || 'An error occurred while asking Phil.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <Wand2 className="h-6 w-6 text-primary" />
                   Ask Phil Anything
                </CardTitle>
                <CardDescription>Have a financial question? Ask Phil, our AI-powered expert panda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center mb-2">
                        <span className="text-sm font-medium">AI Provider:</span>
                        <Button
                            variant={aiProvider === 'perplexity' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setAiProvider('perplexity')}
                            className="flex items-center gap-1"
                        >
                            <Brain className="h-4 w-4" />
                            Perplexity
                        </Button>
                        <Button
                            variant={aiProvider === 'openai' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setAiProvider('openai')}
                            className="flex items-center gap-1"
                        >
                            <Zap className="h-4 w-4" />
                            OpenAI
                        </Button>
                        <Badge variant="secondary" className="ml-auto">
                            {aiProvider === 'perplexity' ? 'Real-time Data' : 'Fast Response'}
                        </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g., How do I open a Roth IRA?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleAsk()}
                            disabled={isLoading}
                        />
                        <Button onClick={handleAsk} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Ask'}
                        </Button>
                    </div>
                    {error && <p className="text-destructive text-sm">{error}</p>}
                    
                    {answer && (
                         <div className="p-4 bg-muted/50 rounded-lg border space-y-2">
                             <div className="flex items-center justify-between mb-2">
                                 <span className="text-sm text-muted-foreground">
                                     Powered by {aiProvider === 'perplexity' ? 'Perplexity' : 'OpenAI'}
                                 </span>
                             </div>
                             <p 
                                className="text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br />') }}
                             />
                         </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AskPhil;
