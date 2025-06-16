
export const financialSafetyLevel5 = {
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
    },
    {
      term: "Warranty",
      definition: "Guarantee from the manufacturer or seller that a product will work properly for a certain period."
    }
  ],
  dragDropActivity: {
    title: "Know Your Rights",
    instruction: "Match each right with the correct situation:",
    items: [
      { id: "return", text: "Right to return defective products" },
      { id: "dispute", text: "Right to dispute fraudulent charges" },
      { id: "fdic", text: "Right to protected bank deposits" },
      { id: "complaint", text: "Right to file complaints with CFPB" },
      { id: "warranty", text: "Right to warranty coverage" }
    ],
    categories: [
      { id: "shopping", title: "Shopping Rights", correctItems: ["return", "warranty"] },
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
};
