
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Edit } from 'lucide-react';

const StarMethodGame: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    situation: '',
    task: '',
    action: '',
    result: ''
  });
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      key: 'situation' as keyof typeof responses,
      title: 'Situation',
      description: 'Describe the context or background of your story',
      placeholder: 'Example: During my summer internship at XYZ Company, our team was facing a tight deadline...',
      tips: ['Be specific about when and where', 'Provide enough context', 'Keep it concise but clear']
    },
    {
      key: 'task' as keyof typeof responses,
      title: 'Task',
      description: 'Explain what you were responsible for or what needed to be accomplished',
      placeholder: 'Example: I was tasked with analyzing customer data to identify trends that could help improve retention...',
      tips: ['Focus on your specific responsibility', 'Clarify the goal or objective', 'Make it challenging but achievable']
    },
    {
      key: 'action' as keyof typeof responses,
      title: 'Action',
      description: 'Detail the specific steps you took to address the task',
      placeholder: 'Example: I spent the first day gathering data from three different sources, then created a comprehensive spreadsheet...',
      tips: ['Use "I" statements (not "we")', 'Be specific about your actions', 'Show your thought process']
    },
    {
      key: 'result' as keyof typeof responses,
      title: 'Result',
      description: 'Share the outcome and impact of your actions',
      placeholder: 'Example: My analysis led to a 25% improvement in customer retention and saved the company $50K annually...',
      tips: ['Quantify when possible', 'Show positive impact', 'Connect back to business value']
    }
  ];

  const behavioralPrompts = [
    "Tell me about a time you showed leadership",
    "Describe a situation where you had to work under pressure",
    "Give me an example of when you failed and what you learned",
    "Tell me about a time you had to convince someone to see your point of view",
    "Describe a situation where you went above and beyond"
  ];

  const [currentPrompt, setCurrentPrompt] = useState(0);

  const handleInputChange = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [steps[currentStep].key]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetGame = () => {
    setCurrentStep(0);
    setResponses({
      situation: '',
      task: '',
      action: '',
      result: ''
    });
    setIsComplete(false);
    setCurrentPrompt((prev) => (prev + 1) % behavioralPrompts.length);
  };

  const editStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="space-y-4">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              🎉 Complete STAR Story!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, index) => (
              <Card key={step.key} className="relative">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="mb-2">{step.title}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editStep(index)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm">{responses[step.key]}</p>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex gap-2 pt-4">
              <Button onClick={resetGame}>
                Try New Scenario
              </Button>
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                Edit Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const currentResponse = responses[currentStepData.key];

  return (
    <div className="space-y-4">
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <p className="font-medium text-purple-800 mb-2">Behavioral Question:</p>
          <p className="text-purple-700">"{behavioralPrompts[currentPrompt]}"</p>
        </CardContent>
      </Card>

      <div className="flex justify-center mb-4">
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-primary text-white">{currentStepData.title}</Badge>
              Step {currentStep + 1} of {steps.length}
            </CardTitle>
          </div>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={currentStepData.placeholder}
            value={currentResponse}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[120px]"
          />
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <p className="font-medium text-blue-800 mb-2">💡 Tips for {currentStepData.title}:</p>
              <ul className="space-y-1">
                {currentStepData.tips.map((tip, index) => (
                  <li key={index} className="text-blue-700 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            <Button 
              onClick={nextStep}
              disabled={currentResponse.trim().length < 10}
            >
              {currentStep === steps.length - 1 ? 'Complete Story' : 'Next Step'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StarMethodGame;
