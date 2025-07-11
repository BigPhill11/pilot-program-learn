import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Target, Users, Heart, CheckCircle, MessageCircle } from 'lucide-react';

interface NetworkingModule3Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const NetworkingModule3: React.FC<NetworkingModule3Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedScenarios, setSelectedScenarios] = useState<Record<number, number>>({});

  const steps = [
    {
      title: "Strategic Relationship Mapping",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Target className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Building Your Network Strategy</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Strategic networking involves intentionally building relationships with people who can 
              help you achieve your professional goals while offering value in return.
            </p>
            
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">🎯 The Network Map</CardTitle>
              </CardHeader>
              <CardContent className="text-green-700">
                <p>Think of your network as concentric circles:</p>
                <ul className="mt-2 space-y-1">
                  <li><strong>Inner Circle:</strong> Close colleagues, mentors, trusted advisors</li>
                  <li><strong>Middle Circle:</strong> Industry contacts, regular collaborators</li>
                  <li><strong>Outer Circle:</strong> Acquaintances, social connections, potential contacts</li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">👥 Peer Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>• Same level colleagues</li>
                    <li>• Industry peers</li>
                    <li>• Cross-functional partners</li>
                    <li>• Alumni connections</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⬆️ Upward Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>• Senior executives</li>
                    <li>• Industry leaders</li>
                    <li>• Potential mentors</li>
                    <li>• Board members</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⬇️ Downward Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    <li>• Junior colleagues</li>
                    <li>• Mentees</li>
                    <li>• Students/Interns</li>
                    <li>• Rising stars</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Art of Building Rapport",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Creating Meaningful Connections</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Rapport is the foundation of any strong relationship. It's about finding common ground 
              and creating a sense of trust and understanding.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">🎯 Rapport Building Techniques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Active Listening</h4>
                    <p className="text-sm text-muted-foreground">Focus completely on what the other person is saying</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Find Common Ground</h4>
                    <p className="text-sm text-muted-foreground">Look for shared experiences, interests, or challenges</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Ask Thoughtful Questions</h4>
                    <p className="text-sm text-muted-foreground">Show genuine interest in their work and perspectives</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mirror Communication Style</h4>
                    <p className="text-sm text-muted-foreground">Adapt your pace and energy to match theirs</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-600">💬 Great Conversation Starters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• "What's the most exciting project you're working on?"</p>
                  <p>• "How did you get started in [their industry]?"</p>
                  <p>• "What trends are you seeing in your field?"</p>
                  <p>• "What's the biggest challenge facing your industry?"</p>
                  <p>• "What advice would you give someone entering your field?"</p>
                  <p>• "What's been the highlight of your career so far?"</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">⚠️ Rapport Killers to Avoid</CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700 space-y-1">
                <p>• Dominating the conversation</p>
                <p>• Being too pushy or aggressive</p>
                <p>• Focusing only on what you want</p>
                <p>• Interrupting or not listening</p>
                <p>• Being negative or complaining</p>
                <p>• Checking your phone constantly</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Networking Scenarios Practice",
      type: "interactive",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <MessageCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Practice Real Scenarios</h2>
            <p className="text-muted-foreground">Choose the best response for each networking situation</p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scenario 1: At a Conference Lunch</CardTitle>
                <CardDescription>
                  You're sitting at a table with strangers. The person next to you mentions they work at a company you're interested in.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Immediately ask if they're hiring and hand them your resume",
                  "Show genuine interest: 'That's interesting! What's it like working there? What projects are you most excited about?'",
                  "Start talking about your own company and how much better it is",
                  "Just nod politely and continue eating"
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedScenarios[0] === index ? "default" : "outline"}
                    className="w-full text-left justify-start text-wrap"
                    onClick={() => setSelectedScenarios(prev => ({ ...prev, 0: index }))}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scenario 2: Follow-up After Meeting</CardTitle>
                <CardDescription>
                  You met someone interesting at a networking event last week. You want to follow up but don't want to seem pushy.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Send a generic LinkedIn connection request with no message",
                  "Wait 3 months to avoid seeming desperate",
                  "Send a personalized message referencing your conversation and offering something of value",
                  "Call them immediately and pitch your services"
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedScenarios[1] === index ? "default" : "outline"}
                    className="w-full text-left justify-start text-wrap"
                    onClick={() => setSelectedScenarios(prev => ({ ...prev, 1: index }))}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scenario 3: Introducing Two Contacts</CardTitle>
                <CardDescription>
                  You know two people who could benefit from knowing each other. How do you make the introduction?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Just give each person the other's contact info without asking",
                  "Get permission from both parties first, then make a thoughtful introduction explaining why they should connect",
                  "Mention it in passing but don't follow through",
                  "Set up a surprise meeting without telling them"
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedScenarios[2] === index ? "default" : "outline"}
                    className="w-full text-left justify-start text-wrap"
                    onClick={() => setSelectedScenarios(prev => ({ ...prev, 2: index }))}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Following Up Effectively",
      type: "content",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">The Follow-Up Formula</h2>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">📧 Perfect Follow-Up Template</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700 space-y-3">
              <div>
                <p><strong>Subject:</strong> Great meeting you at [Event] - [Specific reference]</p>
              </div>
              <div>
                <p><strong>Opening:</strong> Reference your conversation specifically</p>
                <p className="text-sm italic">"Hi [Name], It was great meeting you at the Finance Conference yesterday. I really enjoyed our conversation about sustainable investing trends."</p>
              </div>
              <div>
                <p><strong>Value Add:</strong> Provide something useful</p>
                <p className="text-sm italic">"I mentioned that article about ESG metrics - I've attached it here as I thought you might find it interesting."</p>
              </div>
              <div>
                <p><strong>Soft Ask:</strong> Suggest next steps</p>
                <p className="text-sm italic">"I'd love to continue our conversation over coffee sometime. Would you be interested in meeting next week?"</p>
              </div>
              <div>
                <p><strong>Easy Out:</strong> Make it pressure-free</p>
                <p className="text-sm italic">"No worries if you're swamped - I know how busy things can get!"</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">✅ Follow-Up Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Follow up within 24-48 hours</p>
                <p>• Reference something specific from your conversation</p>
                <p>• Provide value (article, intro, resource)</p>
                <p>• Be specific about next steps</p>
                <p>• Keep it brief and scannable</p>
                <p>• Use a clear, relevant subject line</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">❌ Follow-Up Mistakes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Generic, templated messages</p>
                <p>• Immediate sales pitches</p>
                <p>• Following up too frequently</p>
                <p>• Forgetting to follow up at all</p>
                <p>• Making it all about you</p>
                <p>• Vague subject lines</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ];

  const isScenarioComplete = selectedScenarios[0] === 1 && selectedScenarios[1] === 2 && selectedScenarios[2] === 1;
  const canProceed = steps[currentStep]?.type !== 'interactive' || isScenarioComplete;

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
          <h1 className="text-2xl font-bold">Module 3: Strategic Relationship Building</h1>
          <p className="text-muted-foreground">Learn to build meaningful professional relationships</p>
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

      {/* Scenario Feedback */}
      {steps[currentStep]?.type === 'interactive' && Object.keys(selectedScenarios).length >= 3 && (
        <Card className={isScenarioComplete ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}>
          <CardContent className="pt-6">
            {isScenarioComplete ? (
              <p className="text-green-700">✅ Excellent! You understand how to build relationships strategically.</p>
            ) : (
              <p className="text-yellow-700">💡 Review the scenarios. Focus on showing genuine interest, providing value, and getting permission before making introductions.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NetworkingModule3;