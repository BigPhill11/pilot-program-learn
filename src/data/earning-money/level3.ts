
export const earningMoneyLevel3 = {
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
    },
    {
      term: "Exempt Employee",
      definition: "Salaried employee who doesn't receive overtime pay, typically in professional or managerial roles."
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
};
