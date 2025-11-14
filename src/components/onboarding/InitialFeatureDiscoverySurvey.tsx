import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { generatePersonalizedRecommendations } from '@/lib/personalizationEngine';
import { z } from 'zod';
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Briefcase, 
  Trophy,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

const surveySchema = z.object({
  primary_goal: z.string().min(1, "Please select a goal"),
  finance_comfort_level: z.number().min(1).max(10),
  primary_finance_interest: z.string().min(1, "Please select an interest"),
  learning_style: z.string().min(1, "Please select a learning style"),
  daily_time_commitment: z.string().min(1, "Please select time commitment"),
  career_interest_level: z.string().min(1, "Please select career interest"),
  motivation_style: z.string().min(1, "Please select motivation"),
});

interface SurveyData {
  primary_goal: string;
  finance_comfort_level: number;
  primary_finance_interest: string;
  learning_style: string;
  daily_time_commitment: string;
  career_interest_level: string;
  motivation_style: string;
}

interface InitialFeatureDiscoverySurveyProps {
  onComplete: () => void;
}

export const InitialFeatureDiscoverySurvey = ({ onComplete }: InitialFeatureDiscoverySurveyProps) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const [surveyData, setSurveyData] = useState<SurveyData>({
    primary_goal: '',
    finance_comfort_level: 5,
    primary_finance_interest: '',
    learning_style: '',
    daily_time_commitment: '',
    career_interest_level: '',
    motivation_style: '',
  });

  const totalSteps = 7;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateField = (field: keyof SurveyData, value: string | number) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate survey data
      surveySchema.parse(surveyData);
      
      setLoading(true);

      if (!user) return;

      // Generate personalized recommendations
      const personalizedRecs = generatePersonalizedRecommendations(surveyData);
      setRecommendations(personalizedRecs);

      // Save survey results to database
      await supabase
        .from('profiles')
        .update({
          survey_completed: true,
          survey_completed_at: new Date().toISOString(),
          primary_goal: surveyData.primary_goal,
          finance_comfort_level: surveyData.finance_comfort_level,
          primary_finance_interest: surveyData.primary_finance_interest,
          learning_style: surveyData.learning_style,
          daily_time_commitment: surveyData.daily_time_commitment,
          career_interest_level: surveyData.career_interest_level,
          motivation_style: surveyData.motivation_style,
          survey_results: surveyData,
        })
        .eq('id', user.id);

      // Show confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setShowResults(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors);
      } else {
        console.error('Error submitting survey:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return surveyData.primary_goal !== '';
      case 1: return surveyData.finance_comfort_level > 0;
      case 2: return surveyData.primary_finance_interest !== '';
      case 3: return surveyData.learning_style !== '';
      case 4: return surveyData.daily_time_commitment !== '';
      case 5: return surveyData.career_interest_level !== '';
      case 6: return surveyData.motivation_style !== '';
      default: return false;
    }
  };

  if (showResults && recommendations) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Your Personalized Finance Journey!</CardTitle>
          <CardDescription>Based on your answers, here's what we recommend</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">🎯 Your Best Starting Point</h3>
              <p className="text-sm text-muted-foreground">{recommendations.recommendedJourney}</p>
            </div>

            <div className="p-4 bg-secondary/5 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">✨ Features You'll Love</h3>
              <ul className="space-y-2">
                {recommendations.suggestedFeatures.map((feature: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-accent/5 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">🚀 Quick Start Actions</h3>
              <ol className="space-y-2">
                {recommendations.firstSteps.map((step: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="font-semibold text-primary">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">📊 Your Profile</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Learning Type:</span>
                  <p className="font-medium">{recommendations.behavioralSegment}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Time Commitment:</span>
                  <p className="font-medium">{surveyData.daily_time_commitment.replace('min', ' min').replace('plus', '+')}</p>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={onComplete} className="w-full" size="lg">
            Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Personalize Your Experience</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question 1: Primary Goal */}
        {currentStep === 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">What's your biggest money goal?</h3>
                <p className="text-sm text-muted-foreground">This helps us personalize your journey</p>
              </div>
            </div>
            <RadioGroup value={surveyData.primary_goal} onValueChange={(v) => updateField('primary_goal', v)}>
              <div className="grid gap-3">
                {[
                  { value: 'save_money', label: '💰 Save Money', desc: 'Build an emergency fund and save for goals' },
                  { value: 'invest', label: '📈 Learn to Invest', desc: 'Grow wealth through smart investing' },
                  { value: 'buy_house', label: '🏠 Buy a House', desc: 'Save and plan for homeownership' },
                  { value: 'start_business', label: '🚀 Start a Business', desc: 'Understand business finance' },
                  { value: 'understand_money', label: '🧠 Understand Money', desc: 'Build financial literacy' },
                  { value: 'get_job', label: '💼 Get a Finance Job', desc: 'Start a career in finance' },
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-accent/50 ${
                      surveyData.primary_goal === option.value ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.desc}</div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Question 2: Finance Comfort Level */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">How comfortable are you with finance topics?</h3>
                <p className="text-sm text-muted-foreground">Be honest - we'll match content to your level</p>
              </div>
            </div>
            <div className="space-y-6 py-4">
              <Slider
                value={[surveyData.finance_comfort_level]}
                onValueChange={(v) => updateField('finance_comfort_level', v[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Complete Beginner</span>
                <span className="font-semibold text-primary text-lg">{surveyData.finance_comfort_level}</span>
                <span className="text-muted-foreground">Expert</span>
              </div>
            </div>
          </div>
        )}

        {/* Question 3: Primary Finance Interest */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Which finance topic interests you MOST?</h3>
                <p className="text-sm text-muted-foreground">We'll prioritize this in your learning path</p>
              </div>
            </div>
            <RadioGroup value={surveyData.primary_finance_interest} onValueChange={(v) => updateField('primary_finance_interest', v)}>
              <div className="grid gap-3">
                {[
                  { value: 'budgeting', label: '💵 Budgeting & Saving', desc: 'Master your money management' },
                  { value: 'investing', label: '📊 Stock Market & Investing', desc: 'Learn to grow your wealth' },
                  { value: 'taxes', label: '📋 Taxes & Financial Planning', desc: 'Optimize your tax strategy' },
                  { value: 'credit', label: '💳 Credit & Debt Management', desc: 'Build and manage credit wisely' },
                  { value: 'careers', label: '🎓 Finance Careers', desc: 'Explore finance job opportunities' },
                  { value: 'saving', label: '🏦 Retirement & Long-term Saving', desc: 'Plan for your financial future' },
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-accent/50 ${
                      surveyData.primary_finance_interest === option.value ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.desc}</div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Question 4: Learning Style - HIGHLIGHTS FLASHCARDS! */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">How do you learn best?</h3>
                <p className="text-sm text-muted-foreground">We'll customize your learning experience</p>
              </div>
            </div>
            <RadioGroup value={surveyData.learning_style} onValueChange={(v) => updateField('learning_style', v)}>
              <div className="grid gap-3">
                {[
                  { value: 'flashcards', label: '🎴 Flashcards & Quick Reviews', desc: 'Perfect for memorizing key concepts fast!', highlight: true },
                  { value: 'videos', label: '🎥 Videos & Visual Content', desc: 'Watch and learn from video lessons' },
                  { value: 'games', label: '🎮 Mini-Games & Challenges', desc: 'Gamified learning with fun activities' },
                  { value: 'reading', label: '📖 Reading & Articles', desc: 'Deep-dive into detailed content' },
                  { value: 'interactive', label: '⚡ Hands-on Practice', desc: 'Learn by doing with interactive tools' },
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-accent/50 ${
                      surveyData.learning_style === option.value ? 'bg-primary/5 border-primary' : ''
                    } ${option.highlight ? 'border-primary/30 shadow-sm' : ''}`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {option.label}
                        {option.highlight && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Popular</span>}
                      </div>
                      <div className="text-xs text-muted-foreground">{option.desc}</div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Question 5: Time Commitment */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">How much time can you spend daily?</h3>
                <p className="text-sm text-muted-foreground">We'll recommend content that fits your schedule</p>
              </div>
            </div>
            <RadioGroup value={surveyData.daily_time_commitment} onValueChange={(v) => updateField('daily_time_commitment', v)}>
              <div className="grid gap-3">
                {[
                  { value: '5min', label: '⚡ 5 Minutes', desc: 'Quick daily tips and micro-lessons' },
                  { value: '15min', label: '📚 15 Minutes', desc: 'Complete 1-2 lessons per day' },
                  { value: '30plus', label: '🎯 30+ Minutes', desc: 'Deep learning sessions and projects' },
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-accent/50 ${
                      surveyData.daily_time_commitment === option.value ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.desc}</div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Question 6: Career Interest */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Are you interested in a career in finance?</h3>
                <p className="text-sm text-muted-foreground">We can include career-focused content</p>
              </div>
            </div>
            <RadioGroup value={surveyData.career_interest_level} onValueChange={(v) => updateField('career_interest_level', v)}>
              <div className="grid gap-3">
                {[
                  { value: 'not_interested', label: '❌ Not At All', desc: 'Just here for personal finance' },
                  { value: 'curious', label: '🤔 A Little Curious', desc: 'Open to learning about finance careers' },
                  { value: 'very_interested', label: '✨ Very Interested', desc: 'Considering a finance career path' },
                  { value: 'career_focused', label: '🎯 Career-Focused', desc: 'Actively pursuing finance career' },
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-accent/50 ${
                      surveyData.career_interest_level === option.value ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.desc}</div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Question 7: Motivation Style */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">What gets you excited to learn?</h3>
                <p className="text-sm text-muted-foreground">Last question! This helps us motivate you</p>
              </div>
            </div>
            <RadioGroup value={surveyData.motivation_style} onValueChange={(v) => updateField('motivation_style', v)}>
              <div className="grid gap-3">
                {[
                  { value: 'competition', label: '🏆 Competing with Others', desc: 'Leaderboards and challenges excite me' },
                  { value: 'achievement', label: '⭐ Earning Achievements', desc: 'Badges, streaks, and milestones drive me' },
                  { value: 'learning', label: '📚 Gaining Knowledge', desc: 'Pure learning and mastery motivate me' },
                  { value: 'social', label: '👥 Connecting with Peers', desc: 'Learning together with a community' },
                  { value: 'money', label: '💰 Making Money', desc: 'Financial success is my main goal' },
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-accent/50 ${
                      surveyData.motivation_style === option.value ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.desc}</div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {currentStep > 0 && (
            <Button onClick={handleBack} variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}
          <Button 
            onClick={handleNext} 
            disabled={!canProceed() || loading}
            className="flex-1"
            size="lg"
          >
            {loading ? 'Processing...' : currentStep === totalSteps - 1 ? 'Complete Survey' : 'Next'} 
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
