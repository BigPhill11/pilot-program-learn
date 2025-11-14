interface SurveyData {
  primary_goal: string;
  finance_comfort_level: number;
  primary_finance_interest: string;
  learning_style: string;
  daily_time_commitment: string;
  career_interest_level: string;
  motivation_style: string;
}

interface PersonalizationResult {
  recommendedJourney: string;
  suggestedFeatures: string[];
  firstSteps: string[];
  behavioralSegment: string;
  motivationTactics: string[];
}

export const generatePersonalizedRecommendations = (data: SurveyData): PersonalizationResult => {
  const recommendations: PersonalizationResult = {
    recommendedJourney: '',
    suggestedFeatures: [],
    firstSteps: [],
    behavioralSegment: '',
    motivationTactics: [],
  };

  // Determine behavioral segment
  if (data.career_interest_level === 'career_focused' || data.career_interest_level === 'very_interested') {
    recommendations.behavioralSegment = 'Career Achiever';
  } else if (data.learning_style === 'flashcards' || data.learning_style === 'interactive') {
    recommendations.behavioralSegment = 'Active Learner';
  } else if (data.learning_style === 'videos') {
    recommendations.behavioralSegment = 'Visual Learner';
  } else if (data.motivation_style === 'competition' || data.motivation_style === 'money') {
    recommendations.behavioralSegment = 'Goal-Driven Trader';
  } else if (data.daily_time_commitment === '5min') {
    recommendations.behavioralSegment = 'Busy Professional';
  } else {
    recommendations.behavioralSegment = 'Knowledge Explorer';
  }

  // Determine recommended journey based on primary goal
  switch (data.primary_goal) {
    case 'save_money':
      recommendations.recommendedJourney = "Start with 'Budgeting Fundamentals' to master saving and money management";
      break;
    case 'invest':
      recommendations.recommendedJourney = "Begin with 'Stock Market Basics' and practice with our Paper Trading feature";
      break;
    case 'buy_house':
      recommendations.recommendedJourney = "Follow the 'Home Buying Journey' - from saving for down payment to mortgage management";
      break;
    case 'start_business':
      recommendations.recommendedJourney = "Take the 'Business Finance' path to understand cash flow, funding, and growth";
      break;
    case 'understand_money':
      recommendations.recommendedJourney = "Start with 'Financial Literacy 101' to build a strong foundation";
      break;
    case 'get_job':
      recommendations.recommendedJourney = "Follow the 'Finance Career Path' with industry insights and skill-building";
      break;
    default:
      recommendations.recommendedJourney = "Explore 'Financial Fundamentals' to discover your interests";
  }

  // Suggest features based on learning style
  if (data.learning_style === 'flashcards') {
    recommendations.suggestedFeatures.push('📇 Flashcard System - Master concepts with spaced repetition');
    recommendations.suggestedFeatures.push('⚡ Quick Review Mode - 5-minute daily review sessions');
  }
  
  if (data.learning_style === 'videos') {
    recommendations.suggestedFeatures.push('🎥 Phil\'s Friends - Watch expert finance videos');
    recommendations.suggestedFeatures.push('📹 Video Lessons - Visual learning for complex topics');
  }
  
  if (data.learning_style === 'games') {
    recommendations.suggestedFeatures.push('🎮 Finance Mini-Games - Learn through fun challenges');
    recommendations.suggestedFeatures.push('🏆 Achievement System - Unlock badges as you progress');
  }
  
  if (data.learning_style === 'reading') {
    recommendations.suggestedFeatures.push('📚 Comprehensive Lessons - Deep-dive articles and guides');
    recommendations.suggestedFeatures.push('📖 Resource Library - Access to finance books and articles');
  }
  
  if (data.learning_style === 'interactive') {
    recommendations.suggestedFeatures.push('⚡ Interactive Quizzes - Test your knowledge in real-time');
    recommendations.suggestedFeatures.push('📊 Paper Trading - Practice investing with virtual money');
  }

  // Add career features if interested
  if (data.career_interest_level === 'career_focused' || data.career_interest_level === 'very_interested') {
    recommendations.suggestedFeatures.push('💼 Career Pathways - Explore finance job opportunities');
    recommendations.suggestedFeatures.push('🎓 Skill Assessments - Identify your strengths for career growth');
  }

  // Add Ask Phil feature
  recommendations.suggestedFeatures.push('🤖 Ask Phil - Get instant answers to your finance questions');

  // Add social features if motivated by community
  if (data.motivation_style === 'social') {
    recommendations.suggestedFeatures.push('👥 Phil\'s Friends Community - Connect with fellow learners');
  }

  // Add competition features if motivated by competing
  if (data.motivation_style === 'competition') {
    recommendations.suggestedFeatures.push('🏆 Leaderboards - Compete with other learners');
    recommendations.suggestedFeatures.push('⚔️ Weekly Challenges - Earn top ranks and special rewards');
  }

  // Generate first steps based on time commitment and interest
  if (data.daily_time_commitment === '5min') {
    recommendations.firstSteps.push('Complete a 2-minute daily finance tip');
    recommendations.firstSteps.push('Review 5 flashcards to build your knowledge');
    recommendations.firstSteps.push('Set up your daily login streak for bonus XP');
  } else if (data.daily_time_commitment === '15min') {
    recommendations.firstSteps.push(`Complete your first lesson in ${data.primary_finance_interest}`);
    recommendations.firstSteps.push('Take a quiz to assess your current knowledge');
    recommendations.firstSteps.push('Watch an intro video on your goal area');
  } else {
    recommendations.firstSteps.push('Complete the first module of your learning path');
    recommendations.firstSteps.push('Try Paper Trading to practice investing');
    recommendations.firstSteps.push('Join Phil\'s Friends to connect with the community');
  }

  // Add personalized first step based on finance interest
  switch (data.primary_finance_interest) {
    case 'budgeting':
      recommendations.firstSteps.push('Create your first budget using our tools');
      break;
    case 'investing':
      recommendations.firstSteps.push('Make your first virtual trade in Paper Trading');
      break;
    case 'careers':
      recommendations.firstSteps.push('Take the Finance Career Assessment');
      break;
    case 'taxes':
      recommendations.firstSteps.push('Learn basic tax concepts with flashcards');
      break;
    case 'credit':
      recommendations.firstSteps.push('Understand credit scores with our interactive guide');
      break;
    case 'saving':
      recommendations.firstSteps.push('Set up your first savings goal tracker');
      break;
  }

  // Motivation tactics based on style
  switch (data.motivation_style) {
    case 'competition':
      recommendations.motivationTactics.push('Check leaderboards daily');
      recommendations.motivationTactics.push('Join weekly challenges');
      break;
    case 'achievement':
      recommendations.motivationTactics.push('Unlock all beginner badges');
      recommendations.motivationTactics.push('Build your daily streak');
      break;
    case 'learning':
      recommendations.motivationTactics.push('Complete learning paths systematically');
      recommendations.motivationTactics.push('Take detailed notes');
      break;
    case 'social':
      recommendations.motivationTactics.push('Join community discussions');
      recommendations.motivationTactics.push('Share your achievements');
      break;
    case 'money':
      recommendations.motivationTactics.push('Track your Paper Trading profits');
      recommendations.motivationTactics.push('Learn investment strategies');
      break;
  }

  return recommendations;
};

// Helper function to get personalized tip based on segment
export const getPersonalizedTip = (segment: string, progress: number): string => {
  if (progress < 20) {
    switch (segment) {
      case 'Career Achiever':
        return 'Build finance skills that employers want - complete your first career-focused module!';
      case 'Active Learner':
        return 'Flashcards are most effective with spaced repetition - review daily for best results!';
      case 'Visual Learner':
        return 'New videos added weekly - check Phil\'s Friends for the latest content!';
      case 'Goal-Driven Trader':
        return 'Start small in Paper Trading - practice makes perfect before real investing!';
      case 'Busy Professional':
        return 'Just 5 minutes a day adds up - consistency beats cramming every time!';
      default:
        return 'Welcome to Phil\'s Financials! Start with any topic that excites you.';
    }
  } else if (progress < 50) {
    return 'You\'re making great progress! Keep your streak going to unlock bonus rewards.';
  } else {
    return 'You\'re crushing it! Consider exploring advanced topics in your interest area.';
  }
};
