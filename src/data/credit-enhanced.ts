export interface EnhancedCreditContent {
  proTips: string[];
  realScenarios: Array<{
    name: string;
    age: number;
    story: string;
    lesson: string;
  }>;
  cheatSheet: {
    title: string;
    items: string[];
  };
  mythBusters: Array<{
    myth: string;
    truth: string;
  }>;
  actionChecklist: string[];
}

export const creditEnhancedContent: Record<number, EnhancedCreditContent> = {
  1: {
    proTips: [
      "Credit is your financial reputation - it takes years to build but can be destroyed in months.",
      "Checking your OWN credit score (soft pull) doesn't hurt it. Only lender checks (hard pulls) do."
    ],
    realScenarios: [
      {
        name: "Jasmine",
        age: 22,
        story: "I applied for an apartment and got rejected because of 'no credit history'. I wish I'd started building credit at 18!",
        lesson: "Jasmine learned that no credit is almost as bad as bad credit. She became an authorized user on her parent's card to start building history."
      }
    ],
    cheatSheet: {
      title: "Who Checks Your Credit",
      items: [
        "Landlords (for apartment rentals)",
        "Banks (for loans and credit cards)",
        "Car dealerships (for auto loans)",
        "Some employers (especially finance jobs)",
        "Insurance companies (for rates)",
        "Cell phone companies (for plans without deposit)"
      ]
    },
    mythBusters: [
      {
        myth: "Checking my score hurts it",
        truth: "Checking your own score is a 'soft pull' and doesn't affect it at all"
      },
      {
        myth: "I don't need credit if I have cash",
        truth: "Credit affects apartment rentals, job opportunities, insurance rates, and more"
      },
      {
        myth: "Carrying a credit card balance helps my score",
        truth: "FALSE! Pay in full every month. Carrying a balance just costs you interest"
      }
    ],
    actionChecklist: [
      "Understand what credit is and why it matters",
      "Check if you're an authorized user on family cards",
      "Plan to start building credit by 18-19",
      "Never share credit cards or passwords",
      "Research credit score ranges (300-850)"
    ]
  },
  2: {
    proTips: [
      "Secured credit cards are perfect first cards: $200 deposit = $200 limit. Use it responsibly for 6-12 months, then graduate to unsecured.",
      "Authorized user hack: Ask a parent with good credit to add you. You inherit their payment history!"
    ],
    realScenarios: [
      {
        name: "Chris",
        age: 19,
        story: "My parents added me as an authorized user when I was 18. Two years later, I had a 720 credit score without ever having my own card!",
        lesson: "Being an authorized user on a parent's well-managed card is the fastest way to build credit history."
      }
    ],
    cheatSheet: {
      title: "First Credit Card Options",
      items: [
        "Secured Card: Requires deposit, easiest approval (Discover, Capital One)",
        "Student Card: Designed for college students, low limits",
        "Authorized User: Added to parent/family member's account",
        "Store Card: Easier approval but only works at one store",
        "Credit Builder Loan: Not a card, but builds credit history"
      ]
    },
    mythBusters: [
      {
        myth: "I should max out my first credit card to build credit faster",
        truth: "Keep utilization under 30% (ideally under 10%). Maxing out HURTS your score"
      },
      {
        myth: "Closing my first card will help my score",
        truth: "Keep it open! It increases your average credit age and available credit"
      }
    ],
    actionChecklist: [
      "Research secured credit cards (Discover It Secured, Capital One Secured)",
      "Ask parents about becoming an authorized user",
      "Set up automatic full-balance payments",
      "Never spend more than you can pay in full",
      "Check your score monthly with Credit Karma (free)"
    ]
  },
  3: {
    proTips: [
      "The FICO Score Formula: 35% payment history, 30% utilization, 15% credit age, 10% credit mix, 10% new credit",
      "VantageScore vs FICO: You have both! FICO matters most for mortgages, VantageScore for credit cards"
    ],
    realScenarios: [
      {
        name: "Morgan",
        age: 21,
        story: "I opened 3 credit cards in one month for signup bonuses. My score dropped 40 points from all the hard inquiries!",
        lesson: "Multiple credit applications in a short time hurt your score. Morgan now spaces out applications by at least 6 months."
      }
    ],
    cheatSheet: {
      title: "Credit Score Breakdown",
      items: [
        "Payment History (35%): Never miss a payment - EVER",
        "Credit Utilization (30%): Keep balances under 30% of limits",
        "Credit Age (15%): Keep oldest accounts open",
        "Credit Mix (10%): Having different types helps slightly",
        "New Credit (10%): Don't open many accounts quickly",
        "Score Ranges: 800+ Exceptional, 740-799 Very Good, 670-739 Good, 580-669 Fair, <580 Poor"
      ]
    },
    mythBusters: [
      {
        myth: "I need to carry a balance to build credit",
        truth: "Pay in full every month. Your statement balance is what's reported, not what you carry over"
      },
      {
        myth: "Closing unused cards helps my score",
        truth: "It usually hurts by reducing available credit and average age"
      }
    ],
    actionChecklist: [
      "Set up autopay for minimum payment (backup)",
      "Pay full balance manually each month",
      "Monitor utilization - stay under 30%",
      "Check your score monthly on Credit Karma",
      "Dispute any errors on credit reports immediately"
    ]
  },
  4: {
    proTips: [
      "Late payment recovery: Call and ask for goodwill adjustment if it's your first time. Many issuers will remove it!",
      "NEVER cosign unless you can afford to pay the entire loan yourself."
    ],
    realScenarios: [
      {
        name: "Taylor",
        age: 20,
        story: "I cosigned a car loan for my boyfriend. We broke up, he stopped paying, and my credit dropped 100 points. I'm still paying off HIS car.",
        lesson: "Cosigning makes you 100% responsible if they don't pay. Taylor learned this the expensive way. Only cosign if you can afford the full payment."
      }
    ],
    cheatSheet: {
      title: "Credit Mistake Recovery Guide",
      items: [
        "Late Payment: Call issuer immediately, ask for goodwill adjustment",
        "Maxed Out Cards: Stop using, pay down to <30% ASAP",
        "Collections: Negotiate pay-for-delete before paying",
        "Too Many Hard Inquiries: Wait 6 months before new applications",
        "Identity Theft: File FTC report, freeze credit, dispute charges"
      ]
    },
    mythBusters: [
      {
        myth: "Paying off collections removes them from my report",
        truth: "They stay for 7 years. Negotiate 'pay-for-delete' before paying"
      },
      {
        myth: "Store credit cards don't count as real credit",
        truth: "They count the same! And usually have higher APRs (20-30%)"
      }
    ],
    actionChecklist: [
      "Set up account alerts for due dates",
      "Never cosign for friends/partners",
      "Keep utilization under 30% across ALL cards",
      "Avoid Buy Now Pay Later (Afterpay) - easy to overextend",
      "If you mess up, act immediately - call your issuer"
    ]
  },
  5: {
    proTips: [
      "Free credit monitoring: Credit Karma, Credit Sesame, your bank/card issuer - no need to pay!",
      "AnnualCreditReport.com gives you FREE reports from all 3 bureaus (Experian, Equifax, TransUnion) once per year"
    ],
    realScenarios: [
      {
        name: "Alex",
        age: 23,
        story: "I checked my credit report and found an account I didn't open. Someone stole my identity! I caught it early and fixed it before real damage.",
        lesson: "Regular monitoring saved Alex from major identity theft. He now checks his report every 4 months (rotating between the 3 bureaus)."
      }
    ],
    cheatSheet: {
      title: "Credit Building Timeline",
      items: [
        "Month 0-3: Apply for first card (secured or authorized user)",
        "Month 4-6: Establish on-time payment history",
        "Month 7-12: Keep utilization low, no missed payments",
        "Month 13-18: Request credit limit increase",
        "Month 19-24: Consider second card for credit mix",
        "Year 2+: Maintain good habits, score climbs naturally"
      ]
    },
    mythBusters: [
      {
        myth: "Credit repair companies can fix my credit faster",
        truth: "They can't do anything you can't do yourself for free. Save your money."
      },
      {
        myth: "I need to pay to monitor my credit",
        truth: "Credit Karma, Credit Sesame, and bank apps offer free monitoring"
      }
    ],
    actionChecklist: [
      "Sign up for Credit Karma (free scores + monitoring)",
      "Get free annual reports from AnnualCreditReport.com",
      "Dispute any errors immediately (file online)",
      "Set calendar reminder to check reports every 4 months",
      "Track score progress - celebrate milestones (650, 700, 750!)"
    ]
  }
};
