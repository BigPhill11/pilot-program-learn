export interface EnhancedBudgetContent {
  proTips: string[];
  realScenarios: Array<{
    name: string;
    age: number;
    story: string;
    lesson: string;
    outcome: string;
  }>;
  cheatSheet: {
    title: string;
    items: string[];
  };
  commonMistakes: Array<{
    mistake: string;
    consequence: string;
    avoidanceStrategy: string;
  }>;
  nextSteps: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  expertInsights: string[];
  resources: Array<{
    name: string;
    type: 'app' | 'website' | 'tool' | 'book';
    description: string;
    isFree: boolean;
  }>;
  modernExamples: Array<{
    scenario: string;
    breakdown: string;
    actionSteps: string[];
  }>;
}

export const budgetingEnhancedContent: Record<number, EnhancedBudgetContent> = {
  1: {
    proTips: [
      "Start by tracking every expense for one week - no judgment, just awareness. You can't improve what you don't measure.",
      "The average person wastes $100-$300/month on forgotten subscriptions. Review yours monthly.",
      "Use the 24-hour rule: Wait a full day before making any non-essential purchase over $50. Most impulse buying fades overnight."
    ],
    realScenarios: [
      {
        name: "Marcus",
        age: 19,
        story: "Marcus got his first paycheck and immediately bought a $200 gaming headset. By month-end, he couldn't afford groceries and had to borrow money from his parents.",
        lesson: "He learned to distinguish between needs (groceries) and wants (gaming gear) the hard way.",
        outcome: "Now Marcus follows a simple rule: cover all needs first, then allocate 20% of what's left for wants. He saved up for the headset over 3 months instead."
      },
      {
        name: "Aisha",
        age: 22,
        story: "Aisha thought budgeting meant she couldn't have fun. She avoided tracking expenses because she felt guilty about every purchase.",
        lesson: "Her friend showed her that budgeting actually gives permission to spend - just within planned amounts.",
        outcome: "Once she allocated $150/month for entertainment, she stopped feeling guilty and actually spent less than before because she was intentional about it."
      },
      {
        name: "Tyler",
        age: 18,
        story: "Tyler's car insurance was due but he'd spent all his money on eating out with friends. The policy lapsed, and when he got a parking ticket, it escalated to a court fine.",
        lesson: "Not all expenses are equal - some are critical and time-sensitive.",
        outcome: "Tyler now keeps a calendar of all bills and sets aside money as soon as he gets paid. His 'bills account' is untouchable for anything else."
      }
    ],
    cheatSheet: {
      title: "Money Basics Quick Reference",
      items: [
        "Income = Money coming IN (paychecks, gig work, gifts)",
        "Expenses = Money going OUT (rent, food, entertainment)",
        "Needs = Must-haves for survival (housing, basic food, healthcare, transportation to work)",
        "Wants = Nice-to-haves that enhance life (streaming services, dining out, latest tech)",
        "Budget = Your money plan: income minus needs minus savings = available for wants"
      ]
    },
    commonMistakes: [
      {
        mistake: "Treating all expenses as equally urgent",
        consequence: "Running out of money for critical bills, late fees, service interruptions",
        avoidanceStrategy: "Create a priority list: 1) Survival needs (rent, food), 2) Bills with late fees (insurance, utilities), 3) Everything else"
      },
      {
        mistake: "Not accounting for irregular expenses",
        consequence: "Surprise car registration, birthday gifts, or holiday spending derails your budget every few months",
        avoidanceStrategy: "Add up all yearly irregular expenses, divide by 12, and budget that monthly. Example: $600 car insurance once/year = $50/month to save"
      },
      {
        mistake: "Confusing gross pay with take-home pay",
        consequence: "Planning to spend money you'll never actually see (it goes to taxes)",
        avoidanceStrategy: "Always budget based on your actual take-home pay after taxes, not your salary or hourly rate × hours"
      }
    ],
    nextSteps: {
      immediate: [
        "Download a free budgeting app (Mint, YNAB, or even just use your Notes app)",
        "Write down your last month's income and every expense you can remember",
        "Identify your top 3 needs and top 3 wants from last month"
      ],
      shortTerm: [
        "Track every expense for 30 days to understand your baseline spending",
        "Calculate what percentage of your income goes to needs vs wants",
        "Set up separate checking accounts or digital envelopes for needs and wants"
      ],
      longTerm: [
        "Build a complete budget template that accounts for all your regular expenses",
        "Establish an automatic transfer system for savings before you see the money",
        "Review and adjust your budget quarterly as your income and life change"
      ]
    },
    expertInsights: [
      "The number one reason people fail at budgeting isn't lack of willpower - it's lack of clarity about what they're actually spending money on. Track first, judge later.",
      "Most people overestimate their needs and underestimate their wants. If you haven't used it to survive in the past month, it's probably a want.",
      "Budgeting isn't about restriction - it's about intention. You're not saying 'no' to spending, you're saying 'yes' to spending on what actually matters to you."
    ],
    resources: [
      {
        name: "Mint",
        type: "app",
        description: "Automatic expense tracking that connects to your bank accounts",
        isFree: true
      },
      {
        name: "YNAB (You Need A Budget)",
        type: "app",
        description: "Zero-based budgeting app with envelope method",
        isFree: false
      },
      {
        name: "EveryDollar",
        type: "app",
        description: "Simple budget app following Dave Ramsey's principles",
        isFree: true
      },
      {
        name: "Broke Millennial",
        type: "book",
        description: "Beginner-friendly book on budgeting and money management",
        isFree: false
      }
    ],
    modernExamples: [
      {
        scenario: "College student working part-time, living with roommates",
        breakdown: "Monthly income: $1,200. Rent: $450, groceries: $200, phone: $50, transportation: $100, student loan: $100 = $900 in needs. Remaining: $300 for wants and savings.",
        actionSteps: [
          "Set up automatic transfer of $60 to savings account on payday (20%)",
          "Allocate $240/month for wants (entertainment, eating out, shopping)",
          "Track daily using app to stay within $8/day for wants"
        ]
      },
      {
        scenario: "Recent graduate in first apartment, entry-level job",
        breakdown: "Monthly income: $3,000 after taxes. Rent: $1,000, utilities: $150, groceries: $300, car payment: $250, insurance: $150, gas: $100 = $1,950 in needs. Remaining: $1,050.",
        actionSteps: [
          "Save $600/month (20% of gross + emergency fund building)",
          "Allocate $450 for wants and personal spending",
          "Keep first $1,950 untouchable in bills-only checking account"
        ]
      }
    ]
  },
  2: {
    proTips: [
      "The 50/30/20 rule is a guideline, not gospel. If you live in a high-cost area, your needs might be 60-65%. Adjust based on your reality.",
      "To find your ideal percentages: Track for 3 months, average it out, then see where you can optimize. Your real spending reveals what your actual budget should be.",
      "Automate your 20% savings immediately after payday - pay yourself first. What's in your checking account is available to spend.",
      "If you're consistently failing the 50/30/20 rule, your income might be too low OR your fixed expenses too high. Sometimes the budget isn't the problem - your situation is."
    ],
    realScenarios: [
      {
        name: "Jamal",
        age: 21,
        story: "Jamal tried the 50/30/20 rule but lived in an expensive city where rent alone was 50% of his income. He felt like a failure because he couldn't save 20%.",
        lesson: "He learned that rules are starting points, not rigid requirements. He adjusted to 60/25/15 while looking for ways to increase income.",
        outcome: "After a year, Jamal got a roommate (cut rent from 50% to 30%) and picked up freelance work. Now he's doing 50/25/25 and building wealth."
      },
      {
        name: "Sofia",
        age: 23,
        story: "Sofia made $4,500/month and tried to save exactly $900 (20%). But she kept dipping into savings for 'emergencies' like concert tickets.",
        lesson: "She realized she wasn't being honest about what 'wants' really cost her. Her real want spending was closer to 40%.",
        outcome: "Sofia created a 'fun money' account with $100/week. Once it's gone, it's gone. She saves the intended 20% now because wants have a hard limit."
      },
      {
        name: "David",
        age: 19,
        story: "David thought the 30% for wants meant he should spend it all. He treated it like a requirement, buying things just because he had 'want budget' left.",
        lesson: "The percentages are maximums, not targets. Spending less than your budget allocation isn't 'wasting' it.",
        outcome: "When David shifted his mindset to 'up to 30%' instead of 'must spend 30%', he naturally spent only 20% on wants and increased his savings rate."
      }
    ],
    cheatSheet: {
      title: "50/30/20 Rule Breakdown",
      items: [
        "50% Needs: Housing, utilities, groceries, transportation, insurance, minimum debt payments",
        "30% Wants: Dining out, entertainment, hobbies, subscriptions, shopping, travel",
        "20% Savings & Extra Debt: Emergency fund, retirement, investments, extra debt payments above minimums",
        "Quick check: If you can pause it without consequences = want. If pausing creates problems = need.",
        "Red flag: If needs exceed 60%, you need to increase income or decrease fixed costs (move, cheaper car, etc.)"
      ]
    },
    commonMistakes: [
      {
        mistake: "Treating minimum debt payments as 'savings'",
        consequence: "You think you're saving 20% but you're just paying bills. Debt doesn't go away if you stop paying it.",
        avoidanceStrategy: "Minimum debt payments go in the 50% needs bucket. Only EXTRA debt payments count toward the 20% savings bucket."
      },
      {
        mistake: "Not building an emergency fund before investing",
        consequence: "You invest your 20% savings, then an emergency hits and you either pay penalties to withdraw or go into debt.",
        avoidanceStrategy: "First priority for your 20%: Build $1,000 emergency fund, then 3-6 months expenses. Only then start investing."
      },
      {
        mistake: "Miscategorizing wants as needs",
        consequence: "Calling Netflix or DoorDash 'needs' inflates your needs percentage and gives false permission to overspend.",
        avoidanceStrategy: "Ask: 'Will I face serious consequences if I pause this for 3 months?' If no = want. Be brutally honest."
      }
    ],
    nextSteps: {
      immediate: [
        "Calculate your after-tax monthly income × 0.5, 0.3, and 0.2 to see your target amounts",
        "List all your current expenses and categorize each as need, want, or savings",
        "Add up each category and calculate what percentage of income each represents"
      ],
      shortTerm: [
        "Identify the biggest gap (usually needs are too high or savings too low)",
        "Make one concrete change this month to move closer to 50/30/20 (get roommate, cancel subscriptions, automate savings)",
        "Set up three separate accounts: Needs (50%), Wants (30%), Savings (20%) and auto-transfer on payday"
      ],
      longTerm: [
        "Review percentages quarterly - adjust as income changes",
        "Work toward making your needs percentage smaller over time (more income or lower fixed costs)",
        "Once you master 50/30/20, challenge yourself to 50/20/30 or even 50/15/35"
      ]
    },
    expertInsights: [
      "The 50/30/20 rule was designed for median-income earners in average-cost areas. If that's not you, adjust! A good budget reflects your reality, not ideal math.",
      "The secret isn't the exact percentages - it's the habit of consciously allocating every dollar. You're building intentionality, not following rules.",
      "If your 50% needs are actually 70%, that's useful information. Now you know: either earn more or change your living situation. The budget reveals the truth."
    ],
    resources: [
      {
        name: "50/30/20 Calculator",
        type: "website",
        description: "NerdWallet's free calculator to break down your income",
        isFree: true
      },
      {
        name: "Personal Capital",
        type: "app",
        description: "Tracks spending by category and shows you your actual percentages",
        isFree: true
      },
      {
        name: "Your Money or Your Life",
        type: "book",
        description: "Classic book on aligning spending with values",
        isFree: false
      }
    ],
    modernExamples: [
      {
        scenario: "Applying 50/30/20 to $3,000/month income",
        breakdown: "Needs budget: $1,500. Wants budget: $900. Savings: $600. But rent is $1,200 and other needs are $600 = $1,800 total needs.",
        actionSteps: [
          "Acknowledge the gap: Needs are 60%, not 50%",
          "Immediate fix: Reduce wants to 25% ($750) to still hit 15% savings ($450)",
          "Long-term fix: Find roommate to cut rent to $800, bringing needs to 48%",
          "Then restore full 20% savings and increase wants budget guilt-free"
        ]
      },
      {
        scenario: "High earner struggling with lifestyle inflation",
        breakdown: "$8,000/month income but needs creep up to $5,000 (upgraded apartment, luxury car). That's 62.5% on needs.",
        actionSteps: [
          "Recognize that lifestyle inflation is eating savings potential",
          "Question each 'need': Is this truly required or a habit?",
          "Downgrade one major expense (car payment from $700 to $300)",
          "That $400/month freed up goes straight to investments, not wants"
        ]
      }
    ]
  },
  3: {
    proTips: [
      "Automate your tracking - manually writing down every coffee gets old fast. Use bank app tags or spending apps that auto-categorize.",
      "Check your spending weekly, not monthly. Weekly reviews let you course-correct before you're way over budget.",
      "Take a photo of every cash receipt. Cash is the #1 budget leak because it disappears without a trace.",
      "Track by day, not by transaction. Knowing you spent $47.53 on Tuesday matters more than itemizing every Venmo request."
    ],
    realScenarios: [
      {
        name: "Emma",
        age: 20,
        story: "Emma swore she only spent about $200/month eating out. When she actually tracked for a month, it was $487. She was shocked and defensive.",
        lesson: "Human memory is terrible at estimating spending. The gap between 'feels like' and reality can be 50-100%.",
        outcome: "Emma now checks her spending every Saturday morning. Seeing the real numbers helps her make better choices for the week ahead. She's down to $250/month."
      },
      {
        name: "Chris",
        age: 24,
        story: "Chris tried every budgeting app but none stuck. They all required too much effort to categorize and input data.",
        lesson: "The best tracking system is the one you'll actually use. Perfection is the enemy of good enough.",
        outcome: "Chris now just checks his bank app every morning while having coffee. Takes 90 seconds. He doesn't categorize, just mentally notes: 'Wow, that's a lot on food this week, let's cook tonight.'"
      },
      {
        name: "Priya",
        age: 22,
        story: "Priya tracked perfectly for 3 months, then got busy and stopped. Her spending immediately ballooned back to old patterns.",
        lesson: "Tracking isn't a temporary project - it's a habit like brushing teeth. You don't stop doing it once your teeth are clean.",
        outcome: "Priya set a phone reminder for Sunday evenings labeled 'Money date'. She spends 15 minutes reviewing the week and planning the next one. It's now a ritual."
      }
    ],
    cheatSheet: {
      title: "Expense Tracking Methods",
      items: [
        "App Auto-Sync (easiest): Mint, YNAB, Personal Capital connect to your bank and categorize automatically",
        "Manual Receipt Tracking: Save all receipts in envelope or photo, tally weekly in spreadsheet",
        "Cash Envelope System: Withdraw monthly budget in cash, divide into envelopes by category, physical spending limit",
        "Bank App Tagging: Most bank apps let you tag transactions (#food #transport) and show spending by tag",
        "Weekly Review Habit: Pick same day/time each week, spend 10-15 min reviewing where money went"
      ]
    },
    commonMistakes: [
      {
        mistake: "Tracking expenses but never reviewing them",
        consequence: "You collect data but gain no insights. It's like weighing yourself but never looking at the scale.",
        avoidanceStrategy: "Set a weekly 'money date' with yourself. Review categories, compare to budget, identify one thing to change this week."
      },
      {
        mistake: "Only tracking big purchases, ignoring small ones",
        consequence: "The $4 coffee 5x/week ($80/month) and $12 lunches add up to more than you realize. Small leaks sink ships.",
        avoidanceStrategy: "Track EVERYTHING for one month. Small purchases often reveal the biggest opportunities to save because they're habit-based."
      },
      {
        mistake: "Choosing a too-complex tracking system",
        consequence: "You need accounting-level precision to maintain it. You quit after 2 weeks because it's exhausting.",
        avoidanceStrategy: "Start simple: Just track totals by broad category (food, transport, fun, other). You can get more detailed later if needed."
      }
    ],
    nextSteps: {
      immediate: [
        "Choose ONE tracking method that fits your lifestyle (app, spreadsheet, notebook, cash envelopes)",
        "Set up the method TODAY - don't wait for next month or Monday",
        "Commit to tracking every single expense for just 7 days - no pressure to change behavior yet, just observe"
      ],
      shortTerm: [
        "After 7 days, categorize your spending into 5-7 buckets (housing, food, transport, entertainment, shopping, etc.)",
        "Calculate what percentage of income went to each category",
        "Identify your #1 surprising category (where spending didn't match expectations)"
      ],
      longTerm: [
        "Establish a weekly review ritual - same day, same time, 15 minutes",
        "After 3 months of tracking, analyze trends: Where do you overspend? What spending brought the most happiness? Where can you cut painlessly?",
        "Set up alerts for when you hit 75% of any budget category so you can adjust before it's blown"
      ]
    },
    expertInsights: [
      "The act of tracking alone reduces spending by 15-20% even if you don't consciously try to cut back. Awareness changes behavior.",
      "People who review their spending weekly versus monthly save 30% more on average. Frequency matters more than depth.",
      "Cash-based tracking works great for budget leaks (coffee, snacks, small purchases) but don't go 100% cash - you need credit card rewards and digital convenience."
    ],
    resources: [
      {
        name: "Mint",
        type: "app",
        description: "Free automatic tracking, links to banks, categorizes transactions",
        isFree: true
      },
      {
        name: "GoodBudget",
        type: "app",
        description: "Digital envelope budget system for cash-style tracking",
        isFree: true
      },
      {
        name: "Copilot Money",
        type: "app",
        description: "Beautiful iOS app with smart categorization (subscription)",
        isFree: false
      },
      {
        name: "Simple Spending Tracker spreadsheet",
        type: "tool",
        description: "Google Sheets template for manual tracking",
        isFree: true
      }
    ],
    modernExamples: [
      {
        scenario: "Student tracking part-time job income and irregular expenses",
        breakdown: "Biweekly paychecks ($500-700 depending on hours), tuition due twice per semester, textbooks unpredictable, social spending varies wildly.",
        actionSteps: [
          "Use Google Sheets with 3 tabs: Income Log, Fixed Expenses, Variable Expenses",
          "Log every paycheck immediately, note gross vs net",
          "Track variable spending daily in notes app, transfer to sheet weekly",
          "Calculate average monthly income over 6 months to get realistic baseline"
        ]
      },
      {
        scenario: "Gig worker with multiple income streams",
        breakdown: "Food delivery apps, freelance design work, part-time retail. Income arrives on different schedules. Expenses include gas, phone, software subscriptions.",
        actionSteps: [
          "Use Mint or similar app to aggregate all accounts in one place",
          "Tag all deposits by source (#doordash #upwork #retail)",
          "Tag all expenses by type (#carexpense #businessexpense #personal)",
          "Weekly review shows: income by source, expenses by category, net cash flow"
        ]
      }
    ]
  },
  4: {
    proTips: [
      "Make your goals visual - create a chart or use an app that shows progress bars. Seeing your progress is more motivating than just knowing the numbers.",
      "Break big goals into micro-milestones. Instead of 'save $5,000', celebrate every $500. Small wins keep momentum.",
      "Connect each goal to a specific 'why'. Not 'save $2,000' but 'save $2,000 so I can road trip to Cali with friends next summer.'",
      "Keep goals visible - phone wallpaper, post-it on bathroom mirror, calendar reminder. Out of sight = out of mind."
    ],
    realScenarios: [
      {
        name: "Jordan",
        age: 21,
        story: "Jordan set a goal to 'save more money'. Six months later, he had saved $73. He felt like a failure.",
        lesson: "'More' isn't measurable. Vague goals create vague results. He needed specific numbers and deadlines.",
        outcome: "Jordan reset: 'Save $3,000 for Europe trip by December' (10 months, $300/month). He broke it into monthly milestones and hit the target with $150 to spare."
      },
      {
        name: "Alex",
        age: 18,
        story: "Alex set a SMART goal: save $10,000 in one year while working part-time making $1,200/month. After 3 months of failing, she quit trying.",
        lesson: "The goal was specific and measurable but not achievable. Impossible goals are worse than no goals because they breed discouragement.",
        outcome: "Alex adjusted to $3,000 in one year ($250/month = 20% of income). She hit it in 11 months and felt proud instead of defeated."
      },
      {
        name: "Liam",
        age: 23,
        story: "Liam had 5 savings goals running simultaneously: emergency fund, vacation, new laptop, car down payment, retirement. He spread his savings so thin that none made real progress.",
        lesson: "Multiple goals compete for limited resources. Priority + sequence beats trying to do everything at once.",
        outcome: "Liam ranked his goals by urgency. He attacked emergency fund first (3 months), then vacation (2 months), then laptop (4 months). Serial goal completion felt way better."
      }
    ],
    cheatSheet: {
      title: "SMART Goal Formula",
      items: [
        "Specific: Not 'save money' but 'save $2,500 for used car down payment'",
        "Measurable: Track progress weekly or monthly (saved $500 so far, 20% complete)",
        "Achievable: Can realistically save the monthly amount needed given your income and expenses",
        "Relevant: Matters to YOUR life right now, not someone else's priorities",
        "Time-bound: Clear deadline creates urgency (by June 1st, in 90 days, before my 25th birthday)"
      ]
    },
    commonMistakes: [
      {
        mistake: "Setting only long-term goals with no short-term wins",
        consequence: "Retirement in 40 years feels impossibly far away. You lose motivation because progress is invisible.",
        avoidanceStrategy: "Use the 'sandwich method': 1 short-term goal (1-3 months), 1 medium-term (6-12 months), 1 long-term (2+ years). Balance instant gratification with future needs."
      },
      {
        mistake: "Not adjusting goals when life changes",
        consequence: "Your income dropped but you're still trying to save $800/month. You keep failing and feel guilty, so you give up entirely.",
        avoidanceStrategy: "Review goals quarterly. Life changes = goals change. Adjusting a goal isn't failure, it's flexibility. Recalculate based on current reality."
      },
      {
        mistake: "Treating all goals as equally important",
        consequence: "Emergency fund, vacation, new phone all get $50/month. If emergency hits, you have $150 instead of $450 (if you'd focused).",
        avoidanceStrategy: "Rank goals by importance: 1) Emergency fund, 2) Debt payoff, 3) Short-term needs, 4) Medium-term wants, 5) Long-term future. Attack in order."
      }
    ],
    nextSteps: {
      immediate: [
        "Write down 3 things you want to save money for in the next year",
        "For each, answer: How much do I need? By when do I need it? Why does this matter to me?",
        "Calculate the monthly savings required for each goal (total amount ÷ months until deadline)"
      ],
      shortTerm: [
        "Choose your ONE top priority goal based on importance and timeline",
        "Open a separate savings account for this goal (or use a savings app with goal buckets)",
        "Set up automatic transfer on payday for the calculated monthly amount"
      ],
      longTerm: [
        "Once first goal is hit, celebrate, then start goal #2 with the same system",
        "Build a 'goal achievement history' - track every goal you've completed for motivation",
        "Level up: After mastering one goal at a time, try running 2-3 simultaneously with clear priority ranking"
      ]
    },
    expertInsights: [
      "The #1 predictor of goal success isn't willpower - it's automation. If you have to remember to save, you'll forget. Automatic transfers remove decision fatigue.",
      "People who write down goals are 42% more likely to achieve them. People who review written goals weekly are 76% more likely. Visibility drives accountability.",
      "Short-term goals (under 6 months) should be 100% specific and measurable. Long-term goals (2+ years) can be more flexible because life will change them anyway."
    ],
    resources: [
      {
        name: "Qapital",
        type: "app",
        description: "Goal-based savings with visual progress bars and automation",
        isFree: false
      },
      {
        name: "Ally Bank Goals",
        type: "website",
        description: "Free savings buckets within one account, track multiple goals",
        isFree: true
      },
      {
        name: "Notion Goals Template",
        type: "tool",
        description: "Customizable goal tracker with progress bars",
        isFree: true
      },
      {
        name: "Atomic Habits",
        type: "book",
        description: "Build systems that make goal achievement automatic",
        isFree: false
      }
    ],
    modernExamples: [
      {
        scenario: "Building emergency fund while working entry-level job",
        breakdown: "Goal: $1,500 emergency fund (3 months of essential expenses). Income: $2,400/month after tax. Timeline: 6 months.",
        actionSteps: [
          "Required: $250/month (10% of income)",
          "Set up auto-transfer of $250 to separate savings account on payday",
          "Break into milestones: $500 (Month 2), $1,000 (Month 4), $1,500 (Month 6)",
          "Celebrate each milestone with small reward ($20 treat)"
        ]
      },
      {
        scenario: "Saving for study abroad program while in college",
        breakdown: "Goal: $4,000 for semester program. Current situation: Part-time job $800/month, 12 months until program. Reality: Can't save full $333/month.",
        actionSteps: [
          "Adjust goal: Can realistically save $150/month = $1,800 in 12 months",
          "Gap plan: Apply for $1,000 scholarship (research/apply by month 3)",
          "Earn extra: Pick up campus job for $800 total during winter/summer breaks",
          "Parents committed $400 = $1,800 saved + $1,000 scholarship + $800 extra work + $400 family = $4,000"
        ]
      }
    ]
  },
  5: {
    proTips: [
      "When major life changes happen (new job, breakup, moving), pause for 30 days before making big budget changes. Emotional decisions often = bad decisions.",
      "Build a 'buffer' category (5-10% of income) for true miscellaneous expenses. Life happens. Don't pretend it doesn't.",
      "Lifestyle inflation is sneaky: Just because you earn more doesn't mean your needs changed. Keep lifestyle increases to 30% of raises, save the other 70%.",
      "Review your budget monthly for 3 months, then quarterly once stable. Over-reviewing creates anxiety, under-reviewing creates drift."
    ],
    realScenarios: [
      {
        name: "Maya",
        age: 24,
        story: "Maya got a $10,000 raise. Within 6 months she'd upgraded her apartment (+$400/month), leased a new car (+$350/month), and was somehow more stressed about money than before.",
        lesson: "Lifestyle inflation consumed her entire raise plus some. She felt trapped by new expensive commitments.",
        outcome: "Maya couldn't easily undo the lease or apartment, but she recognized the pattern. On her next raise (2 years later), she kept her lifestyle exactly the same and invested the difference. Now she has options."
      },
      {
        name: "Jake",
        age: 20,
        story: "Jake's hours got cut from 30 to 20 per week. He panicked and didn't adjust his spending. He racked up $1,200 in credit card debt in 8 weeks.",
        lesson: "Freezing in uncertainty is more expensive than immediately responding to income changes.",
        outcome: "When Jake got a second hours cut 6 months later, he instantly paused subscriptions, switched to budget groceries, and picked up gig work within 48 hours. Adaptation is a skill."
      },
      {
        name: "Tasha",
        age: 22,
        story: "Tasha's budget worked perfectly... until her car needed $1,800 in repairs. She had no emergency fund and felt like her budget 'failed' her.",
        lesson: "A budget can't predict every surprise - but it should include preparation for surprises.",
        outcome: "Tasha rebuilt with 'save $100/month for irregular expenses' as a permanent line item. One year later when her laptop died, she had $1,200 ready. The budget didn't fail - her old one was just incomplete."
      }
    ],
    cheatSheet: {
      title: "Budget Adjustment Triggers",
      items: [
        "Income Change: Lost job, hours cut, raise, new job → Recalculate 50/30/20 percentages immediately",
        "Living Situation: Moving, roommate change, rent increase → Adjust housing percentage, may need to cut wants temporarily",
        "Life Stage: Graduated, got married, had baby → Entire budget restructure, new priorities, different goals",
        "Debt Payoff: Finished paying off loan → That payment becomes available for savings or other goals",
        "Emergency: Medical, car, job loss → Temporarily cut wants to zero, use emergency fund, pause savings if needed"
      ]
    },
    commonMistakes: [
      {
        mistake: "Treating your budget as unchangeable after you create it",
        consequence: "Life evolves but your budget doesn't. You try to force reality into outdated categories, get frustrated, quit budgeting.",
        avoidanceStrategy: "Budget is a living document. Every time life changes, your budget should change within 48 hours. It's not 'starting over', it's updating."
      },
      {
        mistake: "Increasing spending the moment income increases",
        consequence: "You never build wealth because your expenses always match your income. Golden handcuffs trap you in your job.",
        avoidanceStrategy: "When income increases, pretend it didn't for 3-6 months. Live on old budget, bank the difference. THEN decide intentionally if/how to upgrade lifestyle."
      },
      {
        mistake: "Not having an emergency fund before major life changes",
        consequence: "You move to new city or start new job with zero buffer. One unexpected expense derails everything.",
        avoidanceStrategy: "Before any big life transition, build a larger-than-normal emergency fund (6 months vs 3). Transitions always cost more than expected."
      }
    ],
    nextSteps: {
      immediate: [
        "Add a 'Miscellaneous/Buffer' category to your budget (5-10% of income) for unexpected small expenses",
        "Review last 6 months - did any major life change happen that you didn't adjust budget for? Fix it now.",
        "Set a recurring calendar event: 'Quarterly Budget Review' - 30 minutes to check if budget still reflects reality"
      ],
      shortTerm: [
        "Build or replenish emergency fund to 1 month expenses minimum (3 months ideal)",
        "Identify one upcoming life change in next 6 months (moving, graduation, relationship change) and draft new budget for that scenario",
        "Practice lifestyle inflation resistance: Next time you get a raise or bonus, save at least 50% of the increase"
      ],
      longTerm: [
        "Establish a 'life transition fund' separate from emergency fund - money specifically for big changes (moving costs, career pivots, etc.)",
        "Track your 'lifestyle inflation rate' - are expenses growing faster than income? Aim to keep lifestyle increases below 50% of income increases",
        "Build enough savings/investments that you're not dependent on every paycheck - financial flexibility is the ultimate buffer"
      ]
    },
    expertInsights: [
      "The best budget is flexible enough to handle reality but structured enough to keep you accountable. Too rigid = you quit. Too loose = no progress.",
      "When income drops, people often cut savings first to maintain lifestyle. Do the opposite: maintain savings rate, cut lifestyle. Future you depends on today's savings.",
      "Lifestyle inflation isn't inherently bad - the problem is unconscious lifestyle inflation. Conscious upgrades that bring real value are fine. Auto-upgrading everything is the trap."
    ],
    resources: [
      {
        name: "Budget Calculator for Life Changes",
        type: "website",
        description: "SmartAsset's tool for scenario planning major life transitions",
        isFree: true
      },
      {
        name: "PocketGuard",
        type: "app",
        description: "Shows what's safe to spend after bills and goals",
        isFree: true
      },
      {
        name: "Irregular Income Worksheet",
        type: "tool",
        description: "YNAB's free guide for variable income budgeting",
        isFree: true
      },
      {
        name: "The Financial Diet",
        type: "website",
        description: "Blog with real stories about navigating money during life changes",
        isFree: true
      }
    ],
    modernExamples: [
      {
        scenario: "Adjusting budget after graduation and moving to new city",
        breakdown: "Old: $1,500/month income, living with parents. New: $3,800/month job, rent $1,100, utilities $150, no car (public transit $100). New city is more expensive.",
        actionSteps: [
          "Month 1: Live ultra-lean, eat cheaply, explore free activities - learn true cost of living here",
          "Month 2: Calculate real baseline needs (likely 55-60% of income in expensive city)",
          "Month 3: Adjust to reality: 60% needs ($2,280), 20% wants ($760), 20% savings ($760)",
          "Month 6: Find roommate to cut rent to $800, shift back toward 50/30/20"
        ]
      },
      {
        scenario: "Managing irregular freelance income",
        breakdown: "Income varies from $2,000-$6,000/month. Hard to budget with unpredictable income. Some months flush, some months tight.",
        actionSteps: [
          "Calculate 6-month average income (say $3,800/month)",
          "Budget based on average, not highest month",
          "High-income months: Bank the extra in buffer account",
          "Low-income months: Supplement from buffer account to hit average",
          "Over time, build buffer to 2-3 months of expenses so you're never stressed"
        ]
      }
    ]
  }
};
