
export interface ProgressData {
  quiz_scores: Record<string, boolean>;
  learning_progress: number;
  engagement_score: number;
  total_points: number;
  level_progress: number;
  achievements: string[];
}

export interface ProgressHookReturn {
  progress: ProgressData;
  loading: boolean;
  updateQuizScore: (topicId: string, isCorrect: boolean) => Promise<void>;
  updateMarketPrediction: () => Promise<void>;
  updateLearningProgress: (pointsToAdd?: number) => Promise<void>;
  updateSoftSkillsProgress: (courseId: string, lessonId: string, pointsToAdd?: number) => Promise<void>;
  refreshProgress: () => Promise<void>;
}
