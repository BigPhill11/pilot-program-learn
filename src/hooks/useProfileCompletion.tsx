import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface ProfileCompletionItem {
  key: string;
  label: string;
  completed: boolean;
  points: number;
  action?: string;
}

export const useProfileCompletion = () => {
  const { user, profile } = useAuth();
  const [completionScore, setCompletionScore] = useState(0);
  const [completionItems, setCompletionItems] = useState<ProfileCompletionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateCompletion = async () => {
    if (!user || !profile) {
      setLoading(false);
      return;
    }

    const items: ProfileCompletionItem[] = [
      {
        key: 'username',
        label: 'Set username',
        completed: !!profile.username && profile.username !== '',
        points: 10,
        action: 'profile',
      },
      {
        key: 'experience_level',
        label: 'Set experience level',
        completed: !!profile.experience_level,
        points: 10,
        action: 'profile',
      },
      {
        key: 'interests',
        label: 'Select interests',
        completed: profile.interests && profile.interests.length > 0,
        points: 10,
        action: 'profile',
      },
      {
        key: 'goals',
        label: 'Set goals',
        completed: profile.goals && profile.goals.length > 0,
        points: 10,
        action: 'profile',
      },
      {
        key: 'device_preference',
        label: 'Set device preference',
        completed: !!profile.device_preference,
        points: 5,
        action: 'profile',
      },
      {
        key: 'survey',
        label: 'Complete feature survey',
        completed: profile.survey_completed === true,
        points: 15,
        action: 'survey',
      },
      {
        key: 'engagement',
        label: 'Start engaging with content',
        completed: (profile.engagement_score || 0) > 0,
        points: 10,
        action: 'learn',
      },
      {
        key: 'learning_progress',
        label: 'Begin learning journey',
        completed: profile.learning_progress && 
                   Object.keys(profile.learning_progress).length > 0,
        points: 10,
        action: 'learn',
      },
      {
        key: 'streak',
        label: 'Start daily streak',
        completed: (profile.current_streak || 0) > 0,
        points: 10,
        action: 'daily-login',
      },
      {
        key: 'xp',
        label: 'Earn your first 100 XP',
        completed: (profile.total_xp || 0) > 100,
        points: 10,
        action: 'learn',
      },
    ];

    setCompletionItems(items);

    const totalScore = items
      .filter(item => item.completed)
      .reduce((sum, item) => sum + item.points, 0);

    setCompletionScore(totalScore);

    // Update database with calculated score
    if (profile.profile_completion_score !== totalScore) {
      try {
        await supabase
          .from('profiles')
          .update({ profile_completion_score: totalScore })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error updating profile completion score:', error);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    calculateCompletion();
  }, [user, profile]);

  const getIncompleteItems = () => {
    return completionItems.filter(item => !item.completed);
  };

  const getCompletedItems = () => {
    return completionItems.filter(item => item.completed);
  };

  const getNextAction = () => {
    const incompleteItems = getIncompleteItems();
    if (incompleteItems.length === 0) return null;

    // Prioritize high-value items
    const sortedItems = incompleteItems.sort((a, b) => b.points - a.points);
    return sortedItems[0];
  };

  return {
    completionScore,
    completionItems,
    incompleteItems: getIncompleteItems(),
    completedItems: getCompletedItems(),
    nextAction: getNextAction(),
    loading,
    refresh: calculateCompletion,
  };
};
