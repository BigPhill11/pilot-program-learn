
export const earningMoneyMiniGame = {
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
};
