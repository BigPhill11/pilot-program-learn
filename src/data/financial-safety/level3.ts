
export const financialSafetyLevel3 = {
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
    },
    {
      term: "Financial Buffer",
      definition: "A safety net of money that protects you from financial stress during unexpected events."
    }
  ],
  dragDropActivity: {
    title: "Emergency vs Non-Emergency",
    instruction: "Categorize these expenses:",
    items: [
      { id: "hospital", text: "Emergency room visit" },
      { id: "vacation", text: "Spring break trip" },
      { id: "repair", text: "Car breaks down" },
      { id: "concert", text: "Concert tickets" },
      { id: "medicine", text: "Prescription medication" }
    ],
    categories: [
      { id: "emergency", title: "True Emergencies", correctItems: ["hospital", "repair", "medicine"] },
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
};
