import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Star, User, Lightbulb, CheckCircle } from 'lucide-react';

interface NetworkingModule2Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const NetworkingModule2: React.FC<NetworkingModule2Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [brandElements, setBrandElements] = useState({
    values: '',
    strengths: '',
    uniqueValue: '',
    elevator: ''
  });

  const steps = [
    {
      title: "Understanding Personal Branding",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Star className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">What is Personal Branding?</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Your personal brand is how others perceive you professionally. It's the unique combination 
              of your skills, experiences, values, and personality that sets you apart.
            </p>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">🎯 Personal Brand = Professional Reputation</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <p>
                  Your personal brand is what people say about you when you're not in the room. 
                  It's the impression you leave and the value you bring to every interaction.
                </p>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎨 Visual Identity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>• Professional headshots</li>
                    <li>• Consistent colors/fonts</li>
                    <li>• LinkedIn profile design</li>
                    <li>• Business card style</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💬 Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>• Value proposition</li>
                    <li>• Key strengths</li>
                    <li>• Unique differentiators</li>
                    <li>• Professional story</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎭 Personality</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>• Communication style</li>
                    <li>• Core values</li>
                    <li>• Working preferences</li>
                    <li>• Leadership approach</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Building Your Brand Foundation",
      type: "interactive",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <User className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Define Your Brand Elements</h2>
            <p className="text-muted-foreground">Complete each section to build your personal brand foundation</p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Values</CardTitle>
                <CardDescription>What principles guide your professional decisions?</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="e.g., Integrity, Innovation, Collaboration, Excellence..."
                  value={brandElements.values}
                  onChange={(e) => setBrandElements(prev => ({ ...prev, values: e.target.value }))}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Strengths</CardTitle>
                <CardDescription>What are you exceptionally good at?</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="e.g., Strategic thinking, Problem-solving, Team leadership..."
                  value={brandElements.strengths}
                  onChange={(e) => setBrandElements(prev => ({ ...prev, strengths: e.target.value }))}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Unique Value Proposition</CardTitle>
                <CardDescription>What unique value do you bring to your role/industry?</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="e.g., I combine technical expertise with business acumen to..."
                  value={brandElements.uniqueValue}
                  onChange={(e) => setBrandElements(prev => ({ ...prev, uniqueValue: e.target.value }))}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Crafting Your Elevator Pitch",
      type: "interactive",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Lightbulb className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your 30-Second Introduction</h2>
          </div>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">💡 Elevator Pitch Formula</CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-700 space-y-2">
              <p><strong>1. Who you are:</strong> Name + Current role/title</p>
              <p><strong>2. What you do:</strong> Key responsibility or expertise area</p>
              <p><strong>3. Your unique value:</strong> What sets you apart</p>
              <p><strong>4. Call to action:</strong> How they can connect with you</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Write Your Elevator Pitch</CardTitle>
              <CardDescription>Combine your brand elements into a compelling 30-second introduction</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows={4}
                placeholder="Hi, I'm [Name]. I'm a [Role] who [What you do]. What makes me unique is [Your value]. I'd love to [Call to action]."
                value={brandElements.elevator}
                onChange={(e) => setBrandElements(prev => ({ ...prev, elevator: e.target.value }))}
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <p><strong>Example:</strong> "Hi, I'm Sarah Chen. I'm a financial analyst who helps tech startups make data-driven investment decisions. What makes me unique is my ability to translate complex financial models into actionable business strategies. I'd love to learn more about your current challenges and see how I might be able to help."</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Brand Consistency Tips",
      type: "content",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Maintaining Your Brand</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">✅ Do This</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>• Keep your LinkedIn profile updated</p>
                <p>• Use consistent professional photos</p>
                <p>• Share content aligned with your expertise</p>
                <p>• Engage authentically in conversations</p>
                <p>• Follow through on commitments</p>
                <p>• Seek feedback regularly</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">❌ Avoid This</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>• Contradicting your stated values</p>
                <p>• Using unprofessional photos/content</p>
                <p>• Being inconsistent across platforms</p>
                <p>• Over-promoting yourself</p>
                <p>• Neglecting your online presence</p>
                <p>• Making promises you can't keep</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">🎯 Action Steps</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700 space-y-2">
              <p>1. <strong>Audit your online presence</strong> - Google yourself and review all profiles</p>
              <p>2. <strong>Update your LinkedIn</strong> - Ensure it reflects your current brand</p>
              <p>3. <strong>Practice your elevator pitch</strong> - Say it out loud until it feels natural</p>
              <p>4. <strong>Get feedback</strong> - Ask trusted colleagues how they perceive your brand</p>
              <p>5. <strong>Stay consistent</strong> - Align all communications with your brand</p>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  const canProceed = () => {
    if (steps[currentStep]?.type === 'interactive') {
      if (currentStep === 1) {
        return brandElements.values.length > 10 && brandElements.strengths.length > 10 && brandElements.uniqueValue.length > 10;
      }
      if (currentStep === 2) {
        return brandElements.elevator.length > 50;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Module 2: Building Your Personal Brand</h1>
          <p className="text-muted-foreground">Create a compelling and authentic professional identity</p>
        </div>
        {isCompleted && (
          <div className="ml-auto">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        )}
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{currentStep + 1} of {steps.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {steps[currentStep].content}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === steps.length - 1 ? 'Complete Module' : 'Next'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Progress Indicator */}
      {steps[currentStep]?.type === 'interactive' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-blue-700 text-sm">
              💡 Complete all sections above to continue to the next step.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NetworkingModule2;