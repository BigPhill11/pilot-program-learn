
import { useAuth } from '@/hooks/useAuth';
import { useProgressData } from '@/hooks/progress/useProgressData';
import { useQuizProgress } from '@/hooks/progress/useQuizProgress';
import { useMarketProgress } from '@/hooks/progress/useMarketProgress';
import { useLearningProgress } from '@/hooks/progress/useLearningProgress';
import { useSoftSkillsProgress } from '@/hooks/progress/useSoftSkillsProgress';
import { checkLevelUp } from '@/utils/levelUtils';
import { ProgressHookReturn } from '@/types/progress';

export const useProgressTracking = (): ProgressHookReturn => {
  const { user } = useAuth();
  const { progress, setProgress, loading, fetchProgress } = useProgressData();

  const handleLevelUp = async (totalPoints: number) => {
    if (user) {
      await checkLevelUp(totalPoints, user.id);
    }
  };

  const { updateQuizScore } = useQuizProgress(progress, setProgress, handleLevelUp);
  const { updateMarketPrediction } = useMarketProgress(progress, setProgress, handleLevelUp);
  const { updateLearningProgress } = useLearningProgress(progress, setProgress, handleLevelUp);
  const { updateSoftSkillsProgress } = useSoftSkillsProgress(progress, setProgress, handleLevelUp);

  return {
    progress,
    loading,
    updateQuizScore,
    updateMarketPrediction,
    updateLearningProgress,
    updateSoftSkillsProgress,
    refreshProgress: fetchProgress
  };
};
