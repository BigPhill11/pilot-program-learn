import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Laptop, Linkedin, Twitter, MessageSquare, CheckCircle } from 'lucide-react';

interface NetworkingModule4Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const NetworkingModule4: React.FC<NetworkingModule4Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [platformChecklist, setPlatformChecklist] = useState<Record<string, boolean>>({});

  const steps = [
    {
      title: "Digital Networking Platforms",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Laptop className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Mastering Online Networking</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Digital networking has become essential in today's professional world. Understanding 
              how to leverage online platforms effectively can exponentially expand your network.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-800">
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </CardTitle>
                  <CardDescription className="text-blue-600">The professional networking platform</CardDescription>
                </CardHeader>
                <CardContent className="text-blue-700 space-y-2">
                  <p><strong>Best for:</strong> Professional connections, industry insights, job opportunities</p>
                  <p><strong>Key features:</strong></p>
                  <ul className="space-y-1 text-sm ml-4">
                    <li>• Professional profiles</li>
                    <li>• Industry groups</li>
                    <li>• Content sharing</li>
                    <li>• Direct messaging</li>
                    <li>• Event networking</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-cyan-200 bg-cyan-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-cyan-800">
                    <Twitter className="h-5 w-5" />
                    <span>Twitter/X</span>
                  </CardTitle>
                  <CardDescription className="text-cyan-600">Real-time industry conversations</CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-700 space-y-2">
                  <p><strong>Best for:</strong> Industry trends, thought leadership, quick connections</p>
                  <p><strong>Key features:</strong></p>
                  <ul className="space-y-1 text-sm ml-4">
                    <li>• Real-time updates</li>
                    <li>• Industry hashtags</li>
                    <li>• Twitter chats</li>
                    <li>• Quick engagement</li>
                    <li>• Viral content potential</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">🌐 Other Important Platforms</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-700 space-y-2">
                <p><strong>Discord/Slack Communities:</strong> Industry-specific servers and workspaces</p>
                <p><strong>Reddit:</strong> Niche professional communities and AMAs</p>
                <p><strong>Clubhouse:</strong> Audio-based networking and discussions</p>
                <p><strong>GitHub:</strong> For tech professionals to showcase code and collaborate</p>
                <p><strong>Medium:</strong> Thought leadership through writing and commenting</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "LinkedIn Optimization",
      type: "interactive",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Linkedin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Optimize Your LinkedIn Profile</h2>
            <p className="text-muted-foreground">Check off each element as you optimize your profile</p>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo & Header</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['professional-photo'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'professional-photo': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Professional headshot (high quality, business appropriate)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['background-image'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'background-image': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Custom background image that reflects your industry/interests</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Headline & Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['compelling-headline'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'compelling-headline': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Compelling headline that goes beyond just your job title</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['summary-story'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'summary-story': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Summary that tells your professional story and value proposition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['keywords'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'keywords': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Industry keywords for searchability</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Experience & Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['detailed-experience'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'detailed-experience': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Detailed work experience with achievements and metrics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['relevant-skills'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'relevant-skills': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Relevant skills section with endorsements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['recommendations'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'recommendations': e.target.checked }))}
                    className="rounded"
                  />
                  <span>At least 3 recommendations from colleagues/clients</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity & Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['regular-posts'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'regular-posts': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Share valuable content regularly (2-3 times per week)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['engage-others'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'engage-others': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Engage with others' content meaningfully</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={platformChecklist['join-groups'] || false}
                    onChange={(e) => setPlatformChecklist(prev => ({ ...prev, 'join-groups': e.target.checked }))}
                    className="rounded"
                  />
                  <span>Join and participate in relevant industry groups</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Digital Networking Strategies",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Effective Online Networking</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">✅ Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Personalize Connection Requests</strong></p>
                <p className="text-muted-foreground">Always include a personal note explaining why you want to connect</p>
                
                <p><strong>Share Valuable Content</strong></p>
                <p className="text-muted-foreground">Post industry insights, helpful articles, and thoughtful commentary</p>
                
                <p><strong>Engage Authentically</strong></p>
                <p className="text-muted-foreground">Comment meaningfully on posts, don't just like and scroll</p>
                
                <p><strong>Use Hashtags Strategically</strong></p>
                <p className="text-muted-foreground">Research and use relevant industry hashtags to increase visibility</p>
                
                <p><strong>Follow Up Consistently</strong></p>
                <p className="text-muted-foreground">Move online connections to offline conversations when appropriate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">❌ Common Mistakes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Generic Connection Requests</strong></p>
                <p className="text-muted-foreground">Using the default "I'd like to add you to my network" message</p>
                
                <p><strong>Immediate Sales Pitches</strong></p>
                <p className="text-muted-foreground">Sending promotional messages right after connecting</p>
                
                <p><strong>Inconsistent Activity</strong></p>
                <p className="text-muted-foreground">Being active for a week then disappearing for months</p>
                
                <p><strong>Over-Posting</strong></p>
                <p className="text-muted-foreground">Flooding feeds with multiple posts per day</p>
                
                <p><strong>Controversial Content</strong></p>
                <p className="text-muted-foreground">Posting political or divisive content on professional platforms</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">💡 Content Ideas That Work</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700 space-y-2">
              <p>• <strong>Industry Insights:</strong> Share your perspective on trends and news</p>
              <p>• <strong>Behind-the-Scenes:</strong> Show your work process or team culture</p>
              <p>• <strong>Lessons Learned:</strong> Share professional failures and what you learned</p>
              <p>• <strong>Resource Sharing:</strong> Recommend useful tools, books, or articles</p>
              <p>• <strong>Achievement Highlights:</strong> Celebrate team wins and milestones</p>
              <p>• <strong>Question Posts:</strong> Ask thoughtful questions to spark discussion</p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Online-to-Offline Networking",
      type: "content",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Bridging Digital and In-Person Connections</h2>
          
          <div className="space-y-4">
            <p className="text-lg text-center">
              The most powerful networking happens when you successfully transition online 
              connections into meaningful offline relationships.
            </p>
            
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">🌉 Building the Bridge</CardTitle>
              </CardHeader>
              <CardContent className="text-green-700 space-y-3">
                <div>
                  <h4 className="font-semibold">1. Establish Digital Rapport First</h4>
                  <p className="text-sm">Engage with their content, share valuable resources, build familiarity</p>
                </div>
                <div>
                  <h4 className="font-semibold">2. Find Natural Transition Points</h4>
                  <p className="text-sm">Look for opportunities to suggest phone calls, video chats, or meetings</p>
                </div>
                <div>
                  <h4 className="font-semibold">3. Suggest Value-Driven Meetings</h4>
                  <p className="text-sm">Propose coffee to discuss industry trends, not to ask for favors</p>
                </div>
                <div>
                  <h4 className="font-semibold">4. Make It Easy for Them</h4>
                  <p className="text-sm">Suggest specific times/places, offer to come to their location</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>📧 Transition Message Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Subject:</strong> Coffee chat about [specific topic]?</p>
                  <p><strong>Message:</strong></p>
                  <div className="bg-muted p-3 rounded text-xs">
                    <p>"Hi [Name],</p>
                    <p>I've really enjoyed our LinkedIn conversations about [specific topic]. Your insights on [specific point] really resonated with me.</p>
                    <p>I'd love to continue our discussion over coffee sometime. I'm particularly curious about your experience with [relevant topic] and would be happy to share some insights from my work in [your area].</p>
                    <p>Would you be interested in meeting for 30 minutes next week? I'm happy to come to your area or we could meet virtually if that's easier.</p>
                    <p>Best regards,<br/>[Your name]"</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>🎯 Success Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Quality over Quantity</strong></p>
                  <p className="text-muted-foreground">5 meaningful offline conversations &gt; 500 online connections</p>
                  
                  <p><strong>Response Rate</strong></p>
                  <p className="text-muted-foreground">Aim for 20-30% positive response to meeting requests</p>
                  
                  <p><strong>Follow-Through</strong></p>
                  <p className="text-muted-foreground">90% of scheduled meetings should actually happen</p>
                  
                  <p><strong>Relationship Depth</strong></p>
                  <p className="text-muted-foreground">Focus on developing 10-15 strong relationships per year</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    }
  ];

  const checklistProgress = Object.values(platformChecklist).filter(Boolean).length;
  const totalChecklistItems = 11;
  const canProceed = steps[currentStep]?.type !== 'interactive' || checklistProgress >= 8;

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
          <h1 className="text-2xl font-bold">Module 4: Digital Networking Mastery</h1>
          <p className="text-muted-foreground">Leverage online platforms to expand your professional network</p>
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

      {/* Checklist Progress */}
      {steps[currentStep]?.type === 'interactive' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-700 font-medium">Profile Optimization Progress</span>
              <span className="text-blue-600">{checklistProgress}/{totalChecklistItems} completed</span>
            </div>
            <Progress value={(checklistProgress / totalChecklistItems) * 100} className="h-2" />
              <p className="text-blue-600 text-sm mt-2">
                {checklistProgress >= 8 ? '✅ Great job! Your profile is optimized.' : '💡 Complete at least 8 items to continue.'}
              </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NetworkingModule4;