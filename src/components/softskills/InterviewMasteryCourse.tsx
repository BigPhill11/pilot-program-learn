
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Award, CheckCircle } from 'lucide-react';
import InterviewMasteryModule from './InterviewMasteryModule';
import ElevatorPitchGame from './interview-games/ElevatorPitchGame';
import StarMethodGame from './interview-games/StarMethodGame';
import TechnicalDrillGame from './interview-games/TechnicalDrillGame';
import InterviewEtiquetteGame from './interview-games/InterviewEtiquetteGame';
import ThankYouNoteGame from './interview-games/ThankYouNoteGame';

interface InterviewMasteryCourseProps {
  onBack: () => void;
}

const InterviewMasteryCourse: React.FC<InterviewMasteryCourseProps> = ({ onBack }) => {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, boolean>>({});
  const [currentModule, setCurrentModule] = useState<number | null>(null);

  const modules = [
    {
      id: 1,
      title: "Interview Mindset & Preparation",
      objective: "Build foundational confidence, understand the interview journey, and establish the right mindset.",
      content: [
        "Know your 'Why Finance' and your story (including resume walkthrough)",
        "Develop a confident and concise elevator pitch",
        "Research the firm: recent deals, culture, leadership, market position", 
        "Prepare STAR-format stories (Situation, Task, Action, Result) for behavioral questions",
        "Practice common technicals (valuation, accounting, markets, etc.)"
      ],
      assignment: "Write and record a 1-minute pitch about yourself; practice answering: 'Tell me about yourself.'",
      quiz: {
        topicId: "interview-mindset",
        question: "What is the most important element of interview preparation?",
        options: [
          "Memorizing technical formulas",
          "Understanding your story and why you want the role",
          "Researching the company's stock price",
          "Practicing handshakes"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "The most important element is understanding your own story and motivations. Technical knowledge is important, but authenticity and clarity about your goals matter most."
      },
      game: {
        title: "Elevator Pitch Timer Challenge",
        description: "Practice delivering your elevator pitch in under 60 seconds with our interactive timer!",
        component: ElevatorPitchGame
      }
    },
    {
      id: 2,
      title: "Behavioral Mastery",
      objective: "Learn how to showcase leadership, drive, and fit in a compelling, authentic way.",
      content: [
        "Top Behavioral Questions: Why this firm? Tell me about a time you failed",
        "Leadership under pressure and teamwork examples",
        "Conflict resolution strategies",
        "Best Practices: Be honest but strategic (don't overshare)",
        "Quantify your impact: 'Increased engagement by 40%...'",
        "Tailor answers to reflect traits finance firms value: grit, curiosity, work ethic"
      ],
      assignment: "Write 5 STAR-format stories aligned to common behavioral questions.",
      quiz: {
        topicId: "behavioral-mastery",
        question: "What does the 'R' in STAR method stand for?",
        options: [
          "Reason",
          "Result", 
          "Reflection",
          "Response"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "The 'R' stands for Result - always end your behavioral answers by explaining the positive outcome and impact of your actions."
      },
      game: {
        title: "STAR Method Story Builder",
        description: "Build compelling behavioral interview answers using the STAR framework with guided practice!",
        component: StarMethodGame
      }
    },
    {
      id: 3,
      title: "Technical Excellence", 
      objective: "Be able to confidently answer technical questions across accounting, valuation, markets, and modeling.",
      content: [
        "3 financial statements and how they link together",
        "DCF (discounted cash flow) & valuation methods",
        "Market comps and precedent transactions",
        "Walk me through a DCF methodology",
        "Impact of changes in depreciation or interest rates on statements",
        "Market Awareness: Fed Funds Rate, 10-year Treasury, S&P 500 level",
        "Explain how interest rates affect markets"
      ],
      assignment: "Complete 10 technical questions from practice sources and get peer feedback.",
      quiz: {
        topicId: "technical-excellence",
        question: "If depreciation increases by $10, what happens to net income (assuming 40% tax rate)?",
        options: [
          "Decreases by $10",
          "Decreases by $6",
          "Decreases by $4", 
          "No change"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "Net income decreases by $6. Depreciation reduces operating income by $10, but creates a $4 tax shield (40% × $10), so the net impact is $6."
      },
      game: {
        title: "Technical Question Drill",
        description: "Test your technical knowledge with timed questions across different difficulty levels!",
        component: TechnicalDrillGame
      }
    },
    {
      id: 4,
      title: "Interview Day Etiquette & Execution",
      objective: "Understand how to carry yourself during interviews and leave a lasting impression.",
      content: [
        "Dress code: Always formal (unless told otherwise)",
        "Zoom etiquette: Eye contact, lighting, no background distractions",
        "Arrive 10–15 minutes early",
        "Ask thoughtful questions at the end of the interview",
        "Always smile and say thank you",
        "Sample Questions: What's the most rewarding part of working here?",
        "How is feedback typically delivered on your team?",
        "What are the top traits you see in successful analysts?"
      ],
      assignment: "Record a mock interview with a friend or coach and assess performance.",
      quiz: {
        topicId: "interview-etiquette",
        question: "When should you arrive at the interviewer's office floor?",
        options: [
          "Exactly on time",
          "30 minutes early",
          "10-15 minutes early",
          "5 minutes late to seem relaxed"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrect: "Arrive 10-15 minutes early to show punctuality without being disruptive. This gives you time to settle in and shows respect for their schedule."
      },
      game: {
        title: "Interview Etiquette Scenarios",
        description: "Navigate common interview situations and learn the best practices for professional behavior!",
        component: InterviewEtiquetteGame
      }
    },
    {
      id: 5,
      title: "Post-Interview Communication",
      objective: "Handle both positive and negative outcomes with professionalism.",
      content: [
        "Thank You Notes: Send within 12–24 hours",
        "Reiterate enthusiasm for the role",
        "Reference something specific from the conversation",
        "Offer Received: Ask for the offer in writing",
        "Express gratitude and excitement",
        "Clarify timelines and next steps",
        "Rejection Received: Respond with grace",
        "Ask for feedback if appropriate",
        "Stay connected for future opportunities"
      ],
      assignment: "Write both a thank you note and a professional rejection response.",
      quiz: {
        topicId: "post-interview",
        question: "What should you include in a thank you email?",
        options: [
          "Just a simple 'thank you'",
          "Gratitude, specific conversation reference, and reiterated interest",
          "Questions about salary",
          "Criticism of other candidates"
        ],
        correctAnswerIndex: 1,
        feedbackForIncorrect: "A good thank you email should express gratitude, reference something specific from your conversation, and reiterate your interest in the role."
      },
      game: {
        title: "Thank You Note Builder",
        description: "Practice writing professional thank you notes for different interview scenarios!",
        component: ThankYouNoteGame
      }
    },
    {
      id: 6,
      title: "Final Tips & Weekly Prep Routine",
      objective: "Build interview stamina and continuously improve.",
      content: [
        "Weekly checklist for consistent preparation",
        "2 mock interviews per week minimum",
        "Read WSJ, Bloomberg, or Axios for market trends",
        "Revisit 3 technicals and 1 behavioral answer weekly",
        "Stay positive, consistent, and coachable",
        "Build confidence through repetition",
        "Learn from each interview experience",
        "Maintain momentum throughout recruiting season"
      ],
      assignment: "Create your personalized weekly prep routine and commit to following it for the next month.",
      quiz: {
        topicId: "prep-routine",
        question: "How often should you practice mock interviews?",
        options: [
          "Once a month",
          "Only before real interviews",
          "At least twice per week",
          "Only when you feel nervous"
        ],
        correctAnswerIndex: 2,
        feedbackForIncorrected: "Practice at least twice per week to build and maintain your interview skills. Consistent practice builds confidence and helps you improve continuously."
      }
    }
  ];

  const handleModuleComplete = (moduleId: number) => {
    setCompletedModules(prev => [...prev, moduleId]);
    setCurrentModule(null);
  };

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    setQuizScores(prev => ({
      ...prev,
      [topicId]: isCorrect
    }));
  };

  const isModuleUnlocked = (moduleId: number) => {
    return moduleId === 1 || completedModules.includes(moduleId - 1);
  };

  const isModuleCompleted = (moduleId: number) => {
    return completedModules.includes(moduleId);
  };

  const progressPercentage = (completedModules.length / modules.length) * 100;

  if (currentModule !== null) {
    const module = modules.find(m => m.id === currentModule);
    if (!module) return null;

    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setCurrentModule(null)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course Overview
        </Button>
        
        <InterviewMasteryModule
          module={module}
          isUnlocked={isModuleUnlocked(module.id)}
          isCompleted={isModuleCompleted(module.id)}
          onComplete={handleModuleComplete}
          onQuizComplete={handleQuizComplete}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>

      {/* Course Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Award className="h-12 w-12 text-blue-600" />
            <div>
              <CardTitle className="text-2xl text-blue-800">Professional Interviewing Mastery</CardTitle>
              <p className="text-blue-700">Master every aspect of the finance interview process</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Course Progress</span>
              <span>{completedModules.length}/{modules.length} modules completed</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex gap-2 flex-wrap mt-4">
              <Badge variant="outline">6 Interactive Modules</Badge>
              <Badge variant="outline">Hands-on Games</Badge>
              <Badge variant="outline">Real Interview Scenarios</Badge>
              <Badge variant="outline">Practical Assignments</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isUnlocked = isModuleUnlocked(module.id);
          const isCompleted = isModuleCompleted(module.id);
          
          return (
            <Card 
              key={module.id} 
              className={`transition-all cursor-pointer hover:shadow-lg ${
                !isUnlocked ? 'opacity-60' : 
                isCompleted ? 'border-green-200 bg-green-50' : 
                'border-primary hover:border-primary'
              }`}
              onClick={() => isUnlocked && setCurrentModule(module.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge 
                    variant={isCompleted ? 'default' : 'secondary'}
                    className={isCompleted ? 'bg-green-600' : ''}
                  >
                    Module {module.id}
                  </Badge>
                  {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {!isUnlocked && <span className="text-2xl">🔒</span>}
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{module.objective}</p>
                {module.game && (
                  <Badge variant="outline" className="text-xs">
                    Interactive Game Included
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Course Completion */}
      {completedModules.length === modules.length && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Award className="h-16 w-16 mx-auto mb-4 text-green-600" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-green-700">
              You've completed the Professional Interviewing Mastery course! 
              You're now ready to excel in any finance interview.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewMasteryCourse;
