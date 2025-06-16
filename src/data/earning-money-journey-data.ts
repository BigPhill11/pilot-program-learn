
export const earningMoneyJourneyData = {
  level1: {
    title: "Where Money Comes From",
    flashcards: [
      {
        term: "Allowance",
        definition: "Regular money given by parents/guardians for chores or responsibilities, helping teens learn money management."
      },
      {
        term: "Part-time Job",
        definition: "Employment that requires fewer hours than full-time work, perfect for students to earn money while maintaining studies."
      },
      {
        term: "Freelancing",
        definition: "Working independently on projects for different clients, like tutoring, graphic design, or writing."
      },
      {
        term: "Gig Work",
        definition: "Short-term, flexible jobs like babysitting, lawn care, or delivery services that fit around your schedule."
      }
    ],
    dragDropActivity: {
      title: "Match the Earning Method",
      instruction: "Match each earning opportunity with its best description:",
      items: [
        { id: "tutoring", text: "Tutoring classmates" },
        { id: "babysitting", text: "Babysitting neighbors" },
        { id: "crafts", text: "Selling handmade crafts" },
        { id: "lawn", text: "Lawn care services" }
      ],
      categories: [
        { id: "service", title: "Service-Based", correctItems: ["tutoring", "babysitting", "lawn"] },
        { id: "product", title: "Product-Based", correctItems: ["crafts"] }
      ]
    },
    quiz: {
      question: "What's the main benefit of earning your own money as a teen?",
      options: [
        "Having unlimited spending power",
        "Building independence and budgeting skills",
        "Avoiding all responsibilities",
        "Getting rich quickly"
      ],
      correctAnswer: 1,
      explanation: "Earning your own money helps build financial independence and teaches valuable budgeting skills for the future."
    }
  },
  level2: {
    title: "Understanding Paychecks",
    flashcards: [
      {
        term: "Gross Pay",
        definition: "Your total earnings before any deductions are taken out. This is your 'raw' income."
      },
      {
        term: "Net Pay",
        definition: "Your take-home pay after taxes and other deductions. This is what actually goes into your bank account."
      },
      {
        term: "FICA",
        definition: "Federal Insurance Contributions Act - taxes for Social Security and Medicare that come out of every paycheck."
      },
      {
        term: "W-2 Form",
        definition: "Annual tax document from your employer showing total wages and taxes withheld for the year."
      }
    ],
    dragDropActivity: {
      title: "Paycheck Breakdown",
      instruction: "Drag each item to the correct section of a paycheck:",
      items: [
        { id: "hours", text: "Hours Worked: 20" },
        { id: "rate", text: "Hourly Rate: $15" },
        { id: "federal", text: "Federal Tax: $45" },
        { id: "fica", text: "FICA: $23" },
        { id: "net", text: "Take Home: $232" }
      ],
      categories: [
        { id: "earnings", title: "Earnings Section", correctItems: ["hours", "rate"] },
        { id: "deductions", title: "Deductions Section", correctItems: ["federal", "fica"] },
        { id: "total", title: "Net Pay Section", correctItems: ["net"] }
      ]
    },
    quiz: {
      question: "If your gross pay is $300 and deductions total $68, what's your net pay?",
      options: ["$368", "$232", "$300", "$68"],
      correctAnswer: 1,
      explanation: "Net pay = Gross pay - Deductions. So $300 - $68 = $232 take-home pay."
    }
  },
  level3: {
    title: "Hourly Pay vs Salary",
    flashcards: [
      {
        term: "Hourly Wage",
        definition: "Payment based on the number of hours worked. If you work more hours, you earn more money."
      },
      {
        term: "Annual Salary",
        definition: "Fixed yearly payment regardless of hours worked. Provides predictable income but no overtime pay."
      },
      {
        term: "Overtime Pay",
        definition: "Extra pay (usually 1.5x normal rate) for working more than 40 hours per week as an hourly employee."
      },
      {
        term: "Time and a Half",
        definition: "Overtime rate that equals your regular hourly rate multiplied by 1.5 (e.g., $10/hour becomes $15/hour)."
      }
    ],
    dragDropActivity: {
      title: "Pay Structure Benefits",
      instruction: "Match each benefit to the correct pay type:",
      items: [
        { id: "overtime", text: "Overtime pay available" },
        { id: "predictable", text: "Predictable monthly income" },
        { id: "flexible", text: "More hours = more money" },
        { id: "benefits", text: "Usually includes health benefits" }
      ],
      categories: [
        { id: "hourly", title: "Hourly Pay Benefits", correctItems: ["overtime", "flexible"] },
        { id: "salary", title: "Salary Benefits", correctItems: ["predictable", "benefits"] }
      ]
    },
    quiz: {
      question: "If you earn $12/hour and work 45 hours in a week, how much do you make?",
      options: ["$540", "$570", "$480", "$630"],
      correctAnswer: 1,
      explanation: "40 hours at $12 = $480, plus 5 overtime hours at $18 (time and a half) = $90. Total: $570."
    }
  },
  level4: {
    title: "Gig Work & Entrepreneur Basics",
    flashcards: [
      {
        term: "Freelance Platform",
        definition: "Websites like Fiverr, Upwork, or Etsy where you can offer services or sell products to customers worldwide."
      },
      {
        term: "Hourly Value",
        definition: "How much money you actually earn per hour after considering time spent on prep, travel, and other work tasks."
      },
      {
        term: "Entrepreneur",
        definition: "Someone who starts their own business, taking on financial risks to create something new and profitable."
      },
      {
        term: "Side Hustle",
        definition: "A secondary job or business you do alongside school or your main job to earn extra income."
      }
    ],
    dragDropActivity: {
      title: "Gig Work Categories",
      instruction: "Categorize these gig opportunities:",
      items: [
        { id: "doordash", text: "DoorDash delivery" },
        { id: "etsy", text: "Selling on Etsy" },
        { id: "fiverr", text: "Graphic design on Fiverr" },
        { id: "tutoring", text: "Online tutoring" }
      ],
      categories: [
        { id: "service", title: "Service Gigs", correctItems: ["doordash", "fiverr", "tutoring"] },
        { id: "product", title: "Product Sales", correctItems: ["etsy"] }
      ]
    },
    quiz: {
      question: "You spend 3 hours making crafts and earn $45. What's your hourly value?",
      options: ["$10", "$15", "$20", "$25"],
      correctAnswer: 1,
      explanation: "Hourly value = Total earnings ÷ Total time spent. $45 ÷ 3 hours = $15 per hour."
    }
  },
  level5: {
    title: "Taxes for Earners",
    flashcards: [
      {
        term: "W-4 Form",
        definition: "Form you fill out when starting a job to tell your employer how much tax to withhold from your paychecks."
      },
      {
        term: "Tax Withholding",
        definition: "Money your employer takes out of each paycheck to pay your taxes throughout the year."
      },
      {
        term: "Tax Return",
        definition: "Annual form you file with the IRS to report your income and calculate if you owe taxes or get a refund."
      },
      {
        term: "Financial Records",
        definition: "Organized documents of your income and expenses that help you file taxes and track your money."
      }
    ],
    dragDropActivity: {
      title: "Tax Document Timeline",
      instruction: "Put these tax-related events in the correct order:",
      items: [
        { id: "w4", text: "Fill out W-4 form" },
        { id: "withhold", text: "Taxes withheld from paychecks" },
        { id: "w2", text: "Receive W-2 form" },
        { id: "file", text: "File tax return" }
      ],
      categories: [
        { id: "start", title: "When You Start Working", correctItems: ["w4"] },
        { id: "during", title: "During the Year", correctItems: ["withhold"] },
        { id: "year-end", title: "End of Year", correctItems: ["w2"] },
        { id: "tax-season", title: "Tax Season", correctItems: ["file"] }
      ]
    },
    quiz: {
      question: "Why is it important to keep financial records when you start earning money?",
      options: [
        "To impress your friends",
        "To help file taxes and track spending",
        "Records aren't important for teens",
        "Only for people with high incomes"
      ],
      correctAnswer: 1,
      explanation: "Keeping financial records helps you file taxes correctly and understand your spending patterns, building good financial habits early."
    }
  },
  miniGame: {
    title: "Monthly Budget Builder",
    description: "Create a realistic monthly budget based on your earning scenario!",
    scenario: "You work 15 hours/week at $12/hour and have $50/month allowance. Plan your monthly budget:",
    monthlyIncome: 770, // (15 hours × $12 × 4 weeks) + $50 allowance = $770
    categories: [
      { id: "savings", name: "Savings", recommended: 20, min: 10, max: 50 },
      { id: "entertainment", name: "Entertainment", recommended: 30, min: 10, max: 40 },
      { id: "food", name: "Food/Snacks", recommended: 25, min: 15, max: 35 },
      { id: "transportation", name: "Transportation", recommended: 15, min: 5, max: 25 },
      { id: "clothes", name: "Clothes", recommended: 10, min: 5, max: 20 }
    ]
  }
};
