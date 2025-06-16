
export const earningMoneyLevel5 = {
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
    },
    {
      term: "Standard Deduction",
      definition: "Fixed amount you can subtract from your income to reduce taxes owed, available to all taxpayers."
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
};
