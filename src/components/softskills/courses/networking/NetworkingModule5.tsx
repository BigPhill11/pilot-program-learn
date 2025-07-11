import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Calendar, Users, Coffee, CheckCircle, MapPin } from 'lucide-react';

interface NetworkingModule5Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const NetworkingModule5: React.FC<NetworkingModule5Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventPlan, setEventPlan] = useState({
    objectives: '',
    targetContacts: '',
    followUpPlan: ''
  });

  const steps = [
    {
      title: "Types of Networking Events",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Networking Event Landscape</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Different types of networking events require different strategies. Understanding 
              the format and purpose helps you prepare effectively.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">🏢 Corporate Events</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-700 space-y-2">
                  <p><strong>Types:</strong> Company mixers, product launches, open houses</p>
                  <p><strong>Atmosphere:</strong> Professional, structured</p>
                  <p><strong>Best for:</strong> Learning about specific companies, meeting employees</p>
                  <p><strong>Strategy:</strong> Research the company beforehand, prepare thoughtful questions</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">🎯 Industry Conferences</CardTitle>
                </CardHeader>
                <CardContent className="text-green-700 space-y-2">
                  <p><strong>Types:</strong> Trade shows, summits, professional conventions</p>
                  <p><strong>Atmosphere:</strong> Educational, high-energy</p>
                  <p><strong>Best for:</strong> Learning trends, meeting industry leaders</p>
                  <p><strong>Strategy:</strong> Attend sessions, participate in Q&A, use event apps</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-800">🍷 Social Mixers</CardTitle>
                </CardHeader>
                <CardContent className="text-purple-700 space-y-2">
                  <p><strong>Types:</strong> Happy hours, cocktail parties, social clubs</p>
                  <p><strong>Atmosphere:</strong> Casual, relaxed</p>
                  <p><strong>Best for:</strong> Building personal connections, follow-up meetings</p>
                  <p><strong>Strategy:</strong> Focus on conversation, find common interests</p>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">🎓 Educational Events</CardTitle>
                </CardHeader>
                <CardContent className="text-orange-700 space-y-2">
                  <p><strong>Types:</strong> Workshops, seminars, lunch-and-learns</p>
                  <p><strong>Atmosphere:</strong> Learning-focused, interactive</p>
                  <p><strong>Best for:</strong> Meeting like-minded professionals, skill development</p>
                  <p><strong>Strategy:</strong> Engage in discussions, share experiences</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Pre-Event Preparation",
      type: "interactive",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Strategic Event Planning</h2>
            <p className="text-muted-foreground">Proper preparation is the key to networking success</p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Objectives</CardTitle>
                <CardDescription>What do you want to achieve at this event?</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="e.g., Meet 5 new people in my target industry, learn about current market trends, find potential mentors..."
                  value={eventPlan.objectives}
                  onChange={(e) => setEventPlan(prev => ({ ...prev, objectives: e.target.value }))}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Target Contacts</CardTitle>
                <CardDescription>Who do you most want to meet? (Research speakers, attendees, sponsors)</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="e.g., Sarah Johnson (keynote speaker from XYZ Corp), representatives from ABC Consulting, other analysts in financial services..."
                  value={eventPlan.targetContacts}
                  onChange={(e) => setEventPlan(prev => ({ ...prev, targetContacts: e.target.value }))}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Follow-Up Plan</CardTitle>
                <CardDescription>How will you follow up with new connections?</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="e.g., Send LinkedIn invites within 24 hours, share relevant articles discussed, suggest coffee meetings for top 3 connections..."
                  value={eventPlan.followUpPlan}
                  onChange={(e) => setEventPlan(prev => ({ ...prev, followUpPlan: e.target.value }))}
                />
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">📋 Pre-Event Checklist</CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700 space-y-2">
                <p>✓ Research the event, speakers, and attendees</p>
                <p>✓ Update your elevator pitch for the audience</p>
                <p>✓ Prepare business cards or digital contact sharing</p>
                <p>✓ Plan your outfit (professional and comfortable)</p>
                <p>✓ Set networking goals (quality over quantity)</p>
                <p>✓ Download event app or review agenda</p>
                <p>✓ Eat beforehand (don't network on an empty stomach)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Working the Room",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Event Navigation Strategies</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Effective event networking is about strategic movement and meaningful conversations, 
              not collecting as many business cards as possible.
            </p>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">🎯 The Strategic Approach</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700 space-y-3">
                <div>
                  <h4 className="font-semibold">1. Arrive Early</h4>
                  <p className="text-sm">When there are fewer people, it's easier to approach others and get noticed</p>
                </div>
                <div>
                  <h4 className="font-semibold">2. Position Yourself Strategically</h4>
                  <p className="text-sm">Near registration, refreshments, or main pathways - natural conversation starters</p>
                </div>
                <div>
                  <h4 className="font-semibold">3. Use the "Host Mindset"</h4>
                  <p className="text-sm">Act like you're hosting the event - introduce people to each other</p>
                </div>
                <div>
                  <h4 className="font-semibold">4. The 10-Minute Rule</h4>
                  <p className="text-sm">Spend 10 minutes max with each person before moving on</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">✅ Do This</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Approach groups of 3+ people (easier to join)</p>
                  <p>• Listen to the conversation before jumping in</p>
                  <p>• Ask open-ended questions about their work</p>
                  <p>• Share interesting insights, not just your resume</p>
                  <p>• Introduce people who should know each other</p>
                  <p>• Take notes on business cards immediately</p>
                  <p>• Have an exit strategy for conversations</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">❌ Avoid This</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Approaching closed groups of 2 people</p>
                  <p>• Dominating conversations</p>
                  <p>• Leading with what you need</p>
                  <p>• Staying in one spot all night</p>
                  <p>• Checking your phone constantly</p>
                  <p>• Eating messy foods while networking</p>
                  <p>• Overstaying your welcome in conversations</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">💬 Conversation Starters for Events</CardTitle>
              </CardHeader>
              <CardContent className="text-purple-700 space-y-2">
                <p>• "How are you connected to [event/organization]?"</p>
                <p>• "What's been the highlight of the event for you so far?"</p>
                <p>• "What brought you to this event?"</p>
                <p>• "Have you heard [speaker's name] present before?"</p>
                <p>• "What's your take on [relevant industry topic]?"</p>
                <p>• "Are you familiar with [event sponsor/organizer]?"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: "Post-Event Follow-Up",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Coffee className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Turning Contacts into Connections</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              The real networking happens after the event. Your follow-up strategy determines 
              whether a brief conversation becomes a valuable professional relationship.
            </p>
            
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">⏰ The 24-48 Hour Rule</CardTitle>
              </CardHeader>
              <CardContent className="text-green-700">
                <p>Follow up within 24-48 hours while the conversation is still fresh in their memory. This shows professionalism and genuine interest.</p>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>📧 Follow-Up Message Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="bg-muted p-3 rounded text-xs">
                    <p><strong>Subject:</strong> Great meeting you at [Event Name]</p>
                    <p className="mt-2">"Hi [Name],</p>
                    <p>It was great meeting you at [Event] yesterday. I really enjoyed our conversation about [specific topic you discussed].</p>
                    <p>As promised, I'm attaching that [article/resource] we talked about. I thought you might find it interesting given your work on [their project/interest].</p>
                    <p>I'd love to continue our conversation over coffee sometime. Are you free for a 30-minute chat next week?</p>
                    <p>Best regards,<br/>[Your name]"</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>📊 Follow-Up Strategy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Tier 1: High Priority (Same day)</h4>
                    <p className="text-xs text-muted-foreground">VIP contacts, potential mentors, exciting opportunities</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Tier 2: Medium Priority (24-48 hours)</h4>
                    <p className="text-xs text-muted-foreground">Interesting conversations, potential collaborations</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Tier 3: Lower Priority (Within a week)</h4>
                    <p className="text-xs text-muted-foreground">General contacts, brief interactions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">🎯 Post-Event Action Plan</CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700 space-y-2">
                <p><strong>Day of Event:</strong> Review and organize all contacts, add context notes</p>
                <p><strong>Next Day:</strong> Send follow-up messages to Tier 1 contacts</p>
                <p><strong>Day 2-3:</strong> Follow up with Tier 2 contacts</p>
                <p><strong>Week 1:</strong> Connect with all contacts on LinkedIn</p>
                <p><strong>Week 2:</strong> Schedule coffee meetings with interested parties</p>
                <p><strong>Month 1:</strong> Check in with all new connections</p>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">💡 Value-Add Follow-Up Ideas</CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700 space-y-2">
                <p>• Share a relevant article or resource</p>
                <p>• Make an introduction to someone in your network</p>
                <p>• Invite them to another relevant event</p>
                <p>• Share insights from a session they missed</p>
                <p>• Offer to be a resource for their current challenges</p>
                <p>• Send a personalized LinkedIn article mention</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ];

  const canProceed = () => {
    if (steps[currentStep]?.type === 'interactive') {
      return eventPlan.objectives.length > 20 && eventPlan.targetContacts.length > 20 && eventPlan.followUpPlan.length > 20;
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
          <h1 className="text-2xl font-bold">Module 5: Event Networking Strategies</h1>
          <p className="text-muted-foreground">Master the art of networking at professional events</p>
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

      {/* Planning Progress */}
      {steps[currentStep]?.type === 'interactive' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-blue-700 text-sm">
              💡 Complete your event planning strategy above to continue. Good preparation is key to networking success!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NetworkingModule5;