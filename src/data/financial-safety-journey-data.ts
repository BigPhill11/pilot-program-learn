
export const financialSafetyJourneyData = {
  level1: {
    title: "Identity Theft & Fraud",
    flashcards: [
      {
        term: "Phishing",
        definition: "Fake emails or texts that trick you into giving away personal information like passwords or social security numbers."
      },
      {
        term: "Identity Theft",
        definition: "When someone steals your personal information to open accounts, make purchases, or commit crimes in your name."
      },
      {
        term: "Credit Freeze",
        definition: "A security measure that prevents new credit accounts from being opened in your name without your permission."
      },
      {
        term: "Two-Factor Authentication",
        definition: "Extra security that requires two different ways to verify your identity, like a password plus a text code."
      }
    ],
    dragDropActivity: {
      title: "Spot the Red Flags",
      instruction: "Identify which messages are scams:",
      items: [
        { id: "urgent", text: "URGENT! Click now or lose your account!" },
        { id: "grammar", text: "Your acount has been comprimised, click hear" },
        { id: "legitimate", text: "Your bank statement is ready for download" },
        { id: "prize", text: "Congratulations! You've won $1000! Send SSN to claim!" }
      ],
      categories: [
        { id: "scam", title: "Scam Red Flags", correctItems: ["urgent", "grammar", "prize"] },
        { id: "safe", title: "Potentially Legitimate", correctItems: ["legitimate"] }
      ]
    },
    quiz: {
      question: "What should you do if you receive a suspicious email asking for your password?",
      options: [
        "Click the link to verify it's real",
        "Reply with your password to be safe",
        "Delete it and report it as spam",
        "Forward it to all your friends"
      ],
      correctAnswer: 2,
      explanation: "Never click suspicious links or share personal information. Delete suspicious emails and report them as spam."
    }
  },
  level2: {
    title: "Understanding Insurance",
    flashcards: [
      {
        term: "Premium",
        definition: "The amount you pay monthly or yearly to keep your insurance active. Like a membership fee for protection."
      },
      {
        term: "Deductible",
        definition: "The amount you pay out-of-pocket before insurance starts covering costs. Higher deductible = lower premium."
      },
      {
        term: "Co-pay",
        definition: "A fixed amount you pay for specific services, like $20 for a doctor visit, regardless of the total cost."
      },
      {
        term: "Coverage",
        definition: "What your insurance will pay for when something bad happens, like medical bills or stolen property."
      }
    ],
    dragDropActivity: {
      title: "Insurance Scenarios",
      instruction: "Match each situation with the right insurance type:",
      items: [
        { id: "bike", text: "Your bike gets stolen from college dorm" },
        { id: "accident", text: "You break your arm playing sports" },
        { id: "car", text: "You crash your car into a tree" },
        { id: "laptop", text: "Your laptop is damaged in apartment fire" }
      ],
      categories: [
        { id: "health", title: "Health Insurance", correctItems: ["accident"] },
        { id: "auto", title: "Auto Insurance", correctItems: ["car"] },
        { id: "renters", title: "Renters Insurance", correctItems: ["bike", "laptop"] }
      ]
    },
    quiz: {
      question: "If your renters insurance has a $500 deductible and your stolen laptop costs $800 to replace, how much will insurance pay?",
      options: ["$800", "$500", "$300", "$0"],
      correctAnswer: 2,
      explanation: "Insurance pays the total cost minus your deductible: $800 - $500 = $300."
    }
  },
  level3: {
    title: "Emergency Planning",
    flashcards: [
      {
        term: "Emergency Fund",
        definition: "Money saved specifically for unexpected expenses like medical bills, car repairs, or job loss."
      },
      {
        term: "Financial Cushion",
        definition: "Extra money available to handle surprises without going into debt or borrowing from others."
      },
      {
        term: "Liquid Savings",
        definition: "Money that's easily accessible when you need it, like in a savings account rather than investments."
      },
      {
        term: "Rainy Day Fund",
        definition: "Another term for emergency fund - money set aside for when 'rainy days' (bad situations) happen."
      }
    ],
    dragDropActivity: {
      title: "Emergency vs Non-Emergency",
      instruction: "Categorize these expenses:",
      items: [
        { id: "hospital", text: "Emergency room visit" },
        { id: "vacation", text: "Spring break trip" },
        { id: "repair", text: "Car breaks down" },
        { id: "concert", text: "Concert tickets" }
      ],
      categories: [
        { id: "emergency", title: "True Emergencies", correctItems: ["hospital", "repair"] },
        { id: "wants", title: "Wants (Not Emergencies)", correctItems: ["vacation", "concert"] }
      ]
    },
    quiz: {
      question: "How much should a teen aim to save in their emergency fund?",
      options: [
        "$10,000 minimum",
        "$500-$1,000 to start",
        "6 months of income immediately",
        "Emergency funds aren't for teens"
      ],
      correctAnswer: 1,
      explanation: "Starting with $500-$1,000 is realistic for teens and provides a good foundation for handling small emergencies."
    }
  },
  level4: {
    title: "Safe Spending Habits",
    flashcards: [
      {
        term: "Secure Website",
        definition: "A website that uses HTTPS (look for the lock icon) to protect your personal and payment information."
      },
      {
        term: "Public Wi-Fi Risk",
        definition: "Danger of hackers stealing your information when you use unsecured internet in coffee shops, airports, etc."
      },
      {
        term: "Fraud Protection",
        definition: "Security features that monitor your accounts for suspicious activity and can reverse unauthorized charges."
      },
      {
        term: "Contactless Payment",
        definition: "Safer way to pay using your phone or tapping your card instead of swiping, reducing fraud risk."
      }
    ],
    dragDropActivity: {
      title: "Safe vs Risky Spending",
      instruction: "Identify safe and risky spending practices:",
      items: [
        { id: "https", text: "Shopping on HTTPS websites" },
        { id: "public", text: "Buying online using coffee shop Wi-Fi" },
        { id: "tap", text: "Using contactless payment" },
        { id: "email", text: "Clicking payment links in emails" }
      ],
      categories: [
        { id: "safe", title: "Safe Practices", correctItems: ["https", "tap"] },
        { id: "risky", title: "Risky Practices", correctItems: ["public", "email"] }
      ]
    },
    quiz: {
      question: "Which payment method offers the best fraud protection?",
      options: [
        "Cash only",
        "Debit cards",
        "Credit cards",
        "Venmo transfers"
      ],
      correctAnswer: 2,
      explanation: "Credit cards offer the strongest fraud protection with zero liability policies and the ability to dispute charges easily."
    }
  },
  level5: {
    title: "Consumer Protections & Rights",
    flashcards: [
      {
        term: "FDIC Insurance",
        definition: "Federal protection that guarantees your bank deposits up to $250,000 even if the bank fails."
      },
      {
        term: "Return Policy",
        definition: "Store rules about returning or exchanging items. Always check before buying expensive items."
      },
      {
        term: "CFPB",
        definition: "Consumer Financial Protection Bureau - government agency that helps consumers with financial complaints."
      },
      {
        term: "Chargeback",
        definition: "Process to reverse a credit card charge when you've been scammed or didn't receive what you paid for."
      }
    ],
    dragDropActivity: {
      title: "Know Your Rights",
      instruction: "Match each right with the correct situation:",
      items: [
        { id: "return", text: "Right to return defective products" },
        { id: "dispute", text: "Right to dispute fraudulent charges" },
        { id: "fdic", text: "Right to protected bank deposits" },
        { id: "complaint", text: "Right to file complaints with CFPB" }
      ],
      categories: [
        { id: "shopping", title: "Shopping Rights", correctItems: ["return"] },
        { id: "banking", title: "Banking Rights", correctItems: ["dispute", "fdic", "complaint"] }
      ]
    },
    quiz: {
      question: "If your bank goes out of business, what happens to your money?",
      options: [
        "You lose everything",
        "FDIC protects up to $250,000",
        "You have to sue the bank",
        "Only millionaires get protection"
      ],
      correctAnswer: 1,
      explanation: "FDIC insurance protects all depositors up to $250,000 per account, so your money is safe even if the bank fails."
    }
  },
  miniGame: {
    title: "Scam Detector Challenge",
    description: "Test your skills by identifying scams and red flags!",
    scenarios: [
      {
        id: 1,
        message: "You've won our daily lottery! Send your bank account number to claim your $5,000 prize!",
        isScam: true,
        redFlags: ["unsolicited prize", "asking for bank info", "urgency"]
      },
      {
        id: 2,
        message: "Your Netflix subscription will expire tomorrow. Please update your payment method at netflix.com",
        isScam: false,
        redFlags: []
      },
      {
        id: 3,
        message: "URGENT: Your Apple ID has been locked. Click here immediately to unlock: apple-security-unlock.net",
        isScam: true,
        redFlags: ["urgency", "suspicious URL", "fake domain"]
      },
      {
        id: 4,
        message: "Hi! Thanks for shopping with us. Your order #12345 will arrive Thursday. Track it on our website.",
        isScam: false,
        redFlags: []
      }
    ]
  }
};
