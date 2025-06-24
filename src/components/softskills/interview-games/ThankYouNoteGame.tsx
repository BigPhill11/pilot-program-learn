
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const ThankYouNoteGame: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [userNote, setUserNote] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios = [
    {
      type: 'First Round Interview',
      interviewer: 'Sarah Chen, VP of Investment Banking',
      details: 'You had a great conversation about the tech sector and she mentioned her background at Goldman Sachs. The interview was scheduled for 30 minutes but went 45 minutes.',
      keyPoints: ['Mention tech sector discussion', 'Reference her Goldman background', 'Acknowledge the extended time', 'Reiterate interest']
    },
    {
      type: 'Final Round Interview',
      interviewer: 'Michael Rodriguez, Managing Director',
      details: 'He discussed the team culture and mentioned they just closed a major healthcare M&A deal. You talked about your interest in healthcare investments.',
      keyPoints: ['Reference healthcare M&A discussion', 'Mention team culture conversation', 'Express excitement about the role', 'Professional but enthusiastic tone']
    },
    {
      type: 'Coffee Chat (Informational)',
      interviewer: 'Jessica Park, Associate',
      details: 'She gave you great insights about the analyst program and mentioned the upcoming recruiting timeline. She suggested following up with her manager.',
      keyPoints: ['Thank for insights about analyst program', 'Reference recruiting timeline discussion', 'Ask about introduction to manager', 'Keep it brief and professional']
    }
  ];

  const sampleNote = `Subject: Thank you for your time today

Dear ${scenarios[selectedScenario].interviewer.split(',')[0]},

Thank you for taking the time to speak with me today about the [Position] role at [Company]. I thoroughly enjoyed our conversation about [specific topic discussed] and learning more about [something specific they mentioned].

Our discussion reinforced my enthusiasm for this opportunity, particularly [specific aspect that excited you]. I was especially interested in [another specific detail from the conversation].

Please let me know if you need any additional information from me. I look forward to hearing about the next steps in the process.

Best regards,
[Your Name]`;

  const evaluateNote = (note: string) => {
    const feedback = [];
    const scenario = scenarios[selectedScenario];
    
    if (note.length < 50) {
      feedback.push({ type: 'error', message: 'Note is too short - aim for 100-200 words' });
    }
    
    if (!note.toLowerCase().includes('thank')) {
      feedback.push({ type: 'error', message: 'Missing gratitude/thank you' });
    }
    
    if (!note.toLowerCase().includes(scenario.interviewer.split(',')[0].toLowerCase().split(' ')[0])) {
      feedback.push({ type: 'warning', message: `Consider personalizing with interviewer's name (${scenario.interviewer.split(',')[0]})` });
    }
    
    const hasSpecificReference = scenario.keyPoints.some(point => 
      note.toLowerCase().includes(point.toLowerCase().split(' ')[0])
    );
    if (!hasSpecificReference) {
      feedback.push({ type: 'warning', message: 'Add specific reference to your conversation' });
    }
    
    if (!note.toLowerCase().includes('next step') && !note.toLowerCase().includes('follow up')) {
      feedback.push({ type: 'warning', message: 'Consider mentioning next steps' });
    }
    
    if (note.split('\n').length < 3) {
      feedback.push({ type: 'warning', message: 'Consider organizing into clear paragraphs' });
    }
    
    if (feedback.length === 0) {
      feedback.push({ type: 'success', message: 'Great job! This note hits all the key elements.' });
    }
    
    return feedback;
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const resetNote = () => {
    setUserNote('');
    setShowFeedback(false);
  };

  const switchScenario = (index: number) => {
    setSelectedScenario(index);
    setUserNote('');
    setShowFeedback(false);
  };

  const feedback = showFeedback ? evaluateNote(userNote) : [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Thank You Note Practice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {scenarios.map((scenario, index) => (
              <Button
                key={index}
                variant={selectedScenario === index ? 'default' : 'outline'}
                size="sm"
                onClick={() => switchScenario(index)}
              >
                {scenario.type}
              </Button>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Badge variant="secondary">{scenarios[selectedScenario].type}</Badge>
                <p className="font-medium text-blue-800">
                  Interviewer: {scenarios[selectedScenario].interviewer}
                </p>
                <p className="text-blue-700 text-sm">
                  {scenarios[selectedScenario].details}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <label className="text-sm font-medium">Write your thank you note:</label>
            <Textarea
              placeholder="Begin writing your thank you note here..."
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={userNote.length < 20}>
              Get Feedback
            </Button>
            <Button onClick={resetNote} variant="outline">
              Reset
            </Button>
          </div>

          {showFeedback && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {feedback.map((item, index) => (
                    <div key={index} className={`flex items-start gap-2 p-3 rounded-lg ${
                      item.type === 'success' ? 'bg-green-50 border border-green-200' :
                      item.type === 'error' ? 'bg-red-50 border border-red-200' :
                      'bg-yellow-50 border border-yellow-200'
                    }`}>
                      {item.type === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        item.type === 'success' ? 'text-green-800' :
                        item.type === 'error' ? 'text-red-800' :
                        'text-orange-800'
                      }`}>
                        {item.message}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Sample Note Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                    {sampleNote}
                  </pre>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardContent className="p-4">
              <h5 className="font-medium mb-3">✅ Key Elements to Include:</h5>
              <div className="space-y-2">
                {scenarios[selectedScenario].keyPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span>Send within 24 hours</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span>Keep it concise but personal</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYouNoteGame;
