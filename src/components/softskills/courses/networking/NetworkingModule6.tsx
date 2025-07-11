import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Calendar, HeartHandshake, Clock, CheckCircle, Target } from 'lucide-react';

interface NetworkingModule6Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const NetworkingModule6: React.FC<NetworkingModule6Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [relationshipPlan, setRelationshipPlan] = useState({
    touchPoints: '',
    valueOffers: '',
    systemSetup: ''
  });

  const steps = [
    {
      title: "The Relationship Lifecycle",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <HeartHandshake className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Understanding Professional Relationships</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Professional relationships evolve through distinct stages. Understanding these stages 
              helps you nurture connections appropriately and build lasting networks.
            </p>
            
            <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">🌱 Stage 1: Initial Contact (0-3 months)</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-700 space-y-2">
                  <p><strong>Focus:</strong> Building rapport and establishing credibility</p>
                  <p><strong>Activities:</strong> Follow-up messages, sharing relevant content, light social interaction</p>
                  <p><strong>Frequency:</strong> 1-2 touchpoints per month</p>
                  <p><strong>Goal:</strong> Move from stranger to acquaintance</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">🌿 Stage 2: Developing Connection (3-12 months)</CardTitle>
                </CardHeader>
                <CardContent className="text-green-700 space-y-2">
                  <p><strong>Focus:</strong> Finding mutual value and common ground</p>
                  <p><strong>Activities:</strong> Coffee meetings, collaboration opportunities, introductions</p>
                  <p><strong>Frequency:</strong> 1 touchpoint every 2-3 weeks</p>
                  <p><strong>Goal:</strong> Move from acquaintance to professional contact</p>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">🌳 Stage 3: Established Relationship (1+ years)</CardTitle>
                </CardHeader>
                <CardContent className="text-orange-700 space-y-2">
                  <p><strong>Focus:</strong> Mutual support and collaboration</p>
                  <p><strong>Activities:</strong> Regular check-ins, referrals, strategic partnerships</p>
                  <p><strong>Frequency:</strong> 1 touchpoint per month or as needed</p>
                  <p><strong>Goal:</strong> Strong professional relationship with mutual benefit</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Creating Your Relationship System",
      type: "interactive",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Target className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Build Your Relationship Management System</h2>
            <p className="text-muted-foreground">Create a systematic approach to maintaining your professional relationships</p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regular Touchpoint Schedule</CardTitle>
                <CardDescription>How will you stay in regular contact with your network?</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={4}
                  placeholder="e.g., Monthly coffee chats with top 10 contacts, quarterly check-ins with broader network via LinkedIn, bi-annual holiday/birthday messages..."
                  value={relationshipPlan.touchPoints}
                  onChange={(e) => setRelationshipPlan(prev => ({ ...prev, touchPoints: e.target.value }))}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Value-Add Strategies</CardTitle>
                <CardDescription>How will you provide ongoing value to your network?</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={4}
                  placeholder="e.g., Share relevant industry articles, make strategic introductions, offer expertise in my areas of strength, provide market insights..."
                  value={relationshipPlan.valueOffers}
                  onChange={(e) => setRelationshipPlan(prev => ({ ...prev, valueOffers: e.target.value }))}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System and Tools Setup</CardTitle>
                <CardDescription>What tools and processes will you use to track and manage relationships?</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={4}
                  placeholder="e.g., CRM system for tracking interactions, calendar reminders for follow-ups, spreadsheet with contact preferences, LinkedIn notes for context..."
                  value={relationshipPlan.systemSetup}
                  onChange={(e) => setRelationshipPlan(prev => ({ ...prev, systemSetup: e.target.value }))}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Staying Relevant and Valuable",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Clock className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Maintaining Long-Term Value</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              The key to long-term networking success is consistently providing value 
              and staying relevant to your connections' evolving needs.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">💎 Ways to Add Value</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Knowledge Sharing</h4>
                    <p className="text-xs text-muted-foreground">Industry insights, trend analysis, market updates</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Strategic Introductions</h4>
                    <p className="text-xs text-muted-foreground">Connect people who should know each other</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Resource Sharing</h4>
                    <p className="text-xs text-muted-foreground">Tools, templates, best practices, recommendations</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Skill Exchange</h4>
                    <p className="text-xs text-muted-foreground">Offer your expertise in exchange for learning</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Opportunity Alerts</h4>
                    <p className="text-xs text-muted-foreground">Job openings, speaking opportunities, partnerships</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">🔄 Staying Current</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Industry Monitoring</h4>
                    <p className="text-xs text-muted-foreground">Subscribe to trade publications, follow thought leaders</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Skill Development</h4>
                    <p className="text-xs text-muted-foreground">Continuous learning to maintain expertise</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Network Updates</h4>
                    <p className="text-xs text-muted-foreground">Track changes in contacts' roles and companies</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Content Creation</h4>
                    <p className="text-xs text-muted-foreground">Share your insights through articles and posts</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Event Participation</h4>
                    <p className="text-xs text-muted-foreground">Attend conferences to stay current and visible</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">⚠️ Relationship Maintenance Red Flags</CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700 space-y-2">
                <p>• Only reaching out when you need something</p>
                <p>• Forgetting important details about their work or life</p>
                <p>• Being inconsistent with follow-through</p>
                <p>• Not respecting their time or communication preferences</p>
                <p>• Failing to reciprocate when they provide value</p>
                <p>• Being too pushy or aggressive in requests</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Your Networking Action Plan",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your 90-Day Networking Plan</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-center">
              Congratulations! You've completed the Networking Like a Pro course. 
              Here's your action plan to implement what you've learned.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">Days 1-30: Foundation</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-700 space-y-2 text-sm">
                  <p>✓ Optimize your LinkedIn profile completely</p>
                  <p>✓ Craft and practice your elevator pitch</p>
                  <p>✓ Set up your relationship management system</p>
                  <p>✓ Identify 5 target networking events</p>
                  <p>✓ Reach out to 10 existing contacts</p>
                  <p>✓ Join 3 relevant industry groups online</p>
                  <p>✓ Start sharing valuable content weekly</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Days 31-60: Expansion</CardTitle>
                </CardHeader>
                <CardContent className="text-green-700 space-y-2 text-sm">
                  <p>✓ Attend 2 networking events</p>
                  <p>✓ Make 15 new meaningful connections</p>
                  <p>✓ Schedule 5 coffee meetings</p>
                  <p>✓ Make 3 strategic introductions</p>
                  <p>✓ Start a regular touchpoint schedule</p>
                  <p>✓ Engage actively in online communities</p>
                  <p>✓ Share 2 pieces of valuable content weekly</p>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">Days 61-90: Optimization</CardTitle>
                </CardHeader>
                <CardContent className="text-orange-700 space-y-2 text-sm">
                  <p>✓ Attend 2 more networking events</p>
                  <p>✓ Convert 10 contacts to ongoing relationships</p>
                  <p>✓ Launch a content series or newsletter</p>
                  <p>✓ Organize your own networking meetup</p>
                  <p>✓ Establish regular value-add routine</p>
                  <p>✓ Review and refine your system</p>
                  <p>✓ Set goals for the next quarter</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">🎯 Success Metrics to Track</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-700 space-y-2">
                <p><strong>Relationship Quality:</strong> Number of meaningful 1:1 conversations per month</p>
                <p><strong>Network Growth:</strong> New connections that lead to ongoing relationships</p>
                <p><strong>Value Creation:</strong> Introductions made, resources shared, help provided</p>
                <p><strong>Visibility:</strong> Speaking opportunities, content engagement, event invitations</p>
                <p><strong>Opportunities:</strong> Job leads, collaboration requests, consulting inquiries</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">🏆 You're Now Ready to Network Like a Pro!</CardTitle>
              </CardHeader>
              <CardContent className="text-green-700 space-y-2">
                <p>You now have the tools, strategies, and mindset to build a powerful professional network.</p>
                <p><strong>Remember:</strong> Networking is about relationships, not transactions. Focus on giving value, being authentic, and maintaining consistency.</p>
                <p><strong>Keep learning:</strong> The best networkers never stop improving their relationship-building skills.</p>
                <p><strong>Pay it forward:</strong> As your network grows, help others build theirs too.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ];

  const canProceed = () => {
    if (steps[currentStep]?.type === 'interactive') {
      return relationshipPlan.touchPoints.length > 30 && 
             relationshipPlan.valueOffers.length > 30 && 
             relationshipPlan.systemSetup.length > 30;
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
          <h1 className="text-2xl font-bold">Module 6: Long-term Relationship Management</h1>
          <p className="text-muted-foreground">Maintain and nurture your professional relationships over time</p>
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
          {currentStep === steps.length - 1 ? 'Complete Course' : 'Next'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Planning Progress */}
      {steps[currentStep]?.type === 'interactive' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-blue-700 text-sm">
              💡 Complete your relationship management plan above to finish the course. This will be your roadmap for long-term networking success!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Completion Message */}
      {currentStep === steps.length - 1 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="space-y-2">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="text-lg font-bold text-green-800">Congratulations!</h3>
              <p className="text-green-700">
                You've completed the Networking Like a Pro course. You're now equipped with the skills and strategies to build powerful professional relationships.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NetworkingModule6;