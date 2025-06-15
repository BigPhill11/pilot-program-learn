
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';

const AskPhilTab = () => {
    const [apiKey, setApiKey] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiKeyStored, setApiKeyStored] = useState(false);

    useEffect(() => {
        try {
            const storedKey = localStorage.getItem('perplexity_api_key');
            if (storedKey) {
                setApiKey(storedKey);
                setApiKeyStored(true);
            }
        } catch (e) {
            console.error("Could not access local storage:", e);
        }
    }, []);

    const handleApiKeySave = () => {
        try {
            localStorage.setItem('perplexity_api_key', apiKey);
            setApiKeyStored(true);
            setError('');
        } catch (e) {
            setError("Could not save API key. Please enable cookies/local storage in your browser.");
            console.error("Could not access local storage:", e);
        }
    };
    
    const handleAsk = async () => {
        if (!question.trim()) {
            setError('Please enter a question.');
            return;
        }
        if (!apiKey) {
            setError('Please enter your Perplexity API key.');
            return;
        }

        setIsLoading(true);
        setAnswer('');
        setError('');

        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama-3.1-sonar-small-128k-online',
                    messages: [
                        {
                            role: 'system',
                            content: "You are Phil, a friendly financial expert panda. Your goal is to provide a concise, 2-sentence answer to the user's question. After the answer, if it's relevant, add a link to either the 'Learn' or 'Paper Trading' page within the app. For example, you can say 'You can learn more in our <a href=\"/learn\" class=\"text-primary underline\">Learn section</a>.' or 'Try this out in our <a href=\"/paper-trading\" class=\"text-primary underline\">Paper Trading simulation</a>.'. Do not answer in more than two sentences."
                        },
                        {
                            role: 'user',
                            content: question
                        }
                    ],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                  throw new Error('401 Unauthorized');
                }
                throw new Error(errorData.error?.message || 'Something went wrong.');
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            setAnswer(aiResponse);

        } catch (e: any) {
            if (e.message.includes('401')) {
                setError('Authentication failed. Please check your API key.');
                setApiKeyStored(false);
                try {
                    localStorage.removeItem('perplexity_api_key');
                } catch (lsError) {
                    console.error("Could not access local storage:", lsError);
                }
            } else {
                setError(e.message || 'An error occurred while fetching the answer.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!apiKeyStored) {
        return (
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Enter Perplexity API Key</CardTitle>
                    <CardDescription>
                        To use the "Ask Phil" feature, you need a Perplexity API key. 
                        You can get one from the Perplexity Labs website. This key will be stored in your browser's local storage.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                         <Input 
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="pplx-..."
                         />
                         <Button onClick={handleApiKeySave}>Save Key</Button>
                    </div>
                    {error && <p className="text-destructive text-sm mt-2">{error}</p>}
                </CardContent>
            </Card>
        );
    }

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

export default AskPhilTab;
