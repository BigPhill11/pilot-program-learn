
export const financialSafetyMiniGame = {
  title: "Scam Detector Challenge",
  description: "Test your skills by identifying scams and red flags!",
  scenarios: [
    {
      id: 1,
      message: "You've won our daily lottery! Send your bank account number to claim your $5,000 prize!",
      isScam: true,
      redFlags: ["unsolicited prize", "asking for bank info", "urgency"]
    },
    {
      id: 2,
      message: "Your Netflix subscription will expire tomorrow. Please update your payment method at netflix.com",
      isScam: false,
      redFlags: []
    },
    {
      id: 3,
      message: "URGENT: Your Apple ID has been locked. Click here immediately to unlock: apple-security-unlock.net",
      isScam: true,
      redFlags: ["urgency", "suspicious URL", "fake domain"]
    },
    {
      id: 4,
      message: "Hi! Thanks for shopping with us. Your order #12345 will arrive Thursday. Track it on our website.",
      isScam: false,
      redFlags: []
    },
    {
      id: 5,
      message: "Your credit card has suspicious activity. Call this number immediately: 555-SCAM-NOW",
      isScam: true,
      redFlags: ["urgency", "suspicious phone number", "fear tactics"]
    }
  ]
};
