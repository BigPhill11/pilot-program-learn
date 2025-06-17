
export interface FinancialSafetyQuiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedbackForIncorrect?: string;
}

export interface FinancialSafetyLevel {
  id: number;
  title: string;
  description: string;
  content: {
    intro: string;
    keyPoints: string[];
    scenario: {
      description: string;
      question: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
    };
    flashcards: {
      term: string;
      definition: string;
    }[];
    activity: {
      title: string;
      description: string;
      instructions: string[];
    };
    checklist: {
      title: string;
      items: string[];
    };
  };
  quiz: FinancialSafetyQuiz;
  pointsValue: number;
}

export const financialSafetyJourneyData: FinancialSafetyLevel[] = [
  {
    id: 1,
    title: "Spot the Scam",
    description: "Learn to identify and avoid common financial scams before they cost you money.",
    content: {
      intro: "Scams are everywhere — in texts, emails, even DMs. Let's learn how to spot them early and protect your money.",
      keyPoints: [
        "Scammers use urgency and fear to pressure quick decisions",
        "Legitimate companies never ask for passwords or PINs via text or email",
        "If something seems too good to be true, it probably is",
        "Always verify suspicious messages through official channels"
      ],
      scenario: {
        description: "You receive a text message saying you've won $500 from a store you've never shopped at.",
        question: "What should you check first?",
        options: [
          "Click the link to claim your prize",
          "Call the store directly using their official number",
          "Reply asking for more details",
          "Forward the message to friends"
        ],
        correctAnswer: "Call the store directly using their official number",
        explanation: "Always verify suspicious messages through official channels. Legitimate companies will have records of any real promotions."
      },
      flashcards: [
        {
          term: "Phishing",
          definition: "Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities"
        },
        {
          term: "Social Engineering",
          definition: "Manipulating people into revealing confidential information or performing actions"
        },
        {
          term: "Red Flag Words",
          definition: "Urgent phrases like 'Act now!', 'Limited time!', or 'Verify account immediately!'"
        },
        {
          term: "Too Good to Be True",
          definition: "Offers that seem unrealistically generous, often used to lure victims"
        }
      ],
      activity: {
        title: "Scam Detector Challenge",
        description: "Review different messages and identify which ones are scams",
        instructions: [
          "Read each message carefully",
          "Look for red flag indicators",
          "Check for grammar and spelling errors",
          "Identify pressure tactics",
          "Mark whether it's legitimate or a scam"
        ]
      },
      checklist: {
        title: "Scam Shield: 5 Signs It's a Scam",
        items: [
          "Urgent language demanding immediate action",
          "Requests for personal information via text/email",
          "Offers that seem too good to be true",
          "Poor grammar or spelling mistakes",
          "Unfamiliar sender or suspicious contact methods"
        ]
      }
    },
    quiz: {
      question: "Which of these messages is most likely a scam?",
      options: [
        "Your bank statement is ready for viewing online",
        "URGENT: Click here to claim your $1000 prize NOW!",
        "Your pizza order is ready for pickup",
        "Meeting reminder: Team meeting at 3 PM today"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Legitimate messages don't use urgent language or promise unexpected prizes. Always be suspicious of unsolicited prize notifications."
    },
    pointsValue: 5
  },
  {
    id: 2,
    title: "Insurance as Protection",
    description: "Understand how different types of insurance protect your financial future.",
    content: {
      intro: "Insurance doesn't stop bad things from happening — it helps you recover faster when they do.",
      keyPoints: [
        "Insurance spreads financial risk across many people",
        "Different types of insurance protect different aspects of your life",
        "Premiums are what you pay; deductibles are what you pay before coverage kicks in",
        "Having appropriate insurance can prevent financial disasters"
      ],
      scenario: {
        description: "You accidentally break your laptop while moving to a new apartment. You have renter's insurance.",
        question: "Are you covered for the laptop replacement?",
        options: [
          "Yes, renter's insurance covers all personal property",
          "Maybe, if it's covered under personal property protection",
          "No, renter's insurance only covers the apartment structure",
          "Only if you have a special electronics rider"
        ],
        correctAnswer: "Maybe, if it's covered under personal property protection",
        explanation: "Renter's insurance typically covers personal property, but you should check your policy limits and deductible to see if a laptop claim makes financial sense."
      },
      flashcards: [
        {
          term: "Premium",
          definition: "The amount you pay regularly (monthly/yearly) to keep your insurance active"
        },
        {
          term: "Deductible",
          definition: "The amount you pay out-of-pocket before insurance coverage begins"
        },
        {
          term: "Auto Insurance",
          definition: "Protects against financial loss from car accidents, theft, or damage"
        },
        {
          term: "Renter's Insurance",
          definition: "Covers personal belongings and liability for renters (not the building itself)"
        },
        {
          term: "Health Insurance",
          definition: "Helps cover medical expenses and reduces healthcare costs"
        }
      ],
      activity: {
        title: "Insurance Matching Game",
        description: "Match different life events with the appropriate type of insurance",
        instructions: [
          "Read each scenario carefully",
          "Consider what type of loss or damage occurred",
          "Match with the insurance type that would provide coverage",
          "Think about what each insurance type actually protects"
        ]
      },
      checklist: {
        title: "Insurance Essentials for Young Adults",
        items: [
          "Health insurance (often through parents until 26)",
          "Auto insurance if you drive",
          "Renter's insurance for personal belongings",
          "Understand what each policy covers and excludes",
          "Keep insurance information easily accessible"
        ]
      }
    },
    quiz: {
      question: "What is the money you pay monthly for insurance called?",
      options: [
        "Deductible",
        "Premium",
        "Copay",
        "Coverage limit"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "A premium is your regular payment to keep insurance active. A deductible is what you pay before coverage begins."
    },
    pointsValue: 5
  },
  {
    id: 3,
    title: "Digital & Identity Protection",
    description: "Build digital armor to protect your accounts, passwords, and personal information online.",
    content: {
      intro: "Your bank account, passwords, and personal info need digital armor. Let's build it together.",
      keyPoints: [
        "Strong passwords and two-factor authentication are your first line of defense",
        "Public Wi-Fi is convenient but risky for financial activities",
        "Password managers help you use unique, strong passwords everywhere",
        "Regular monitoring of accounts helps catch problems early"
      ],
      scenario: {
        description: "You're at a coffee shop and need to check your bank account balance on your phone.",
        question: "What should you avoid doing?",
        options: [
          "Using the coffee shop's free Wi-Fi for banking",
          "Using your phone's cellular data instead",
          "Waiting until you get home to check",
          "Using a VPN if you must use Wi-Fi"
        ],
        correctAnswer: "Using the coffee shop's free Wi-Fi for banking",
        explanation: "Public Wi-Fi networks are not secure. Use cellular data or a VPN for sensitive financial activities, or wait until you're on a trusted network."
      },
      flashcards: [
        {
          term: "Two-Factor Authentication (2FA)",
          definition: "Security method requiring two different ways to verify your identity"
        },
        {
          term: "Password Manager",
          definition: "Software that stores and generates strong, unique passwords for all your accounts"
        },
        {
          term: "Public Wi-Fi Risk",
          definition: "Security vulnerability when using unsecured networks that others can access"
        },
        {
          term: "Encryption",
          definition: "Process of converting information into a code to prevent unauthorized access"
        }
      ],
      activity: {
        title: "Build Your Digital Security Vault",
        description: "Set up essential digital security measures for your accounts",
        instructions: [
          "Enable two-factor authentication on important accounts",
          "Create strong, unique passwords",
          "Set up account monitoring alerts",
          "Review privacy settings on social media",
          "Practice safe browsing habits"
        ]
      },
      checklist: {
        title: "Digital Safety Essentials",
        items: [
          "Use unique passwords for every account",
          "Enable two-factor authentication where possible",
          "Avoid financial activities on public Wi-Fi",
          "Keep software and apps updated",
          "Monitor accounts regularly for suspicious activity"
        ]
      }
    },
    quiz: {
      question: "Which password is the safest?",
      options: [
        "password123",
        "MyDogFluffy!",
        "X9#mK8$nP2&vL5",
        "JohnSmith2024"
      ],
      correctAnswerIndex: 2,
      feedbackForIncorrect: "The safest passwords are long, random combinations of letters, numbers, and symbols that don't contain personal information."
    },
    pointsValue: 5
  },
  {
    id: 4,
    title: "Emergency Money Moves",
    description: "Learn why emergency funds are crucial and how to start building your financial safety net.",
    content: {
      intro: "Sometimes life throws a curveball. An emergency fund keeps you in the game when unexpected expenses arise.",
      keyPoints: [
        "Emergency funds provide financial stability during unexpected events",
        "Start small and build gradually - even $500 can help with minor emergencies",
        "Keep emergency money separate from spending money",
        "Emergency funds should be easily accessible but not too tempting to spend"
      ],
      scenario: {
        description: "Your laptop crashes during finals week and you need a replacement immediately for your final projects.",
        question: "How would an emergency fund help in this situation?",
        options: [
          "You could buy a replacement without going into debt",
          "You could borrow money from friends instead",
          "You could ask your parents for help",
          "You could use a credit card and pay it off later"
        ],
        correctAnswer: "You could buy a replacement without going into debt",
        explanation: "An emergency fund allows you to handle unexpected expenses without derailing your financial plans or going into debt."
      },
      flashcards: [
        {
          term: "Emergency Fund",
          definition: "Money set aside specifically for unexpected expenses or financial emergencies"
        },
        {
          term: "Financial Cushion",
          definition: "Extra money that provides protection against financial setbacks"
        },
        {
          term: "Cash Reserve",
          definition: "Readily available money kept for immediate access during emergencies"
        },
        {
          term: "Unexpected Expense",
          definition: "Costs that arise suddenly and weren't planned for in your budget"
        }
      ],
      activity: {
        title: "Emergency Fund Builder Challenge",
        description: "Plan how to build a starter emergency fund over time",
        instructions: [
          "Set a realistic initial goal (like $500)",
          "Identify ways to save small amounts regularly",
          "Choose where to keep your emergency fund",
          "Plan how to avoid spending it on non-emergencies",
          "Track your progress over time"
        ]
      },
      checklist: {
        title: "3-Step Emergency Fund Plan",
        items: [
          "Start with a small goal: $300-500 for minor emergencies",
          "Save consistently, even if it's just $20-50 per month",
          "Keep it separate but accessible (savings account, not checking)"
        ]
      }
    },
    quiz: {
      question: "How much should your emergency fund ideally cover?",
      options: [
        "1 month of expenses",
        "3-6 months of expenses",
        "12 months of expenses",
        "Just $1,000 total"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "Financial experts typically recommend 3-6 months of expenses for a full emergency fund, though starting smaller is perfectly fine."
    },
    pointsValue: 5
  },
  {
    id: 5,
    title: "Reporting & Recovery",
    description: "Know exactly what to do if you become a victim of fraud or identity theft.",
    content: {
      intro: "If your account gets hacked or you're scammed, don't panic. Here's your step-by-step action plan.",
      keyPoints: [
        "Quick action can limit damage from fraud or identity theft",
        "Document everything and keep records of all communications",
        "Multiple agencies and institutions can help you recover",
        "Prevention is easier than recovery, but recovery is possible"
      ],
      scenario: {
        description: "You notice that someone used your debit card to make a $200 purchase at a store you've never been to.",
        question: "What should be your first step?",
        options: [
          "Wait to see if more charges appear",
          "Call your bank immediately to report the fraud",
          "Go to the store to ask about the charge",
          "Post about it on social media to warn others"
        ],
        correctAnswer: "Call your bank immediately to report the fraud",
        explanation: "Time is critical in fraud cases. Contact your bank immediately to report unauthorized charges and prevent further damage."
      },
      flashcards: [
        {
          term: "Fraud Alert",
          definition: "A warning placed on your credit report to make it harder for identity thieves to open accounts"
        },
        {
          term: "Credit Freeze",
          definition: "Restricts access to your credit report, making it harder for thieves to open new accounts"
        },
        {
          term: "FTC Report",
          definition: "Federal Trade Commission report for identity theft and fraud complaints"
        },
        {
          term: "Dispute Charges",
          definition: "Formally challenging unauthorized or incorrect charges on your accounts"
        }
      ],
      activity: {
        title: "Fraud Response Simulation",
        description: "Practice the steps to take when fraud is discovered",
        instructions: [
          "Contact your bank or card company immediately",
          "Document the fraudulent activity",
          "File a report with the FTC at IdentityTheft.gov",
          "Monitor your accounts and credit reports",
          "Follow up on dispute resolutions"
        ]
      },
      checklist: {
        title: "First 24 Hours After Spotting Fraud",
        items: [
          "Contact your bank/credit card company immediately",
          "Change passwords for affected accounts",
          "File a report at IdentityTheft.gov",
          "Document all fraudulent activity with screenshots/photos",
          "Consider placing a fraud alert on your credit reports"
        ]
      }
    },
    quiz: {
      question: "Where can you file an official identity theft report?",
      options: [
        "Local police station only",
        "IdentityTheft.gov",
        "Your bank's website",
        "Social media platforms"
      ],
      correctAnswerIndex: 1,
      feedbackForIncorrect: "IdentityTheft.gov is the official FTC website for reporting identity theft and creating recovery plans."
    },
    pointsValue: 5
  }
];
