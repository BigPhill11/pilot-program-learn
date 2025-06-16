
export const financialSafetyLevel2 = {
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
    },
    {
      term: "Policy",
      definition: "The contract between you and the insurance company that outlines what's covered and what you pay."
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
};
