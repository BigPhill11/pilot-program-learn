
export const financialSafetyLevel1 = {
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
};
