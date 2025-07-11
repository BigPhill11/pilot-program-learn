import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Users, Brain, Target, CheckCircle } from 'lucide-react';

interface NetworkingModule1Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const NetworkingModule1: React.FC<NetworkingModule1Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const steps = [
    {
      title: "What is Professional Networking?",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Understanding Professional Networking</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Professional networking is the practice of building and maintaining mutually beneficial 
              relationships with other professionals in your industry and related fields.
            </p>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Key Components:</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <span><strong>Relationship Building:</strong> Creating genuine connections</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <span><strong>Mutual Value:</strong> Offering and receiving benefits</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <span><strong>Long-term Focus:</strong> Building lasting professional relationships</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <span><strong>Strategic Approach:</strong> Purposeful and planned networking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Networking Mindset",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Developing the Right Mindset</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">✅ Growth Mindset</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-green-700">
                <p>• Focus on giving value first</p>
                <p>• Be genuinely interested in others</p>
                <p>• View networking as relationship building</p>
                <p>• Embrace continuous learning</p>
                <p>• Quality over quantity</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">❌ Fixed Mindset</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-red-700">
                <p>• Only reaching out when you need something</p>
                <p>• Focusing solely on personal gain</p>
                <p>• Treating people as transactions</p>
                <p>• Being superficial in conversations</p>
                <p>• Collecting contacts without building relationships</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Remember:</h3>
            <p className="text-blue-700">
              Successful networking is about building authentic relationships that benefit everyone involved. 
              When you help others succeed, they'll naturally want to help you too.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Benefits of Networking",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Target className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Why Networking Matters</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🚀 Career Advancement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• Access to hidden job opportunities</li>
                  <li>• Mentorship and career guidance</li>
                  <li>• Professional recommendations</li>
                  <li>• Industry insights and trends</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💼 Business Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• New client and customer referrals</li>
                  <li>• Partnership opportunities</li>
                  <li>• Vendor and supplier connections</li>
                  <li>• Business development leads</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🧠 Knowledge Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• Learn from others' experiences</li>
                  <li>• Stay updated on industry changes</li>
                  <li>• Access to resources and tools</li>
                  <li>• Problem-solving through collaboration</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🤝 Personal Development</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• Improved communication skills</li>
                  <li>• Increased confidence</li>
                  <li>• Broader perspective on issues</li>
                  <li>• Enhanced leadership abilities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Knowledge Check",
      type: "quiz",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Test Your Understanding</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question 1: What is the primary focus of effective networking?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Getting as many business cards as possible",
                  "Building genuine, mutually beneficial relationships",
                  "Only connecting with senior executives",
                  "Promoting your services to everyone you meet"
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant={quizAnswers[0] === index ? "default" : "outline"}
                    className="w-full text-left justify-start"
                    onClick={() => setQuizAnswers(prev => ({ ...prev, 0: index }))}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question 2: Which mindset is most important for successful networking?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Focus on what others can do for you",
                  "Give value first and help others succeed",
                  "Only network when you need something",
                  "Collect as many contacts as possible"
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant={quizAnswers[1] === index ? "default" : "outline"}
                    className="w-full text-left justify-start"
                    onClick={() => setQuizAnswers(prev => ({ ...prev, 1: index }))}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ];

  const isQuizComplete = steps[currentStep]?.type === 'quiz' && 
    Object.keys(quizAnswers).length >= 2 &&
    quizAnswers[0] === 1 && quizAnswers[1] === 1;

  const canProceed = steps[currentStep]?.type !== 'quiz' || isQuizComplete;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (canProceed) {
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
          <h1 className="text-2xl font-bold">Module 1: Networking Fundamentals</h1>
          <p className="text-muted-foreground">Understanding the basics of professional networking</p>
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
          disabled={!canProceed}
        >
          {currentStep === steps.length - 1 ? 'Complete Module' : 'Next'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Quiz Feedback */}
      {steps[currentStep]?.type === 'quiz' && Object.keys(quizAnswers).length >= 2 && (
        <Card className={isQuizComplete ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
          <CardContent className="pt-6">
            {isQuizComplete ? (
              <p className="text-green-700">✅ Great job! You understand the networking fundamentals.</p>
            ) : (
              <p className="text-red-700">❌ Review the material and try again. Focus on building genuine relationships and giving value first.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NetworkingModule1;