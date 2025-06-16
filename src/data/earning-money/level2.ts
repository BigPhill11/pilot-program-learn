
export const earningMoneyLevel2 = {
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
    },
    {
      term: "Payroll Deductions",
      definition: "Money taken out of your paycheck for taxes, insurance, or other benefits before you receive it."
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
};
