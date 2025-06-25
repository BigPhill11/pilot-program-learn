
export interface ContentItem {
  title: string;
  explanation: string;
  importance: string;
  howTo: string;
}

export interface Module {
  id: number;
  title: string;
  objective: string;
  content: ContentItem[];
  assignment: string;
  quiz: {
    topicId: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    feedbackForIncorrect?: string;
  };
  game?: {
    title: string;
    description: string;
    component: React.ComponentType<any>;
  };
}

export interface InterviewMasteryModuleProps {
  module: Module;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: (moduleId: number) => void;
  onQuizComplete: (topicId: string, isCorrect: boolean) => void;
}

export type SectionType = 'intro' | 'content' | 'game' | 'quiz' | 'assignment';
