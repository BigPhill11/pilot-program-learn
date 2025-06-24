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
        {
          title: "Know your 'Why Finance' and your story (including resume walkthrough)",
          explanation: "Your 'Why Finance' is the cornerstone of your interview success. It's your authentic reason for pursuing a career in finance, backed by specific experiences and goals. This isn't just about saying you like numbers or want to make money - it's about demonstrating genuine passion and understanding of the industry.",
          importance: "Interviewers ask this question to assess your motivation, commitment, and whether you'll thrive in the demanding finance environment. A compelling 'Why Finance' story shows you've thoughtfully considered your career path.",
          howTo: "Start by reflecting on your genuine interests: What initially drew you to finance? Connect this to specific experiences (internships, courses, personal investments). Practice articulating this in 1-2 minutes, including how your background led you here and where you want to go. Your resume walkthrough should tell a cohesive story that leads naturally to this role."
        },
        {
          title: "Develop a confident and concise elevator pitch",
          explanation: "An elevator pitch is a brief, persuasive speech that summarizes who you are, what you've accomplished, and what you're seeking. In finance interviews, this is often your response to 'Tell me about yourself' - typically the first question asked.",
          importance: "Your elevator pitch sets the tone for the entire interview. It's your chance to make a strong first impression, control the narrative, and highlight your most relevant qualifications. A great pitch makes interviewers want to learn more about you.",
          howTo: "Structure your pitch in 3 parts: (1) Current situation and background (2) Key achievements and relevant experience (3) Future goals and why this role fits. Keep it to 60-90 seconds. Practice until it feels natural, not rehearsed. Include specific metrics and achievements when possible."
        },
        {
          title: "Research the firm: recent deals, culture, leadership, market position",
          explanation: "Firm research involves understanding the company's business model, recent transactions, competitive position, culture, and key personnel. This goes beyond just reading the website - it's about understanding what makes this firm unique in the market.",
          importance: "Thorough research demonstrates genuine interest and helps you ask insightful questions. It also helps you tailor your answers to what the firm values. Interviewers can tell when candidates have done their homework versus those who haven't.",
          howTo: "Review the firm's website, recent press releases, and deal announcements. Read industry publications for mentions of the firm. Check LinkedIn for employee backgrounds and career paths. Look up recent M&A deals, IPOs, or other transactions they've worked on. Understand their competitive advantages and market reputation."
        },
        {
          title: "Prepare STAR-format stories (Situation, Task, Action, Result) for behavioral questions",
          explanation: "STAR is a structured method for answering behavioral interview questions. It ensures your responses are comprehensive, logical, and impactful by providing context, explaining your role, detailing your actions, and highlighting outcomes.",
          importance: "Behavioral questions assess your soft skills, leadership potential, and cultural fit. The STAR method helps you give concrete examples rather than vague generalizations, making your responses more credible and memorable.",
          howTo: "Identify 5-7 key experiences from your background. For each, define: Situation (context/background), Task (your responsibility), Action (specific steps you took), Result (quantifiable outcome). Practice telling these stories concisely (2-3 minutes each). Have examples that demonstrate leadership, teamwork, problem-solving, and overcoming challenges."
        },
        {
          title: "Practice common technicals (valuation, accounting, markets, etc.)",
          explanation: "Technical questions test your fundamental finance knowledge across accounting, valuation methods, market dynamics, and financial modeling. These range from basic concepts to complex scenario-based questions.",
          importance: "Technical competency is non-negotiable in finance. These questions separate candidates who truly understand finance from those who don't. Strong technical knowledge gives you credibility and confidence throughout the interview process.",
          howTo: "Master the three financial statements and how they connect. Understand DCF methodology, comparable company analysis, and precedent transactions. Stay current on market conditions (interest rates, major indices, recent market events). Practice explaining complex concepts simply and walking through calculations step-by-step."
        }
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
        {
          title: "Why this firm? - Demonstrating genuine interest and fit",
          explanation: "This question tests whether you've done your research and can articulate specific reasons for wanting to work at this particular firm versus their competitors. It's about showing cultural and professional alignment.",
          importance: "Interviewers want to hire people who genuinely want to be there, not just anyone looking for any finance job. This question helps them assess your motivation and likelihood of accepting an offer and staying long-term.",
          howTo: "Research the firm's unique value proposition - their culture, recent deals, growth areas, or leadership philosophy. Connect these to your career goals and values. Be specific: mention particular transactions, office culture aspects, or growth opportunities that excite you. Avoid generic answers that could apply to any firm."
        },
        {
          title: "Tell me about a time you failed - Learning from setbacks",
          explanation: "This question assesses your self-awareness, resilience, and ability to learn from mistakes. It's not about the failure itself, but how you handled it and what you learned.",
          importance: "Finance is a high-pressure industry where setbacks are inevitable. Employers want to see that you can handle failure constructively, take responsibility, and use it as a growth opportunity rather than being derailed by it.",
          howTo: "Choose a real failure where you played a significant role (not external circumstances). Explain what went wrong honestly, focus on what you learned, and describe how you applied those lessons afterward. Show growth and self-reflection. End on a positive note about how it made you stronger or better."
        },
        {
          title: "Leadership under pressure - Demonstrating composure and decision-making",
          explanation: "These questions evaluate how you perform when stakes are high, deadlines are tight, or unexpected challenges arise. Leadership under pressure shows your potential for senior roles and ability to handle finance's demanding environment.",
          importance: "Finance roles often involve high-pressure situations - market volatility, tight deal deadlines, difficult clients. Employers need to know you can maintain composure, make sound decisions, and lead others effectively when pressure mounts.",
          howTo: "Describe a situation with genuine pressure (tight deadlines, high stakes, competing priorities). Explain how you prioritized, communicated with your team, and made decisions despite uncertainty. Highlight specific leadership actions you took and the positive outcomes. Show you can stay calm and focused under stress."
        },
        {
          title: "Time you worked in a team - Collaboration and interpersonal skills",
          explanation: "Teamwork questions assess your ability to collaborate effectively, manage different personalities, contribute to group success, and handle conflicts constructively. This reveals your interpersonal skills and cultural fit.",
          importance: "Finance is highly collaborative - you'll work with colleagues, clients, and other stakeholders constantly. Strong teamwork skills are essential for project success and career advancement. Poor team players can disrupt entire deals or initiatives.",
          howTo: "Choose an example where teamwork was crucial to success. Describe your specific role and contributions, how you supported teammates, and how the team achieved its goals. If there were challenges, explain how you helped resolve them. Emphasize collective success while highlighting your individual contributions."
        },
        {
          title: "Conflict resolution - Managing disagreements professionally",
          explanation: "Conflict resolution questions test your emotional intelligence, communication skills, and ability to find mutually beneficial solutions when disagreements arise with colleagues, superiors, or clients.",
          importance: "Disagreements are inevitable in any workplace, especially in high-stress finance environments. Your ability to handle conflicts professionally and constructively can make or break relationships and deal outcomes.",
          howTo: "Describe a specific conflict, your approach to understanding all perspectives, and the steps you took to resolve it. Focus on your communication and problem-solving process. Show that you can remain professional, find common ground, and achieve positive outcomes for all parties involved."
        },
        {
          title: "Best Practices: Be honest but strategic, quantify impact, tailor to finance values",
          explanation: "Effective behavioral interviewing requires balancing authenticity with strategic communication. You want to be truthful but choose examples that showcase relevant skills. Use specific numbers and metrics whenever possible ('increased efficiency by 30%', 'managed team of 8'). Emphasize traits finance values: work ethic, analytical thinking, attention to detail, resilience, and drive for results. Practice tailoring the same experiences to highlight different qualities.",
          importance: "Raw honesty without strategy can hurt you, while being strategic without authenticity makes you seem fake. The sweet spot is honest responses that strategically highlight your strengths and fit for finance careers.",
          howTo: "Be truthful but choose examples that showcase relevant skills. Use specific numbers and metrics whenever possible. Emphasize traits finance values: work ethic, analytical thinking, attention to detail, resilience, and drive for results. Practice tailoring the same experiences to highlight different qualities."
        }
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
        {
          title: "3 financial statements and how they link together",
          explanation: "The Income Statement, Balance Sheet, and Cash Flow Statement are the foundation of financial analysis. Understanding how they interconnect is crucial for any finance role, as changes in one statement directly impact the others.",
          importance: "These statements tell the complete story of a company's financial health. Interviewers test this knowledge because it's fundamental to valuation, credit analysis, and investment decisions. If you don't understand the statements, you can't succeed in finance.",
          howTo: "Master each statement individually first: Income Statement (revenues, expenses, net income), Balance Sheet (assets, liabilities, equity), Cash Flow Statement (operating, investing, financing activities). Then learn the connections: net income flows from Income Statement to retained earnings on Balance Sheet and starts the Cash Flow Statement. Practice tracing how changes flow through all three statements."
        },
        {
          title: "DCF (discounted cash flow) & valuation methods",
          explanation: "DCF analysis values a company by projecting its future cash flows and discounting them to present value. It's one of three main valuation methods, alongside comparable company analysis and precedent transactions.",
          importance: "DCF is the most fundamental valuation tool in finance. It's used in investment banking, equity research, private equity, and corporate finance. Understanding DCF methodology is essential for most technical interviews and day-to-day work.",
          howTo: "Learn the key components: projecting free cash flows, determining the discount rate (WACC), calculating terminal value, and discounting everything to present value. Understand when to use DCF vs. other methods. Practice building simple DCF models and explaining your assumptions. Be ready to discuss how changes in growth rates or discount rates affect valuation."
        },
        {
          title: "Market comps and precedent transactions",
          explanation: "Comparable company analysis values a business relative to similar public companies, while precedent transactions look at what buyers have paid for similar companies in M&A deals. These provide market-based valuation benchmarks.",
          importance: "These methods provide reality checks for DCF valuations and are often the primary valuation tools in investment banking and M&A. They're faster than DCF and reflect what the market is actually paying for similar assets.",
          howTo: "For comps: learn to select truly comparable companies, adjust for differences, and apply appropriate multiples (P/E, EV/EBITDA, etc.). For precedents: understand how to find relevant transactions and adjust for deal-specific factors. Practice explaining when you'd use each method and their relative strengths and weaknesses."
        },
        {
          title: "Walk me through a DCF methodology",
          explanation: "This is one of the most common technical questions in finance interviews. It tests your understanding of valuation fundamentals and ability to explain complex concepts clearly.",
          importance: "This question appears in virtually every investment banking, equity research, and corporate development interview. It's a litmus test for your technical competency and communication skills.",
          howTo: "Develop a clear, logical framework: (1) Project free cash flows for 5-10 years (2) Calculate terminal value (3) Determine appropriate discount rate (WACC) (4) Discount all cash flows to present value (5) Add cash and subtract debt to get equity value. Practice this explanation until you can deliver it smoothly in 2-3 minutes."
        },
        {
          title: "Impact of changes in depreciation or interest rates on statements",
          explanation: "These questions test your understanding of how the financial statements interconnect and the impact of various accounting and economic changes on a company's financial position.",
          importance: "This type of analysis is crucial for understanding how economic changes, accounting policies, or business decisions affect a company's financials. It's fundamental to credit analysis, equity research, and financial planning.",
          howTo: "Learn the mechanics: higher depreciation reduces net income and taxes but doesn't affect cash flow. Higher interest rates increase interest expense, reduce net income, but also affect company valuations through higher discount rates. Practice tracing these changes through all three statements step by step."
        },
        {
          title: "Market Awareness: Fed Funds Rate, 10-year Treasury, S&P 500 level",
          explanation: "Current market knowledge demonstrates that you're engaged with financial markets and understand the economic environment. This includes key interest rates, market indices, and recent market-moving events.",
          importance: "Finance professionals need to understand the market context in which they're operating. Current market awareness shows you're intellectually curious and stay informed about factors that drive investment decisions.",
          howTo: "Check key metrics weekly: Fed Funds Rate, 10-year Treasury yield, S&P 500 level, VIX. Read financial news daily (WSJ, Bloomberg, FT). Understand how these metrics affect different sectors and asset classes. Be ready to discuss recent market movements and their implications."
        },
        {
          title: "Explain how interest rates affect markets",
          explanation: "Interest rates are one of the most important drivers of financial markets, affecting everything from bond prices to equity valuations to sector rotation. Understanding these relationships is fundamental to finance.",
          importance: "Interest rate sensitivity affects all asset classes and investment decisions. This knowledge is crucial for fixed income, equity research, asset management, and corporate finance roles.",
          howTo: "Understand the key relationships: rising rates generally hurt bond prices and growth stocks but can benefit banks and value stocks. Learn the transmission mechanisms: discount rates, borrowing costs, economic growth impacts. Practice explaining these concepts clearly with specific examples."
        }
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
        {
          title: "Dress code: Always formal (unless told otherwise)",
          explanation: "Professional appearance in finance interviews means business formal attire - suits for both men and women. This is the expected standard across most finance firms, regardless of their day-to-day dress code.",
          importance: "First impressions matter tremendously in finance, where client-facing roles and professional credibility are paramount. Proper attire shows respect for the process and understanding of industry norms.",
          howTo: "Men: Dark suit (navy or charcoal), white or light blue dress shirt, conservative tie, leather dress shoes, minimal accessories. Women: Professional suit or dress, closed-toe shoes, minimal jewelry, conservative colors. Ensure everything is clean, pressed, and fits well. When in doubt, err on the side of being overdressed."
        },
        {
          title: "Zoom etiquette: Eye contact, lighting, no background distractions",
          explanation: "Virtual interviews require special attention to technical setup and on-camera presence. Poor video quality or distracting backgrounds can undermine an otherwise strong interview performance.",
          importance: "With many interviews conducted virtually, your ability to present professionally on camera is crucial. Technical issues or poor setup can distract from your qualifications and create negative impressions.",
          howTo: "Test your setup beforehand: stable internet, good camera angle (eye level), proper lighting (face well-lit, no backlighting), neutral background or professional virtual background. Look directly at the camera when speaking, not the screen. Minimize distractions: silent phone, closed other applications, private space."
        },
        {
          title: "Arrive 10–15 minutes early",
          explanation: "Punctuality demonstrates respect for the interviewer's time and shows you're organized and reliable. Arriving too early can be disruptive, while being late is often disqualifying.",
          importance: "Finance is a deadline-driven industry where timing is critical. Being punctual signals that you understand professional norms and can be trusted with time-sensitive responsibilities.",
          howTo: "Plan your route in advance, accounting for potential delays. Arrive at the building 15 minutes early, but check in with reception only 10 minutes before your scheduled time. Use extra time to review your notes, practice key talking points, or simply collect your thoughts and calm any nerves."
        },
        {
          title: "Ask thoughtful questions at the end of the interview",
          explanation: "The questions you ask reveal your level of interest, preparation, and critical thinking. This is your opportunity to demonstrate curiosity about the role and gather information to make an informed decision.",
          importance: "Thoughtful questions show you're seriously considering the opportunity and help you stand out from candidates who don't ask questions or ask generic ones. It's also your chance to assess if the role and firm are right for you.",
          howTo: "Prepare 3-5 specific questions based on your research. Focus on role responsibilities, growth opportunities, team dynamics, recent firm developments, or industry trends. Avoid questions easily answered by the website. Listen during the interview and ask follow-up questions based on what you've learned."
        },
        {
          title: "Always smile and say thank you",
          explanation: "Basic courtesy and positive demeanor can differentiate you from equally qualified candidates. Finance is relationship-driven, and people want to work with colleagues they genuinely like.",
          importance: "Technical skills get you in the door, but personality and cultural fit often determine who gets the offer. Warmth and gratitude make you memorable for the right reasons.",
          howTo: "Maintain genuine positivity throughout the interview. Smile naturally when appropriate, make good eye contact, and show enthusiasm for the opportunity. Thank the interviewer at the beginning, during transitions, and at the end. Express genuine appreciation for their time and insights."
        },
        {
          title: "Sample Questions: What's the most rewarding part? How is feedback delivered? Top traits of successful analysts?",
          explanation: "These examples represent the types of thoughtful, role-specific questions that demonstrate genuine interest and help you gather valuable information about the opportunity.",
          importance: "Good questions help you make an informed decision while showing the interviewer that you're thinking seriously about excelling in the role, not just getting any job.",
          howTo: "Customize these examples to your specific situation. For example: 'What's been most rewarding about your experience here?' or 'How does the team typically support new analysts in their first year?' Make questions conversational and show genuine curiosity about their experiences and perspectives."
        }
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
        {
          title: "Thank You Notes: Send within 12–24 hours",
          explanation: "A well-crafted thank you note reinforces your interest, demonstrates professionalism, and provides another opportunity to highlight your qualifications. It's expected in finance recruiting and often influences final decisions.",
          importance: "Thank you notes differentiate you from candidates who don't send them and show attention to detail. They also provide a chance to address any concerns that arose during the interview or emphasize key points.",
          howTo: "Send within 12-24 hours while the conversation is fresh. Keep it concise (3-4 paragraphs). Express genuine gratitude, reference something specific from your conversation, reiterate your interest, and briefly reinforce why you're a strong fit. Proofread carefully - errors can be fatal."
        },
        {
          title: "Reiterate enthusiasm for the role",
          explanation: "Clearly expressing your continued interest signals genuine motivation and helps interviewers feel confident that you'll accept an offer if extended. Enthusiasm can be a tiebreaker between equally qualified candidates.",
          importance: "Firms want to hire people who genuinely want to be there. Expressing enthusiasm increases your chances of receiving an offer and shows you're not just interviewing everywhere without focus.",
          howTo: "Be specific about what excites you: the role responsibilities, team culture, growth opportunities, or recent firm developments you discussed. Connect your enthusiasm to concrete reasons rather than generic statements. Make it clear this isn't just any job - it's the job you want."
        },
        {
          title: "Reference something specific from the conversation",
          explanation: "Mentioning specific details from your interview shows you were engaged, listening carefully, and found the conversation memorable. It personalizes your thank you note and demonstrates genuine interest.",
          importance: "Specific references prove you were actively engaged rather than going through the motions. They help build rapport and show the interviewer that the conversation was meaningful to you.",
          howTo: "Reference something unique from your conversation: an interesting project they mentioned, advice they gave, a challenge the team is facing, or a shared interest you discovered. This makes your note personal and memorable rather than generic."
        },
        {
          title: "Offer Received: Ask for the offer in writing, express gratitude",
          explanation: "When you receive a verbal offer, it's standard practice to request written confirmation with all details. This protects both parties and ensures clear understanding of terms before you make your decision.",
          importance: "Written offers prevent misunderstandings about compensation, start date, benefits, or other terms. They also provide documentation you need to resign from current positions or compare multiple offers.",
          howTo: "Express genuine excitement and gratitude immediately. Then professionally request: 'I'm thrilled about this opportunity. Could you please send me the offer details in writing so I can review everything carefully?' Ask about timeline for decision-making and next steps."
        },
        {
          title: "Clarify timelines and next steps",
          explanation: "Understanding decision timelines and next steps helps you manage other opportunities and shows professionalism. It also ensures you don't accidentally miss important deadlines or requirements.",
          importance: "Clear communication about timelines prevents awkward situations and helps you make informed decisions about other opportunities. It also demonstrates your organized approach to important decisions.",
          howTo: "Ask specific questions: 'When do you need my decision?' 'Are there any additional steps in the process?' 'Who should I contact with questions?' Take notes and confirm your understanding. Be realistic about your timeline needs while showing urgency about moving forward."
        },
        {
          title: "Rejection Received: Respond with grace, ask for feedback",
          explanation: "How you handle rejection reveals your character and professionalism. A gracious response can leave doors open for future opportunities and demonstrates maturity that could benefit your reputation in the industry.",
          importance: "Finance is a small industry where reputation matters. Handling rejection professionally can lead to future opportunities, referrals, or valuable feedback that improves your candidacy elsewhere.",
          howTo: "Respond promptly with genuine gratitude for their time and consideration. Express continued interest in the firm for future opportunities. Politely ask if they'd be willing to share any feedback that could help you improve. Keep it brief, professional, and positive."
        },
        {
          title: "Stay connected for future opportunities",
          explanation: "Building long-term relationships in finance can lead to future opportunities, referrals, or industry insights. Even if this specific role didn't work out, maintaining professional connections can benefit your career.",
          importance: "Many opportunities come through professional networks. Staying connected with interviewers and other contacts can lead to future job opportunities, industry insights, or valuable career advice.",
          howTo: "Connect on LinkedIn with a personalized note referencing your interview. Occasionally engage with their content or share relevant industry articles. If you achieve notable accomplishments, consider sharing updates. Keep interactions professional and value-focused, not self-promotional."
        }
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
        {
          title: "Weekly checklist for consistent preparation",
          explanation: "Successful interview preparation requires consistent, ongoing effort rather than cramming before each interview. A structured weekly routine ensures you're always ready and continuously improving your skills.",
          importance: "Interview skills deteriorate without practice, and recruiting seasons can be unpredictable. Maintaining a consistent routine keeps you sharp and confident, reducing stress when opportunities arise.",
          howTo: "Create a weekly schedule that includes: 2 mock interviews, technical question practice, behavioral story review, market/industry reading, and networking activities. Track your progress and adjust based on areas needing improvement. Consistency is more important than perfection."
        },
        {
          title: "2 mock interviews per week minimum",
          explanation: "Mock interviews are the most effective way to improve your interview performance. They help you practice articulating your thoughts, manage nerves, and receive feedback on areas for improvement.",
          importance: "Practice makes permanent. Regular mock interviews build confidence, improve your delivery, and help you refine your stories and technical explanations. They also help you identify and address weaknesses before real interviews.",
          howTo: "Schedule mock interviews with career services, alumni, friends, or family members. Vary the format: phone, video, and in-person. Practice different types: behavioral, technical, and case study interviews. Record yourself when possible to review your performance objectively."
        },
        {
          title: "Read WSJ, Bloomberg, or Axios for market trends",
          explanation: "Staying informed about current market conditions, economic trends, and industry developments demonstrates intellectual curiosity and provides context for interview discussions.",
          importance: "Finance professionals need to understand the market environment and its implications. Current market knowledge can enhance your credibility and provide material for thoughtful questions and discussions.",
          howTo: "Dedicate 15-30 minutes daily to reading financial news. Focus on understanding market movements, economic indicators, and industry trends rather than just headlines. Take notes on key developments and consider their implications for different sectors or investment strategies."
        },
        {
          title: "Revisit 3 technicals and 1 behavioral answer weekly",
          explanation: "Regular review of technical concepts and behavioral stories keeps them fresh in your memory and helps you refine your explanations. This prevents knowledge from getting rusty between interviews.",
          importance: "Interview skills require maintenance. Regular review ensures you can deliver polished answers confidently, even under pressure. It also helps you identify areas where your understanding or delivery needs improvement.",
          howTo: "Create a rotation system for reviewing different technical topics and behavioral stories each week. Practice explaining concepts out loud, not just reading about them. Time yourself to ensure your answers are appropriately concise. Update examples as you gain new experiences."
        },
        {
          title: "Stay positive, consistent, and coachable",
          explanation: "Interview preparation can be challenging and sometimes discouraging. Maintaining the right mindset is crucial for long-term success and continuous improvement throughout the recruiting process.",
          importance: "Your attitude affects your performance and how others perceive you. Staying positive helps you bounce back from rejections, while being coachable ensures you continue improving. Consistency leads to better results than sporadic intense effort.",
          howTo: "Set realistic expectations and celebrate small improvements. Learn from each interview experience, whether successful or not. Seek feedback actively and implement suggestions. Maintain perspective - recruiting is a process, not a single event. Stay focused on continuous improvement rather than perfect performance."
        },
        {
          title: "Build confidence through repetition",
          explanation: "Confidence in interviews comes from thorough preparation and repeated practice. The more you practice your stories, technical explanations, and interview skills, the more natural and confident you'll appear.",
          importance: "Confidence is often the differentiating factor between candidates with similar qualifications. It affects how interviewers perceive your competence and potential for success in demanding finance roles.",
          howTo: "Practice your core stories and technical explanations until they become second nature. Start with low-stakes practice opportunities before important interviews. Visualize successful interview scenarios. Focus on your preparation and qualifications rather than things outside your control."
        },
        {
          title: "Learn from each interview experience",
          explanation: "Every interview, regardless of outcome, provides valuable learning opportunities. Reflecting on what went well and what could be improved helps you continuously refine your approach.",
          importance: "Interview skills improve through experience and reflection. Learning from each interaction helps you avoid repeating mistakes and build on successful approaches. This continuous improvement leads to better results over time.",
          howTo: "After each interview, write notes about: questions asked, your responses, what went well, areas for improvement, and interviewer feedback. Look for patterns across multiple interviews. Adjust your preparation and approach based on these insights."
        },
        {
          title: "Maintain momentum throughout recruiting season",
          explanation: "Recruiting seasons can be long and emotionally draining. Maintaining consistent effort and motivation throughout the process is crucial for maximizing opportunities and achieving your goals.",
          importance: "Many candidates start strong but lose momentum as the process continues. Those who maintain consistent effort throughout the recruiting season often have better outcomes and more opportunities.",
          howTo: "Set intermediate goals and milestones to maintain motivation. Celebrate progress and small wins along the way. Stay organized with application deadlines and interview schedules. Maintain your routine even during busy periods. Remember that recruiting is a marathon, not a sprint."
        }
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
        feedbackForIncorrect: "Practice at least twice per week to build and maintain your interview skills. Consistent practice builds confidence and helps you improve continuously."
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
