import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

type BehavioralSegment = 'explorer' | 'learner' | 'trader' | 'social' | 'passive' | 'dormant';

interface SegmentProfile {
  segment: BehavioralSegment;
  confidence: number; // 0-100
  primaryBehaviors: string[];
  recommendations: string[];
  onboardingFocus: string;
}

interface ActivityPattern {
  category: string;
  count: number;
  totalDuration: number;
  avgEngagement: number;
}

export const useBehavioralSegmentation = () => {
  const { user, profile } = useAuth();
  const [segmentProfile, setSegmentProfile] = useState<SegmentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const analyzeUserBehavior = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Get recent activity (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: activities, error } = await supabase
        .from('user_activity_log' as any)
        .select('activity_category, duration_seconds, engagement_level')
        .eq('user_id', user.id)
        .gte('timestamp', sevenDaysAgo.toISOString());

      if (error) throw error;

      if (!activities || activities.length === 0) {
        // New user - determine from survey if available
        if (profile?.survey_completed) {
          setSegmentProfile(determineSegmentFromSurvey());
        } else {
          setSegmentProfile({
            segment: 'explorer',
            confidence: 50,
            primaryBehaviors: ['New user exploring features'],
            recommendations: [
              'Complete the feature discovery survey',
              'Try exploring different sections of the app',
              'Complete your first quiz to get started',
            ],
            onboardingFocus: 'Guide user to discover core features through exploration',
          });
        }
        setLoading(false);
        return;
      }

      // Analyze activity patterns
      const patterns = analyzeActivityPatterns(activities);
      const segment = determineSegment(patterns, activities.length);

    // Update profile if segment changed
    if (profile?.behavioral_segment !== segment.segment) {
      await supabase
        .from('profiles')
        .update({ behavioral_segment: segment.segment } as any)
        .eq('id', user.id);
    }

      setSegmentProfile(segment);
      setLoading(false);
    } catch (error) {
      console.error('Error analyzing behavior:', error);
      setLoading(false);
    }
  };

  const analyzeActivityPatterns = (activities: any[]): ActivityPattern[] => {
    const categoryMap = new Map<string, { count: number; totalDuration: number; engagementSum: number }>();

    activities.forEach(activity => {
      const category = activity.activity_category;
      const duration = activity.duration_seconds || 0;
      const engagement = activity.engagement_level === 'deep' ? 3 : activity.engagement_level === 'active' ? 2 : 1;

      if (!categoryMap.has(category)) {
        categoryMap.set(category, { count: 0, totalDuration: 0, engagementSum: 0 });
      }

      const current = categoryMap.get(category)!;
      current.count += 1;
      current.totalDuration += duration;
      current.engagementSum += engagement;
    });

    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      totalDuration: data.totalDuration,
      avgEngagement: data.engagementSum / data.count,
    }));
  };

  const determineSegment = (patterns: ActivityPattern[], totalActivities: number): SegmentProfile => {
    const totalDuration = patterns.reduce((sum, p) => sum + p.totalDuration, 0);
    const avgEngagement = patterns.reduce((sum, p) => sum + p.avgEngagement, 0) / patterns.length;

    // Calculate category percentages
    const categoryPercentages = patterns.map(p => ({
      category: p.category,
      percentage: (p.totalDuration / totalDuration) * 100,
      engagement: p.avgEngagement,
    }));

    // LEARNER: 60%+ time in Learn, high engagement
    const learnPercent = categoryPercentages.find(c => c.category === 'learn')?.percentage || 0;
    if (learnPercent >= 60 && avgEngagement >= 2) {
      return {
        segment: 'learner',
        confidence: Math.min(100, Math.round(learnPercent + (avgEngagement * 10))),
        primaryBehaviors: ['Focused on learning', 'Completes quizzes', 'Returns regularly'],
        recommendations: [
          'Show progression path and advanced content',
          'Unlock next learning level',
          'Suggest related topics based on interests',
        ],
        onboardingFocus: 'Guide to complete learning journey and unlock advanced topics',
      };
    }

    // TRADER: 50%+ time in Paper Trading
    const tradePercent = categoryPercentages.find(c => c.category === 'trade')?.percentage || 0;
    if (tradePercent >= 50) {
      return {
        segment: 'trader',
        confidence: Math.min(100, Math.round(tradePercent + 20)),
        primaryBehaviors: ['Active with trading', 'Checks market data', 'Makes frequent trades'],
        recommendations: [
          'Teach advanced trading strategies',
          'Show portfolio analysis',
          'Suggest risk management content',
        ],
        onboardingFocus: 'Guide to advanced trading features and strategies',
      };
    }

    // SOCIAL: 50%+ time in Phil's Friends
    const socialPercent = categoryPercentages.find(c => c.category === 'phils_friends')?.percentage || 0;
    if (socialPercent >= 50) {
      return {
        segment: 'social',
        confidence: Math.min(100, Math.round(socialPercent + 20)),
        primaryBehaviors: ['Watches videos', 'Engages with community', 'Social learner'],
        recommendations: [
          'Encourage peer learning',
          'Share achievements with community',
          'Join weekly finance discussions',
        ],
        onboardingFocus: 'Connect user with community and social learning features',
      };
    }

    // EXPLORER: Visits many tabs (4+), short time per page
    const uniqueCategories = new Set(patterns.map(p => p.category)).size;
    const avgTimePerActivity = totalDuration / totalActivities;
    if (uniqueCategories >= 4 && avgTimePerActivity < 120) {
      return {
        segment: 'explorer',
        confidence: Math.min(100, Math.round((uniqueCategories / 7) * 100)),
        primaryBehaviors: ['Explores multiple features', 'Curious about everything', 'Quick browsing'],
        recommendations: [
          'Guide to deep-dive into most-visited feature',
          'Show quick-win activities (2-min lessons)',
          'Highlight their most-used feature',
        ],
        onboardingFocus: 'Help user find their primary interest and focus there',
      };
    }

    // PASSIVE: Low engagement, minimal interactions
    if (avgEngagement < 1.5 || totalActivities < 5) {
      return {
        segment: 'passive',
        confidence: 70,
        primaryBehaviors: ['Minimal interaction', 'Scrolls but doesn\'t engage', 'Quick visits'],
        recommendations: [
          'Gamify with quick wins and XP',
          'Show 2-minute lessons',
          'Emphasize streaks and achievements',
        ],
        onboardingFocus: 'Motivate through gamification and easy wins',
      };
    }

    // Default: DORMANT (shouldn't reach here if user is active)
    return {
      segment: 'dormant',
      confidence: 50,
      primaryBehaviors: ['Inactive', 'Hasn\'t returned recently'],
      recommendations: [
        'Send re-engagement notification',
        'Show streak reminder',
        'Highlight new features',
      ],
      onboardingFocus: 'Win-back campaign with incentives',
    };
  };

  const determineSegmentFromSurvey = (): SegmentProfile => {
    if (!profile) {
      return {
        segment: 'explorer',
        confidence: 50,
        primaryBehaviors: ['Survey not completed'],
        recommendations: ['Complete onboarding survey'],
        onboardingFocus: 'Complete survey to personalize experience',
      };
    }

    // Determine segment based on survey answers
    const { learning_style, career_interest_level, motivation_style, daily_time_commitment } = profile;

    // Career-focused = likely wants structured learning
    if (career_interest_level === 'career_focused' || career_interest_level === 'very_interested') {
      return {
        segment: 'learner',
        confidence: 80,
        primaryBehaviors: ['Career-focused', 'Structured learning preference'],
        recommendations: [
          'Start with career pathways content',
          'Complete foundational courses',
          'Build skills for finance roles',
        ],
        onboardingFocus: 'Guide through career-oriented learning path',
      };
    }

    // Flashcard/interactive learners
    if (learning_style === 'flashcards' || learning_style === 'interactive') {
      return {
        segment: 'learner',
        confidence: 75,
        primaryBehaviors: ['Interactive learning preference', 'Hands-on approach'],
        recommendations: [
          'Use flashcard features regularly',
          'Try interactive quizzes',
          'Practice with mini-games',
        ],
        onboardingFocus: 'Highlight flashcards and interactive learning tools',
      };
    }

    // Video learners = social
    if (learning_style === 'videos') {
      return {
        segment: 'social',
        confidence: 75,
        primaryBehaviors: ['Video learning preference', 'Visual learner'],
        recommendations: [
          'Watch Phil\'s Friends videos',
          'Engage with video content',
          'Join community discussions',
        ],
        onboardingFocus: 'Guide to video content and community features',
      };
    }

    // Competition-motivated = might like trading
    if (motivation_style === 'competition' || motivation_style === 'money') {
      return {
        segment: 'trader',
        confidence: 70,
        primaryBehaviors: ['Competition-motivated', 'Goal-oriented'],
        recommendations: [
          'Try paper trading',
          'Compete on leaderboards',
          'Track portfolio performance',
        ],
        onboardingFocus: 'Introduce trading features and competitions',
      };
    }

    // Short time commitment = passive
    if (daily_time_commitment === '5min') {
      return {
        segment: 'passive',
        confidence: 65,
        primaryBehaviors: ['Limited time available', 'Needs quick content'],
        recommendations: [
          'Show 2-minute lessons',
          'Quick daily tips',
          'Microlearning modules',
        ],
        onboardingFocus: 'Focus on quick-win activities and micro-lessons',
      };
    }

    // Default to explorer
    return {
      segment: 'explorer',
      confidence: 60,
      primaryBehaviors: ['Exploring different features'],
      recommendations: [
        'Try different features',
        'Find your learning style',
        'Complete profile for better recommendations',
      ],
      onboardingFocus: 'Let user explore and identify preferences',
    };
  };

  useEffect(() => {
    analyzeUserBehavior();
  }, [user, profile]);

  return {
    segmentProfile,
    loading,
    refresh: analyzeUserBehavior,
  };
};
