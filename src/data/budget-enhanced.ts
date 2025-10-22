export interface EnhancedBudgetContent {
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
  psychologicalInsights: string[];
  actionChecklist: string[];
}

export const budgetEnhancedContent: Record<number, EnhancedBudgetContent> = {
  1: {
    proTips: [
      "The '24-hour rule': Wait 24 hours before buying anything over $50. You'll avoid 80% of impulse purchases!",
      "Subscription creep is real: Netflix + Spotify + Amazon + Disney+ = $50+/month. Review subscriptions quarterly."
    ],
    realScenarios: [
      {
        name: "Jamie",
        age: 19,
        story: "I thought I was broke until I tracked my spending for a month. Turned out I was spending $200/month on coffee shops and takeout!",
        lesson: "Small purchases add up fast. Jamie switched to making coffee at home 4 days/week and saved $120/month instantly."
      }
    ],
    cheatSheet: {
      title: "Spending Traps to Avoid",
      items: [
        "Buy now, pay later (Afterpay, Klarna) - still debt!",
        "Free shipping minimums - buying more to 'save'",
        "Monthly subscriptions you forget about",
        "FOMO spending - buying because friends are",
        "Sales that aren't really sales (marked up first)"
      ]
    },
    psychologicalInsights: [
      "Red sale tags trigger urgency - don't fall for it",
      "Using cash makes you spend 15-20% less than cards",
      "People overestimate needs and underestimate wants"
    ],
    actionChecklist: [
      "Open a separate checking and savings account",
      "Download a budget app (Mint, YNAB, EveryDollar)",
      "Set up automatic savings transfers",
      "Review last month's bank statements"
    ]
  },
  2: {
    proTips: [
      "The 50/30/20 rule is a guideline, not law. High rent area? Try 60/20/20. Student with few expenses? Try 40/30/30.",
      "Pay yourself first: Transfer savings BEFORE spending on wants."
    ],
    realScenarios: [
      {
        name: "Marcus",
        age: 21,
        story: "I tried 50/30/20 but my rent was 60% of income. I felt like a failure until I adjusted it to 65/20/15.",
        lesson: "Flexibility is key. Marcus prioritizes needs (65%) but still saves 15%. As income grows, he'll rebalance."
      }
    ],
    cheatSheet: {
      title: "Budget Ratio Situations",
      items: [
        "Standard: 50% needs / 30% wants / 20% savings",
        "High rent area: 60% needs / 20% wants / 20% savings",
        "Student life: 40% needs / 40% wants / 20% savings",
        "Aggressive saver: 50% needs / 20% wants / 30% savings",
        "Debt payoff: 50% needs / 20% wants / 30% debt"
      ]
    },
    psychologicalInsights: [
      "Seeing savings grow is more motivating than restriction",
      "Label your savings (e.g., 'Europe Trip Fund')",
      "Round up rule: $3.42 purchase → save $0.58 to reach $4"
    ],
    actionChecklist: [
      "Calculate your take-home income",
      "List all needs (rent, food, transport, insurance)",
      "Identify wants (entertainment, dining out, hobbies)",
      "Set savings goals (emergency fund first!)",
      "Try your ratio for 1 month, then adjust"
    ]
  },
  3: {
    proTips: [
      "Best budget apps for teens: Mint (free, connects to bank), YNAB (free for students), EveryDollar (basic version free)",
      "Track EVERY purchase for 30 days - you'll find patterns you never knew existed."
    ],
    realScenarios: [
      {
        name: "Zoe",
        age: 18,
        story: "I tracked my spending for 30 days and realized I spent $60/month on energy drinks. I switched to coffee and saved $720/year!",
        lesson: "Small daily purchases are budget killers. Zoe's $2/day energy drinks cost her $720 annually. Awareness leads to change."
      }
    ],
    cheatSheet: {
      title: "30-Day Tracking Challenge",
      items: [
        "Week 1: Just observe - don't judge your spending",
        "Week 2: Categorize every purchase (needs vs wants)",
        "Week 3: Identify your 'money leak' categories",
        "Week 4: Set one spending goal to improve",
        "Tip: Take photos of receipts or use app scanning"
      ]
    },
    psychologicalInsights: [
      "Tuesday lunch spending is often a pattern",
      "Weekend entertainment spending spikes 3x",
      "First week of month = highest spending (payday effect)"
    ],
    actionChecklist: [
      "Choose tracking method (app, spreadsheet, notebook)",
      "Save every receipt for 30 days",
      "Set aside 10 minutes weekly to categorize",
      "Identify top 3 spending categories",
      "Set ONE improvement goal after 30 days"
    ]
  },
  4: {
    proTips: [
      "SMART goals work: 'Save $1,000 for emergency fund by Dec 31' beats 'save more money'",
      "Stack your goals: Short-term ($500 emergency), Medium-term (car down payment), Long-term (retirement)"
    ],
    realScenarios: [
      {
        name: "Dev",
        age: 20,
        story: "I wanted to 'save for the future' but never saved anything. Then I made it specific: $2,000 for a Europe trip by next June. I'm at $1,400!",
        lesson: "Vague goals don't motivate. Dev attached his savings to a specific, exciting goal with a deadline. It worked!"
      }
    ],
    cheatSheet: {
      title: "Financial Goals Timeline",
      items: [
        "0-1 year: $500-1000 emergency fund, pay off credit cards",
        "1-3 years: 3-month emergency fund, save for car",
        "3-5 years: Down payment for house, invest in IRA",
        "5-10 years: Retirement savings, education fund",
        "10+ years: Financial independence, major life goals"
      ]
    },
    psychologicalInsights: [
      "Visual goal trackers increase success by 42%",
      "Sharing goals with friends creates accountability",
      "Small wins (hitting $100 saved) build momentum"
    ],
    actionChecklist: [
      "Write down 1 short-term goal (0-1 year)",
      "Make it SMART (Specific, Measurable, Achievable, Relevant, Time-bound)",
      "Calculate weekly/monthly savings needed",
      "Set up automatic transfers to savings",
      "Create visual tracker (chart, app, jar)"
    ]
  },
  5: {
    proTips: [
      "Lifestyle inflation is the enemy: Got a raise? Bank the difference before you get used to spending it.",
      "Budget red flags: Overdraft fees, carrying credit card balances, no emergency fund"
    ],
    realScenarios: [
      {
        name: "Riley",
        age: 23,
        story: "I got a $5,000 raise and somehow still felt broke 6 months later. I increased my spending without realizing it.",
        lesson: "Riley now follows the '50% rule': save or invest 50% of any raise before lifestyle inflation kicks in."
      }
    ],
    cheatSheet: {
      title: "Budget Adjustment Scenarios",
      items: [
        "Job loss: Cut wants to 5-10%, maximize needs efficiency",
        "Got a raise: Save 50%, enjoy 50% (avoid lifestyle inflation)",
        "Moving cities: Research cost of living first, adjust ratios",
        "Unexpected expense: Use emergency fund, rebuild it ASAP",
        "Income varies: Base budget on LOWEST month's income"
      ]
    },
    psychologicalInsights: [
      "Income increases don't make you happier after adjusting",
      "Loss aversion: Cutting spending feels worse than never having it",
      "Auto-escalation: Increase savings % when income increases"
    ],
    actionChecklist: [
      "Review budget quarterly (every 3 months)",
      "Adjust when income changes +/- 10%",
      "Rebuild emergency fund after using it",
      "Re-evaluate subscriptions semi-annually",
      "Plan for known changes (graduating, moving)"
    ]
  }
};
