
import { Module } from '@/types/interview-module';
import ElevatorPitchGame from '@/components/softskills/interview-games/ElevatorPitchGame';
import StarMethodGame from '@/components/softskills/interview-games/StarMethodGame';
import InterviewEtiquetteGame from '@/components/softskills/interview-games/InterviewEtiquetteGame';
import TechnicalDrillGame from '@/components/softskills/interview-games/TechnicalDrillGame';
import ThankYouNoteGame from '@/components/softskills/interview-games/ThankYouNoteGame';

export const interviewMasteryModules: Module[] = [
  {
    id: 1,
    title: "First Impressions & Professional Presence",
    objective: "Master the art of making powerful first impressions and maintaining professional presence throughout the interview process.",
    content: [
      {
        title: "Professional Appearance",
        explanation: "Your appearance is the first thing interviewers notice and sets the tone for the entire interview.",
        importance: "Studies show that first impressions are formed within 7 seconds and significantly impact hiring decisions.",
        howTo: "Dress one level above the company's dress code, ensure good grooming, and maintain confident posture."
      },
      {
        title: "Body Language Mastery",
        explanation: "Non-verbal communication accounts for 55% of all communication and speaks louder than words.",
        importance: "Proper body language conveys confidence, competence, and cultural fit.",
        howTo: "Maintain eye contact, offer a firm handshake, sit up straight, and use open gestures."
      },
      {
        title: "The Power of Punctuality",
        explanation: "Arriving on time demonstrates respect, reliability, and organizational skills.",
        importance: "Being late to an interview is one of the fastest ways to eliminate yourself from consideration.",
        howTo: "Plan to arrive 10-15 minutes early, account for traffic and parking, and bring contact information in case of delays."
      }
    ],
    assignment: "Practice your elevator pitch in front of a mirror, focusing on your posture, eye contact, and confident delivery. Record yourself if possible and identify areas for improvement.",
    quiz: {
      topicId: "first-impressions",
      question: "What percentage of communication is conveyed through body language?",
      options: ["25%", "35%", "55%", "75%"],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "Body language accounts for 55% of all communication, making it crucial to master for interviews."
    },
    game: {
      title: "Elevator Pitch Challenge",
      description: "Perfect your 30-second elevator pitch with our interactive simulator",
      component: ElevatorPitchGame
    }
  },
  {
    id: 2,
    title: "Storytelling with the STAR Method",
    objective: "Learn to structure compelling behavioral interview responses using the STAR (Situation, Task, Action, Result) framework.",
    content: [
      {
        title: "Understanding STAR Framework",
        explanation: "STAR provides a structured approach to answering behavioral questions with specific examples.",
        importance: "Behavioral questions make up 70% of interview questions and predict future performance.",
        howTo: "Situation: Set the context. Task: Explain your responsibility. Action: Describe what you did. Result: Share the outcome."
      },
      {
        title: "Choosing the Right Stories",
        explanation: "Select diverse examples that showcase different skills and achievements relevant to the role.",
        importance: "Having prepared stories prevents rambling and ensures you highlight your best qualities.",
        howTo: "Prepare 5-7 stories covering leadership, problem-solving, teamwork, conflict resolution, and achievement."
      },
      {
        title: "Making Results Quantifiable",
        explanation: "Numbers and metrics make your achievements more credible and memorable.",
        importance: "Quantified results demonstrate impact and help interviewers understand your value proposition.",
        howTo: "Use percentages, dollar amounts, time saved, or other metrics to measure your success."
      }
    ],
    assignment: "Write out 3 STAR method stories covering different competencies. Practice telling them aloud, timing each to be 2-3 minutes maximum.",
    quiz: {
      topicId: "star-method",
      question: "In the STAR method, what does the 'A' stand for?",
      options: ["Achievement", "Action", "Analysis", "Approach"],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "The 'A' in STAR stands for Action - the specific steps you took to address the situation."
    },
    game: {
      title: "STAR Story Builder",
      description: "Practice structuring your experiences using the STAR method",
      component: StarMethodGame
    }
  },
  {
    id: 3,
    title: "Technical Questions & Industry Knowledge",
    objective: "Develop strategies for handling technical questions and demonstrating industry knowledge with confidence.",
    content: [
      {
        title: "Preparing for Technical Assessments",
        explanation: "Technical questions test your knowledge, problem-solving skills, and ability to think under pressure.",
        importance: "75% of finance roles include some form of technical assessment during the interview process.",
        howTo: "Review fundamental concepts, practice calculations, and prepare to explain your thought process clearly."
      },
      {
        title: "Industry Trends and Market Knowledge",
        explanation: "Demonstrating current market awareness shows genuine interest and professional engagement.",
        importance: "Knowledge of current events and trends differentiates serious candidates from casual applicants.",
        howTo: "Read financial news daily, understand key market indicators, and form opinions on current events."
      },
      {
        title: "Handling 'I Don't Know'",
        explanation: "How you respond to unknown questions can be more important than having all the answers.",
        importance: "Admitting knowledge gaps while showing problem-solving approach demonstrates intellectual honesty.",
        howTo: "Acknowledge what you don't know, explain how you would find the answer, and relate to similar concepts you do understand."
      }
    ],
    assignment: "Research three current financial news stories and prepare to discuss their implications. Practice explaining one complex financial concept in simple terms.",
    quiz: {
      topicId: "technical-knowledge",
      question: "When you don't know the answer to a technical question, what's the best approach?",
      options: ["Guess confidently", "Admit you don't know and explain how you'd find out", "Change the subject", "Say you'll get back to them"],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "The best approach is to honestly admit what you don't know while demonstrating your problem-solving process."
    },
    game: {
      title: "Technical Drill Practice",
      description: "Test your knowledge with rapid-fire technical questions",
      component: TechnicalDrillGame
    }
  },
  {
    id: 4,
    title: "Smart Questions & Interview Engagement",
    objective: "Master the art of asking insightful questions that demonstrate genuine interest and strategic thinking.",
    content: [
      {
        title: "Questions That Impress",
        explanation: "The questions you ask reveal your priorities, curiosity, and level of preparation.",
        importance: "87% of hiring managers say candidate questions influence their hiring decision significantly.",
        howTo: "Ask about challenges, growth opportunities, company culture, and success metrics for the role."
      },
      {
        title: "Research-Based Inquiries",
        explanation: "Questions based on your research show preparation and genuine interest in the specific company.",
        importance: "Tailored questions demonstrate you've invested time in understanding the organization.",
        howTo: "Reference recent company news, financial performance, or strategic initiatives in your questions."
      },
      {
        title: "Avoiding Red Flag Questions",
        explanation: "Some questions can inadvertently send negative signals about your priorities or professionalism.",
        importance: "Poor questions can quickly eliminate otherwise qualified candidates.",
        howTo: "Avoid asking about salary, vacation, or basic information easily found on the company website."
      }
    ],
    assignment: "Prepare 8-10 thoughtful questions based on research about a specific company you're interested in. Categorize them by role-specific, company-specific, and industry-related.",
    quiz: {
      topicId: "smart-questions",
      question: "Which type of question is most likely to impress an interviewer?",
      options: ["Questions about salary and benefits", "Questions about vacation time", "Questions about growth challenges the company faces", "Questions about the dress code"],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "Questions about company challenges and growth opportunities show strategic thinking and genuine interest."
    }
  },
  {
    id: 5,
    title: "Interview Etiquette & Professional Communication",
    objective: "Perfect your interview communication skills, from phone screens to in-person meetings.",
    content: [
      {
        title: "Phone and Video Interview Mastery",
        explanation: "Remote interviews require different skills and preparation than in-person meetings.",
        importance: "80% of initial interviews are now conducted remotely, making these skills essential.",
        howTo: "Test technology beforehand, ensure good lighting and audio, maintain eye contact with camera, and eliminate distractions."
      },
      {
        title: "Professional Communication Style",
        explanation: "Your communication style should be confident, concise, and conversational.",
        importance: "Communication skills are the top factor in hiring decisions across all industries.",
        howTo: "Speak clearly, avoid filler words, use active voice, and match the interviewer's communication style."
      },
      {
        title: "Managing Interview Nerves",
        explanation: "Controlling anxiety allows your true capabilities to shine through during interviews.",
        importance: "Nervousness can prevent you from effectively communicating your qualifications.",
        howTo: "Practice deep breathing, prepare thoroughly, arrive early, and reframe nerves as excitement."
      }
    ],
    assignment: "Conduct a mock video interview with a friend or family member. Focus on your communication clarity, technology setup, and professional presence on camera.",
    quiz: {
      topicId: "interview-etiquette",
      question: "What's the most important factor for video interview success?",
      options: ["Expensive equipment", "Perfect lighting", "Testing technology beforehand", "Professional background"],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "Testing your technology beforehand prevents technical issues that could derail your interview."
    },
    game: {
      title: "Interview Etiquette Scenarios",
      description: "Navigate various interview situations with proper etiquette",
      component: InterviewEtiquetteGame
    }
  },
  {
    id: 6,
    title: "Follow-up & Post-Interview Strategy",
    objective: "Learn how to effectively follow up after interviews and maintain professional relationships throughout the hiring process.",
    content: [
      {
        title: "The Perfect Thank You Note",
        explanation: "A well-crafted thank you note reinforces your interest and keeps you top-of-mind.",
        importance: "Only 24% of candidates send thank you notes, giving you a significant competitive advantage.",
        howTo: "Send within 24 hours, personalize for each interviewer, reiterate key qualifications, and address any concerns raised."
      },
      {
        title: "Following Up Professionally",
        explanation: "Strategic follow-up demonstrates persistence without being pushy.",
        importance: "Appropriate follow-up can revive stalled opportunities and show continued interest.",
        howTo: "Wait one week after promised timeline, add value in each communication, and maintain professional tone."
      },
      {
        title: "Handling Rejection and Building Relationships",
        explanation: "How you handle rejection can lead to future opportunities and referrals.",
        importance: "Today's rejection can become tomorrow's opportunity if you maintain professional relationships.",
        howTo: "Thank them for their time, ask for feedback, express continued interest in the company, and stay connected on LinkedIn."
      }
    ],
    assignment: "Write three different thank you note templates: one for phone interviews, one for panel interviews, and one for final round interviews. Practice following up professionally after a 'no' response.",
    quiz: {
      topicId: "follow-up-strategy",
      question: "When should you send a thank you note after an interview?",
      options: ["Immediately after", "Within 24 hours", "After one week", "Only if you get the job"],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Thank you notes should be sent within 24 hours to be most effective while the interview is still fresh in the interviewer's mind."
    },
    game: {
      title: "Thank You Note Workshop",
      description: "Craft the perfect follow-up messages for different interview scenarios",
      component: ThankYouNoteGame
    }
  }
];
