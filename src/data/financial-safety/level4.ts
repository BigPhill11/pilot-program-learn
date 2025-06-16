
export const financialSafetyLevel4 = {
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
    },
    {
      term: "Skimming",
      definition: "When criminals attach devices to card readers to steal your card information when you swipe."
    }
  ],
  dragDropActivity: {
    title: "Safe vs Risky Spending",
    instruction: "Identify safe and risky spending practices:",
    items: [
      { id: "https", text: "Shopping on HTTPS websites" },
      { id: "public", text: "Buying online using coffee shop Wi-Fi" },
      { id: "tap", text: "Using contactless payment" },
      { id: "email", text: "Clicking payment links in emails" },
      { id: "atm", text: "Using ATMs in well-lit areas" }
    ],
    categories: [
      { id: "safe", title: "Safe Practices", correctItems: ["https", "tap", "atm"] },
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
};
