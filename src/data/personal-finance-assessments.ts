export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  philFeedback: string;
  explanation: string;
  funFact?: string;
}

export interface ModuleAssessment {
  moduleId: string;
  moduleName: string;
  moduleDescription: string;
  questions: AssessmentQuestion[];
}

// 1. BUDGET JOURNEY ASSESSMENT
export const budgetAssessment: ModuleAssessment = {
  moduleId: 'budget-journey',
  moduleName: 'Budgeting Basics',
  moduleDescription: 'Master the fundamentals of creating and maintaining a personal budget',
  questions: [
    {
      id: 'budget-q1',
      question: "You just got your first paycheck of $2,000. According to the 50/30/20 rule, how much should you save?",
      options: [
        "$200",
        "$400",
        "$600",
        "$1,000"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'budgeting_basics',
      philFeedback: "Start small but start smart! The 50/30/20 rule suggests 20% for savings—that's your future self thanking you! So $2,000 × 20% = $400.",
      explanation: "The 50/30/20 rule allocates 50% to needs, 30% to wants, and 20% to savings. For a $2,000 paycheck, that's $400 to savings!",
      funFact: "The 50/30/20 rule was popularized by Senator Elizabeth Warren in her book 'All Your Worth'!"
    },
    {
      id: 'budget-q2',
      question: "Which of these is a NEED, not a WANT?",
      options: [
        "Netflix subscription",
        "Daily Starbucks coffee",
        "Rent payment",
        "Designer sneakers"
      ],
      correctIndex: 2,
      difficulty: 'easy',
      topic: 'needs_vs_wants',
      philFeedback: "Needs keep you alive and functioning—like rent, food, and utilities. Wants make life more enjoyable but aren't essential. Coffee is great, but you won't die without Starbucks!",
      explanation: "Rent is essential shelter—a true need. The others are wants that enhance your lifestyle but aren't necessary for survival.",
      funFact: "The average American spends about $3,000 per year on 'wants' they later regret buying!"
    },
    {
      id: 'budget-q3',
      question: "You're tracking expenses and notice you spent $300 on coffee this month. What's the best action?",
      options: [
        "Quit coffee completely—cold turkey!",
        "Set a realistic $100 monthly coffee budget",
        "Ignore it—$300 isn't that much",
        "Only track expenses over $50"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'expense_tracking',
      philFeedback: "Don't go extreme! Cutting coffee completely might make you miserable and cause you to overspend elsewhere. Set a realistic budget—like $100—and stick to it. Small changes add up!",
      explanation: "Setting a reduced but realistic budget lets you enjoy coffee guilt-free while saving $200/month ($2,400/year!). Balance is key.",
      funFact: "Brewing coffee at home costs about $0.50 per cup vs. $5 at a coffee shop—that's 90% savings!"
    },
    {
      id: 'budget-q4',
      question: "What's a SMART financial goal?",
      options: [
        "I want to save money",
        "I'll save $5,000 in 10 months for a vacation",
        "I should probably budget better",
        "Someday I'll have an emergency fund"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'smart_goals',
      philFeedback: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. 'Save $5,000 in 10 months' checks all boxes! Vague goals like 'save money' rarely work.",
      explanation: "Option B specifies exactly how much ($5,000), by when (10 months), and why (vacation). The others are too vague to track or achieve.",
      funFact: "People who write down specific goals are 42% more likely to achieve them!"
    },
    {
      id: 'budget-q5',
      question: "Your income dropped by 30% unexpectedly. Which expense should you cut FIRST?",
      options: [
        "Rent or mortgage payment",
        "Grocery budget",
        "Streaming services and subscriptions",
        "Car insurance"
      ],
      correctIndex: 2,
      difficulty: 'hard',
      topic: 'budget_flexibility',
      philFeedback: "Prioritize needs over wants! Rent keeps you housed, groceries keep you fed, insurance protects your assets. Entertainment subscriptions can wait. Cut wants first!",
      explanation: "When income drops, cut discretionary spending (wants) before essentials (needs). Streaming services are pure wants—sacrifice them first.",
      funFact: "The average American pays for 3.4 streaming services but only actively uses 2.1 of them!"
    },
    {
      id: 'budget-q6',
      question: "How much should you aim for in a starter emergency fund?",
      options: [
        "$50",
        "$500-$1,000",
        "$10,000",
        "6 months of expenses"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'emergency_fund',
      philFeedback: "Start achievable! A starter emergency fund of $500-$1,000 covers most minor emergencies like car repairs or urgent doctor visits. Once you hit that, build toward 3-6 months of expenses.",
      explanation: "$500-$1,000 is an achievable starter goal that covers most unexpected small expenses. You can build to larger goals later.",
      funFact: "40% of Americans couldn't cover a $400 emergency expense without borrowing money or selling something!"
    },
    {
      id: 'budget-q7',
      question: "What's the best way to track your spending?",
      options: [
        "Don't track—just spend less",
        "Keep receipts in a shoebox",
        "Use a budgeting app or spreadsheet consistently",
        "Check your bank balance weekly"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      topic: 'tracking_methods',
      philFeedback: "Consistency is key! Apps and spreadsheets automatically categorize spending and show trends. Checking your balance doesn't show WHERE money went. Track every dollar!",
      explanation: "Budgeting apps or spreadsheets provide detailed insights into spending patterns and make it easy to stay accountable.",
      funFact: "People who track their spending daily save an average of 15% more than those who don't track at all!"
    },
    {
      id: 'budget-q8',
      question: "You got a $5,000 raise! What's the smartest move?",
      options: [
        "Upgrade your apartment immediately",
        "Increase savings/investments by $5,000/year",
        "Lease a newer car",
        "Shop more freely"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'lifestyle_inflation',
      philFeedback: "Avoid lifestyle inflation! When income rises, it's tempting to spend more. Instead, direct raises toward savings and investments. Your future self will thank you!",
      explanation: "Lifestyle inflation is the enemy of wealth-building. Keep living expenses the same and invest the difference for long-term security.",
      funFact: "70% of lottery winners go broke within 5 years due to lifestyle inflation!"
    },
    {
      id: 'budget-q9',
      question: "You're freelancing with irregular income. How should you budget?",
      options: [
        "Budget based on your best month",
        "Budget based on your average income over 3-6 months",
        "Don't budget—just spend when you have money",
        "Budget based on your worst month"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'irregular_income',
      philFeedback: "Irregular income requires averaging! Calculate your average monthly income over 3-6 months and budget based on that. This prevents overspending during good months and panic during slow ones.",
      explanation: "Using a 3-6 month average smooths out income fluctuations and creates a realistic, sustainable budget for irregular earners.",
      funFact: "36% of US workers have some form of irregular income from gig work or freelancing!"
    },
    {
      id: 'budget-q10',
      question: "Your friend says budgeting is too restrictive and ruins fun. Best response?",
      options: [
        "They're right—budgets are depressing",
        "Budgets give you permission to spend guilt-free within limits",
        "Only broke people need budgets",
        "Budgets are only for big purchases"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'budget_mindset',
      philFeedback: "Budgets aren't restrictive—they're empowering! A budget tells your money where to go instead of wondering where it went. You can spend on fun things guilt-free when they're budgeted!",
      explanation: "Budgets provide freedom by ensuring bills are covered while giving you permission to enjoy your 'wants' category spending without guilt.",
      funFact: "Studies show people with budgets report LESS financial stress, not more!"
    }
  ]
};

// 2. CREDIT JOURNEY ASSESSMENT
export const creditAssessment: ModuleAssessment = {
  moduleId: 'credit-journey',
  moduleName: 'Credit Mastery',
  moduleDescription: 'Understand credit scores, build credit responsibly, and avoid common mistakes',
  questions: [
    {
      id: 'credit-q1',
      question: "What's the #1 factor affecting your credit score?",
      options: [
        "Credit mix (types of credit)",
        "Payment history",
        "Age of credit",
        "New credit inquiries"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'credit_score_factors',
      philFeedback: "Payment history is king! It makes up 35% of your FICO score. Pay on time, every time—even one late payment can drop your score by 100+ points!",
      explanation: "Payment history accounts for 35% of your FICO score, making it the most important factor. Always pay at least the minimum on time.",
      funFact: "One 30-day late payment can stay on your credit report for up to 7 years!"
    },
    {
      id: 'credit-q2',
      question: "You have a $1,000 credit limit. To maintain good credit, keep your balance under...",
      options: [
        "$100 (10%)",
        "$300 (30%)",
        "$500 (50%)",
        "$1,000 (100%)"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'credit_utilization',
      philFeedback: "Keep it under 30%—ideally under 10%! High balances signal you're desperate for credit. Even if you pay in full monthly, a high balance on statement day hurts your score.",
      explanation: "Credit utilization (balance ÷ limit) should stay under 30%. This shows lenders you're not maxing out cards and are using credit responsibly.",
      funFact: "Credit utilization accounts for 30% of your FICO score—the second-biggest factor!"
    },
    {
      id: 'credit-q3',
      question: "What's the best way to build credit when you have none?",
      options: [
        "Apply for 10 credit cards at once",
        "Get a secured credit card and use it responsibly",
        "Take out a car loan you can't afford",
        "Become an authorized user on someone's maxed-out card"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'building_credit',
      philFeedback: "Start with a secured card! You deposit cash (like $200), get a card with that limit, and build history by paying on time. It's training wheels for credit—low risk, high reward!",
      explanation: "Secured credit cards require a deposit but report to credit bureaus just like regular cards, helping you build a positive credit history safely.",
      funFact: "Many secured cardholders graduate to regular credit cards within 6-12 months of responsible use!"
    },
    {
      id: 'credit-q4',
      question: "Your credit card bill is $500. You can only pay $250. What should you do?",
      options: [
        "Pay nothing—wait until you have $500",
        "Pay the $25 minimum to avoid late fees",
        "Pay $250—as much as you can",
        "Close the credit card account"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      topic: 'payment_strategy',
      philFeedback: "Pay as much as you can! Paying $250 reduces interest charges and shows lenders you're trying. Never skip payments entirely—that destroys your credit score!",
      explanation: "Paying more than the minimum reduces interest and lowers your balance faster. Always pay at least the minimum, but more is always better.",
      funFact: "Paying only the minimum on a $3,000 balance at 18% APR would take 14 years to pay off!"
    },
    {
      id: 'credit-q5',
      question: "Your friend asks you to cosign a $5,000 loan. What should you ask yourself FIRST?",
      options: [
        "How much do I trust them?",
        "Can I afford to pay $5,000 if they can't?",
        "What's the interest rate?",
        "When do they need it?"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'cosigning_risks',
      philFeedback: "Never cosign unless you can afford to pay it all! When you cosign, you're 100% legally responsible if they don't pay. It'll tank YOUR credit if they default. Say no unless you're prepared to pay.",
      explanation: "Cosigning makes you equally responsible for the debt. If they miss payments, it damages your credit and you're legally liable for the full amount.",
      funFact: "Studies show that 38% of cosigners end up having to make payments on the loan!"
    },
    {
      id: 'credit-q6',
      question: "What's a hard inquiry?",
      options: [
        "Checking your own credit score",
        "A lender checking your credit for a loan/card application",
        "A background check for a job",
        "Your landlord verifying your income"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'hard_inquiries',
      philFeedback: "Hard inquiries happen when you apply for credit (cards, loans, mortgages). Each one can drop your score 5-10 points and stays on your report for 2 years. Avoid applying for too many cards at once!",
      explanation: "Hard inquiries occur when lenders check your credit for applications. Multiple applications in a short time signal financial desperation to lenders.",
      funFact: "Checking your own credit score is a 'soft inquiry' and doesn't hurt your score at all!"
    },
    {
      id: 'credit-q7',
      question: "You accidentally missed a credit card payment by 5 days. What should you do?",
      options: [
        "Ignore it—5 days doesn't matter",
        "Pay immediately and call to request a goodwill adjustment",
        "Wait for the late fee to appear",
        "Close the card"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'late_payment_recovery',
      philFeedback: "Pay NOW and call immediately! If it's your first time and you pay quickly, many issuers will waive the late fee and not report it to credit bureaus. Apologize, pay, and ask nicely!",
      explanation: "Quick action can prevent credit damage. Many issuers offer one-time forgiveness for first-time late payers who act fast.",
      funFact: "Late payments aren't reported to credit bureaus until they're 30 days overdue!"
    },
    {
      id: 'credit-q8',
      question: "Which action will HURT your credit score the most?",
      options: [
        "Closing your oldest credit card",
        "Missing a payment by 60 days",
        "Applying for a new credit card",
        "Using 40% of your credit limit"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'credit_mistakes',
      philFeedback: "A 60-day late payment is a credit killer! It can drop your score by 100+ points and stays on your report for 7 years. Payment history is 35% of your score—protect it at all costs!",
      explanation: "Late payments, especially 60+ days, cause the most severe credit damage. They signal to lenders that you're a high-risk borrower.",
      funFact: "A single 60-day late payment can drop a 780 credit score down to 670!"
    },
    {
      id: 'credit-q9',
      question: "What's a good credit score?",
      options: [
        "500-600",
        "600-650",
        "670-739",
        "740+"
      ],
      correctIndex: 3,
      difficulty: 'easy',
      topic: 'credit_score_ranges',
      philFeedback: "740+ is excellent territory! You'll qualify for the best interest rates and terms. 670-739 is good. Below 670 is subprime and means higher interest rates.",
      explanation: "Credit scores range from 300-850. 740+ gets you the best rates, 670-739 is good, and below 670 starts limiting your options.",
      funFact: "The average American credit score is 714—considered 'good' but not excellent!"
    },
    {
      id: 'credit-q10',
      question: "Should you carry a small balance on your credit card to build credit?",
      options: [
        "Yes—always carry a small balance",
        "No—pay in full every month to avoid interest",
        "Yes—but only if the interest is low",
        "It doesn't matter"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'credit_myths',
      philFeedback: "MYTH BUSTED! You never need to pay interest to build credit. Pay in full every month—your score improves from on-time payments, not from carrying balances. Don't waste money on interest!",
      explanation: "This is one of the biggest credit myths. Paying in full every month builds excellent credit while avoiding interest charges entirely.",
      funFact: "Carrying a balance costs the average American $1,155 per year in interest—totally unnecessary!"
    }
  ]
};

// 3. BIG PURCHASES JOURNEY ASSESSMENT
export const bigPurchasesAssessment: ModuleAssessment = {
  moduleId: 'big-purchases-journey',
  moduleName: 'Smart Big Purchases',
  moduleDescription: 'Make informed decisions on major purchases like cars and avoid costly mistakes',
  questions: [
    {
      id: 'bigpurchase-q1',
      question: "Which car cost is recurring (you pay it regularly)?",
      options: [
        "Down payment",
        "Monthly insurance premium",
        "Sales tax",
        "Registration fee"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'car_ownership_costs',
      philFeedback: "Insurance is monthly! Down payment, sales tax, and registration are one-time. Don't forget recurring costs: insurance, gas, maintenance, parking. They add up fast!",
      explanation: "Recurring costs are ongoing expenses like insurance, gas, and maintenance. One-time costs like down payments and registration happen once.",
      funFact: "The average annual cost of owning a car in the US is $10,728—that's $894/month!"
    },
    {
      id: 'bigpurchase-q2',
      question: "You're buying a $20,000 car. A 10% down payment is...",
      options: [
        "$1,000",
        "$2,000",
        "$5,000",
        "$10,000"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'down_payments',
      philFeedback: "10% of $20,000 = $2,000! A bigger down payment means a smaller loan, less interest paid, and lower monthly payments. Aim for 20% down if possible!",
      explanation: "Down payment percentages are calculated by multiplying the price by the percentage. 10% × $20,000 = $2,000.",
      funFact: "Putting down 20% on a car can save you thousands in interest over the life of the loan!"
    },
    {
      id: 'bigpurchase-q3',
      question: "Dealer A: $300/month for 60 months. Dealer B: $250/month for 72 months. Which costs LESS total?",
      options: [
        "Dealer A ($18,000 total)",
        "Dealer B ($18,000 total)",
        "They cost the same",
        "Need to know the interest rate"
      ],
      correctIndex: 2,
      difficulty: 'hard',
      topic: 'total_cost_comparison',
      philFeedback: "It's a tie! Dealer A: $300 × 60 = $18,000. Dealer B: $250 × 72 = $18,000. Dealerships trick you with low monthly payments over longer terms. Always calculate TOTAL cost!",
      explanation: "Lower monthly payments don't always mean lower total cost. Always multiply monthly payment by number of months to see the full picture.",
      funFact: "The average car loan term has increased from 62 months in 2009 to 72 months today!"
    },
    {
      id: 'bigpurchase-q4',
      question: "What's the difference between APR and interest rate?",
      options: [
        "They're the same thing",
        "APR includes fees; interest rate doesn't",
        "Interest rate includes fees; APR doesn't",
        "APR is only for credit cards"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'apr_vs_interest',
      philFeedback: "APR (Annual Percentage Rate) includes the interest rate PLUS fees like origination fees. It's the true cost of borrowing. Always compare APRs, not just interest rates!",
      explanation: "APR gives you the full picture of borrowing costs by including all fees, making it easier to compare loan offers accurately.",
      funFact: "A loan with a 5% interest rate might have a 6.5% APR once fees are included!"
    },
    {
      id: 'bigpurchase-q5',
      question: "When buying a car, what should you negotiate FIRST?",
      options: [
        "Monthly payment",
        "Trade-in value",
        "Interest rate",
        "Out-the-door price"
      ],
      correctIndex: 3,
      difficulty: 'hard',
      topic: 'negotiation_strategy',
      philFeedback: "Always negotiate the out-the-door price FIRST! Dealers confuse you by mixing monthly payments, trade-ins, and financing. Lock in the total price before discussing anything else!",
      explanation: "Negotiating the total price first prevents dealers from manipulating monthly payments or trade-in values to hide a bad deal.",
      funFact: "Dealerships make an average profit of $2,337 per new car sold—negotiate wisely!"
    },
    {
      id: 'bigpurchase-q6',
      question: "Should you get pre-approved for a car loan?",
      options: [
        "No—dealerships always offer better rates",
        "Yes—it gives you negotiating power",
        "Only if your credit is bad",
        "It doesn't matter"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'pre_approval',
      philFeedback: "YES! Pre-approval from a bank/credit union shows the dealer you have other options. They might beat your rate to earn your business. Plus, you know your budget before shopping!",
      explanation: "Pre-approval gives you leverage and prevents dealers from inflating interest rates to earn bigger commissions.",
      funFact: "Dealers can mark up interest rates by 1-3% and pocket the difference as profit!"
    },
    {
      id: 'bigpurchase-q7',
      question: "What's the 20/4/10 rule for car buying?",
      options: [
        "20% down, 4-year loan, 10% of income for all car costs",
        "20-year loan, 4% interest, 10% down",
        "20 mpg minimum, 4 doors, under $10k",
        "Shop at 20 dealers, get 4 quotes, negotiate 10%"
      ],
      correctIndex: 0,
      difficulty: 'medium',
      topic: 'car_buying_rules',
      philFeedback: "The 20/4/10 rule is gold! Put 20% down, finance for no more than 4 years, and keep total car expenses (payment, insurance, gas) under 10% of gross income. Stick to this and you'll avoid being car-poor!",
      explanation: "This rule prevents overbuying by ensuring you can comfortably afford both the car payment and ongoing ownership costs.",
      funFact: "Following the 20/4/10 rule could save the average buyer $7,000+ over the life of a car loan!"
    },
    {
      id: 'bigpurchase-q8',
      question: "Leasing vs. buying a car—which is typically cheaper long-term?",
      options: [
        "Leasing is always cheaper",
        "Buying is usually cheaper over 5+ years",
        "They cost the same",
        "Leasing if you drive under 10,000 miles/year"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'lease_vs_buy',
      philFeedback: "Buying wins long-term! Leasing means perpetual payments with nothing to show for it. When you buy and keep a car 5+ years, those last years are payment-free. Build equity—don't rent!",
      explanation: "Leasing means you're always making payments. Buying means eventual ownership and years of payment-free driving.",
      funFact: "The average car lasts 12 years—buying and keeping it saves $40,000+ vs. leasing!"
    },
    {
      id: 'bigpurchase-q9',
      question: "What's a balloon payment?",
      options: [
        "A large final payment at the end of a loan",
        "Your first down payment",
        "Inflated monthly payments",
        "Emergency payment if you miss one"
      ],
      correctIndex: 0,
      difficulty: 'hard',
      topic: 'balloon_payments',
      philFeedback: "Balloon payments are traps! You make small monthly payments, then BAM—a huge final payment (often thousands). If you can't pay it, they repossess your car. Avoid balloon payment loans!",
      explanation: "Balloon payment loans have low monthly payments but require a massive lump sum at the end, putting you at risk of repossession.",
      funFact: "Balloon payments can be 25-50% of the original loan amount—a nasty surprise!"
    },
    {
      id: 'bigpurchase-q10',
      question: "A dealer offers you a $1,000 rebate OR 0% financing. Your credit is excellent. Which is usually better?",
      options: [
        "Always take the rebate",
        "Always take 0% financing",
        "Calculate both scenarios to compare",
        "Flip a coin"
      ],
      correctIndex: 2,
      difficulty: 'hard',
      topic: 'incentive_comparison',
      philFeedback: "Do the math! Sometimes 0% financing saves more than a rebate, sometimes the opposite. Calculate total costs for both options. With excellent credit, you might get a low rate elsewhere and take the rebate!",
      explanation: "The better choice depends on the loan amount, term, and your alternative interest rate. Always compare total costs, not assumptions.",
      funFact: "On a $30,000 car, 0% financing over 5 years saves $3,000+ vs. a 4% rate!"
    }
  ]
};

// 4. EARNING MONEY JOURNEY ASSESSMENT
export const earningMoneyAssessment: ModuleAssessment = {
  moduleId: 'earning-money-journey',
  moduleName: 'Maximize Your Earnings',
  moduleDescription: 'Learn strategies to increase income through jobs, negotiations, and side hustles',
  questions: [
    {
      id: 'earning-q1',
      question: "What should a good entry-level resume be?",
      options: [
        "5 pages long with every detail",
        "One page, highlighting relevant skills",
        "Include every job since age 14",
        "Use fancy fonts and colors to stand out"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'resume_basics',
      philFeedback: "Keep it to ONE page for entry-level! Recruiters spend 6 seconds scanning resumes. Highlight your best skills, achievements, and relevant experience. Simple formatting beats fancy every time!",
      explanation: "One-page resumes force you to prioritize your best qualifications and are easier for recruiters to scan quickly.",
      funFact: "Recruiters spend an average of just 6 seconds on the initial resume scan!"
    },
    {
      id: 'earning-q2',
      question: "You're offered $50,000. Research shows the average for your role is $55,000. What should you do?",
      options: [
        "Accept immediately—$50k is good!",
        "Negotiate for $55,000 or higher",
        "Decline the offer entirely",
        "Ask for $80,000"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'salary_negotiation',
      philFeedback: "Always negotiate! Companies EXPECT it and respect candidates who know their worth. Use market data to back your ask: 'Based on my research, similar roles pay $55-60k. Could we discuss $57k?'",
      explanation: "Negotiating with data shows professionalism and self-awareness. Most employers have negotiation room built in and won't rescind offers.",
      funFact: "People who negotiate their first salary earn $500,000+ more over their career!"
    },
    {
      id: 'earning-q3',
      question: "What's the best time to ask for a raise?",
      options: [
        "Right after being hired",
        "During your annual review with documented wins",
        "When you're having a bad month",
        "Never—just wait for it"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'raise_strategy',
      philFeedback: "Annual reviews are prime time! Come prepared with specific achievements, metrics, and market data. Show how you've added value: 'I increased sales 15% and saved the team 10 hours/week.'",
      explanation: "Annual reviews are when budgets are set and raises are expected. Document your wins throughout the year to make a compelling case.",
      funFact: "Employees who track their achievements are 40% more likely to receive raises!"
    },
    {
      id: 'earning-q4',
      question: "You earn $2,000 from freelancing. As a 1099 contractor, you owe approximately how much in taxes?",
      options: [
        "$0 (freelancing is tax-free)",
        "$150 (just income tax)",
        "$300 (self-employment + income tax)",
        "$600 (double taxation)"
      ],
      correctIndex: 2,
      difficulty: 'hard',
      topic: '1099_taxes',
      philFeedback: "1099 workers pay BOTH sides of payroll taxes (about 15% for self-employment) PLUS income tax. Budget 25-30% of 1099 income for taxes. So $2,000 = roughly $300-600 in taxes!",
      explanation: "Self-employed individuals pay both employer and employee portions of Social Security and Medicare taxes (15.3%) plus regular income tax.",
      funFact: "Setting aside 30% of 1099 income covers most people's tax obligations—pay estimated quarterly!"
    },
    {
      id: 'earning-q5',
      question: "What's passive income?",
      options: [
        "Getting paid to do nothing",
        "Income earned with minimal ongoing effort after initial setup",
        "Money from a 9-5 job",
        "Illegal income"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'passive_income_basics',
      philFeedback: "Passive income requires upfront work—writing a book, building a course, creating content—then earns money repeatedly with little maintenance. It's not 'free money' but it's scalable!",
      explanation: "Passive income streams require initial effort to build but generate ongoing revenue with minimal active involvement.",
      funFact: "The top 1% of passive income earners make over $200,000/year from rental properties, dividends, and online businesses!"
    },
    {
      id: 'earning-q6',
      question: "Which is typically the fastest side hustle to start earning?",
      options: [
        "Writing a bestselling novel",
        "Gig work (DoorDash, Uber, TaskRabbit)",
        "Building a massive YouTube channel",
        "Launching a tech startup"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'side_hustle_speed',
      philFeedback: "Gig work = instant income! Sign up today, start earning this week. Other options take months or years. Need quick cash? Gig apps are your friend. Need scalability? Build something long-term alongside it.",
      explanation: "Gig economy platforms let you start earning immediately with minimal barriers to entry, perfect for quick supplemental income.",
      funFact: "The average Uber driver makes $15-25/hour, and you can start within days!"
    },
    {
      id: 'earning-q7',
      question: "What's the difference between W-2 and 1099 employment?",
      options: [
        "No difference—both are employees",
        "W-2 = employee (taxes withheld), 1099 = contractor (you pay taxes)",
        "W-2 is for full-time, 1099 is for part-time",
        "1099 gets better benefits"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'w2_vs_1099',
      philFeedback: "W-2 employees have taxes automatically withheld and get benefits. 1099 contractors are self-employed—you handle your own taxes, insurance, and retirement. More freedom, more responsibility!",
      explanation: "W-2 employees have taxes withheld and get benefits; 1099 contractors are independent and responsible for their own taxes and benefits.",
      funFact: "1099 contractors can deduct business expenses like home office, supplies, and mileage!"
    },
    {
      id: 'earning-q8',
      question: "You're in an interview. They ask about your salary expectations. Best response?",
      options: [
        "'I'll take whatever you're offering!'",
        "'I need $100,000 or I walk.'",
        "'Based on my research, similar roles pay $55-65k. I'm targeting the higher end given my skills.'",
        "'What's your budget?'"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      topic: 'salary_expectations',
      philFeedback: "Show you've done homework! Give a researched range and anchor toward the higher end. This shows confidence without arrogance. Never lowball yourself or seem desperate!",
      explanation: "Providing a research-backed range shows professionalism while anchoring expectations high positions you for a better offer.",
      funFact: "Candidates who provide salary ranges get offers 8% higher on average than those who don't!"
    },
    {
      id: 'earning-q9',
      question: "Which skill is most valuable for increasing earning potential?",
      options: [
        "Learning to code",
        "Developing strong communication skills",
        "Getting more certifications",
        "Working longer hours"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'valuable_skills',
      philFeedback: "Communication wins! Tech skills are valuable, but communicating ideas, negotiating, and building relationships unlock opportunities across ALL careers. Soft skills = salary superpowers!",
      explanation: "Communication skills are universally valuable—they enhance leadership, negotiation, networking, and problem-solving across all industries.",
      funFact: "93% of employers say communication skills are more important than a candidate's major!"
    },
    {
      id: 'earning-q10',
      question: "Your employer offers a 3% 401(k) match. You earn $50,000. How much should you contribute to get the full match?",
      options: [
        "$500",
        "$1,500",
        "$3,000",
        "$5,000"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'employer_benefits',
      philFeedback: "3% of $50,000 = $1,500! Employer matches are FREE MONEY—a 100% instant return! Always contribute enough to get the full match before investing elsewhere. It's part of your compensation!",
      explanation: "Employer matches are instant returns on your money. Calculate your match percentage × salary to ensure you're not leaving free money on the table.",
      funFact: "One in three employees doesn't contribute enough to get their full 401(k) match—that's free money left behind!"
    }
  ]
};

// 5. FINANCIAL SAFETY JOURNEY ASSESSMENT
export const financialSafetyAssessment: ModuleAssessment = {
  moduleId: 'financial-safety-journey',
  moduleName: 'Financial Safety & Protection',
  moduleDescription: 'Protect yourself from scams, fraud, and financial risks',
  questions: [
    {
      id: 'safety-q1',
      question: "Which message is MOST LIKELY a scam?",
      options: [
        "'Your bank statement is ready for viewing.'",
        "'URGENT! You've won $10,000! Claim NOW!'",
        "'Your pizza order is ready for pickup.'",
        "'Meeting reminder: 3pm today.'"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'scam_detection',
      philFeedback: "Scammers use URGENCY and FREE MONEY to make you act before thinking. Real prizes don't require 'urgent' claims. When it sounds too good to be true, it is. Slow down and verify!",
      explanation: "Legitimate organizations don't use urgent language or promise free money via random messages. These are classic phishing tactics.",
      funFact: "Americans lost over $10 billion to scams in 2023—staying vigilant saves money!"
    },
    {
      id: 'safety-q2',
      question: "What's the best place to do online banking?",
      options: [
        "Coffee shop public Wi-Fi",
        "Library computer",
        "Your cellular data or secure home Wi-Fi",
        "Any Wi-Fi is fine"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      topic: 'digital_safety',
      philFeedback: "Public Wi-Fi is risky! Hackers can intercept data on unsecured networks. Use cellular data or your password-protected home Wi-Fi for banking. Your financial security is worth the extra caution!",
      explanation: "Public Wi-Fi lacks encryption, making it easy for hackers to steal login credentials and financial data. Always use secure, private connections.",
      funFact: "88% of public Wi-Fi hotspots have security vulnerabilities!"
    },
    {
      id: 'safety-q3',
      question: "Your debit card shows a $500 fraudulent charge. What's your FIRST move?",
      options: [
        "Wait to see if more charges appear",
        "Call your bank immediately",
        "Drive to the store where the charge occurred",
        "Post about it on social media"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'fraud_response',
      philFeedback: "Call your bank NOW! Time matters—the faster you report fraud, the better your chances of getting money back. Banks have 24/7 fraud departments. They'll freeze your card and investigate immediately!",
      explanation: "Quick reporting is crucial for fraud protection. Banks can reverse charges and prevent further unauthorized transactions when notified immediately.",
      funFact: "Reporting fraud within 2 days limits your debit card liability to $50; after that, it can be $500+!"
    },
    {
      id: 'safety-q4',
      question: "What makes a strong password?",
      options: [
        "Your birthday: 01/15/1990",
        "password123",
        "A random mix: K8#mP2@qL9!vX5",
        "Your dog's name"
      ],
      correctIndex: 2,
      difficulty: 'easy',
      topic: 'password_security',
      philFeedback: "Strong passwords are random, long (12+ characters), and include letters, numbers, and symbols. Use a password manager to generate and store unique passwords for every account!",
      explanation: "Strong passwords are unpredictable combinations that can't be guessed or cracked easily. Personal information makes weak passwords.",
      funFact: "The most common password is still '123456'—which gets hacked in under 1 second!"
    },
    {
      id: 'safety-q5',
      question: "What's two-factor authentication (2FA)?",
      options: [
        "Using two passwords",
        "Logging in twice",
        "Requiring password + second verification (like a code texted to your phone)",
        "Sharing your account with two people"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      topic: 'two_factor_auth',
      philFeedback: "2FA adds a second layer of security! Even if someone steals your password, they can't access your account without the second factor (like a code from your phone). Enable it EVERYWHERE!",
      explanation: "2FA requires two separate verification methods, making it exponentially harder for hackers to access your accounts even if they have your password.",
      funFact: "Enabling 2FA blocks 99.9% of automated hacking attempts!"
    },
    {
      id: 'safety-q6',
      question: "How much should you have in an emergency fund?",
      options: [
        "1 week of expenses",
        "1 month of expenses",
        "3-6 months of expenses",
        "1 year of expenses"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      topic: 'emergency_fund_size',
      philFeedback: "Aim for 3-6 months of living expenses! This covers job loss, medical emergencies, or major repairs without going into debt. Start with $1,000, then build to 1 month, then keep going!",
      explanation: "3-6 months of expenses provides a solid safety net for most financial emergencies without being so large it's impossible to achieve.",
      funFact: "Only 39% of Americans could cover a $1,000 emergency with savings!"
    },
    {
      id: 'safety-q7',
      question: "What type of insurance should young adults prioritize FIRST?",
      options: [
        "Life insurance",
        "Health insurance",
        "Boat insurance",
        "Pet insurance"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'insurance_priorities',
      philFeedback: "Health insurance first! A medical emergency can bankrupt you without coverage. One ER visit can cost $10,000+. Protect your health and finances—it's non-negotiable!",
      explanation: "Health insurance protects against catastrophic medical costs that can destroy financial stability. It's essential before other optional coverage.",
      funFact: "Medical bills are the #1 cause of bankruptcy in the United States!"
    },
    {
      id: 'safety-q8',
      question: "A caller says they're from the IRS and you owe $5,000 immediately or you'll be arrested. What should you do?",
      options: [
        "Pay immediately to avoid jail",
        "Hang up—it's a scam",
        "Give them your Social Security number to verify",
        "Meet them in person"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'government_scams',
      philFeedback: "SCAM ALERT! The real IRS never demands immediate payment by phone, threatens arrest, or asks for gift cards. They mail letters first. Hang up and report it to the IRS!",
      explanation: "Government agencies follow formal procedures and never threaten immediate arrest over the phone. These are always scams.",
      funFact: "IRS impersonation scams have stolen over $72 million from victims!"
    },
    {
      id: 'safety-q9',
      question: "What's an insurance deductible?",
      options: [
        "The monthly payment you make",
        "What you pay out-of-pocket before insurance covers costs",
        "The maximum insurance will pay",
        "A tax deduction"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'insurance_terms',
      philFeedback: "The deductible is YOUR cost before insurance kicks in. If you have a $1,000 deductible and a $3,000 claim, you pay $1,000 and insurance pays $2,000. Higher deductible = lower premiums!",
      explanation: "Deductibles are the amount you pay before insurance coverage begins. It's a cost-sharing mechanism that affects your premium.",
      funFact: "Increasing your deductible from $500 to $1,000 can lower your premium by 25%!"
    },
    {
      id: 'safety-q10',
      question: "You receive an email saying your Amazon account is suspended. How do you verify it's legitimate?",
      options: [
        "Click the link in the email",
        "Reply to the email asking if it's real",
        "Go directly to Amazon.com yourself (not via email link) and check your account",
        "Give them your password to fix it"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      topic: 'phishing_prevention',
      philFeedback: "Never click email links for account issues! Open a new browser, type Amazon.com yourself, and check your account. If there's no issue there, the email was phishing. Verify independently always!",
      explanation: "Legitimate companies' websites will show any account problems when you log in directly. Don't trust links in unsolicited emails.",
      funFact: "97% of people can't identify sophisticated phishing emails—always verify independently!"
    }
  ]
};

// 6. FUTURE PLANNING JOURNEY ASSESSMENT
export const futurePlanningAssessment: ModuleAssessment = {
  moduleId: 'future-planning-journey',
  moduleName: 'Future Planning & Investing',
  moduleDescription: 'Learn retirement basics, investing fundamentals, and long-term wealth building',
  questions: [
    {
      id: 'future-q1',
      question: "What's a starter emergency fund goal for beginners?",
      options: [
        "$50",
        "$500-$1,000",
        "$10,000",
        "$50,000"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'emergency_fund_basics',
      philFeedback: "Start achievable! $500-$1,000 covers most minor emergencies like car repairs or urgent doctor visits. Hit this milestone, celebrate, then build toward 3-6 months of expenses!",
      explanation: "$500-$1,000 is an achievable first milestone that provides real protection against common financial setbacks.",
      funFact: "40% of Americans couldn't cover a $400 emergency—be in the prepared 60%!"
    },
    {
      id: 'future-q2',
      question: "What's a 401(k)?",
      options: [
        "A marathon distance",
        "An employer-sponsored retirement savings plan",
        "A type of mortgage",
        "A credit score range"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'retirement_basics',
      philFeedback: "A 401(k) is your retirement savings account through work! Contribute pre-tax money, and it grows tax-free until retirement. Many employers match contributions—that's FREE MONEY!",
      explanation: "401(k) plans let you save for retirement through payroll deductions with tax advantages and often employer matching contributions.",
      funFact: "The name '401(k)' comes from Section 401(k) of the Internal Revenue Code!"
    },
    {
      id: 'future-q3',
      question: "Your employer matches 401(k) contributions up to 4%. You earn $50,000. How much should you contribute for full free money?",
      options: [
        "$500",
        "$2,000",
        "$4,000",
        "$5,000"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'employer_match',
      philFeedback: "4% of $50,000 = $2,000! Contribute $2,000/year and your employer adds another $2,000 instantly—that's a 100% return! Always get the full match before investing elsewhere!",
      explanation: "Employer matches are the best investment return you'll ever get—100% instant returns. Calculate your match percentage and contribute enough to max it out.",
      funFact: "One-third of employees don't contribute enough to get their full employer match!"
    },
    {
      id: 'future-q4',
      question: "You invest $100/month starting at age 25. At age 65 with 8% annual returns, you'll have approximately...",
      options: [
        "$50,000",
        "$150,000",
        "$350,000",
        "$500,000"
      ],
      correctIndex: 2,
      difficulty: 'hard',
      topic: 'compound_interest',
      philFeedback: "The magic of compound interest! $100/month for 40 years at 8% = approximately $350,000! Start early, stay consistent, and let compound interest work its magic. Time is your greatest asset!",
      explanation: "Compound interest means earning returns on your returns. Small, consistent contributions over decades grow exponentially—this is how wealth is built.",
      funFact: "Starting at 25 vs. 35 can make a $250,000+ difference by retirement—start NOW!"
    },
    {
      id: 'future-q5',
      question: "What's the difference between a Roth and Traditional IRA?",
      options: [
        "No difference—they're the same",
        "Roth = pay taxes now, withdraw tax-free later; Traditional = deduct taxes now, pay later",
        "Roth is for rich people only",
        "Traditional IRAs have lower fees"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'roth_vs_traditional',
      philFeedback: "Roth IRA: Pay taxes now, tax-free in retirement. Traditional IRA: Tax deduction now, pay taxes later. Young people often benefit from Roth—you're likely in a lower tax bracket now!",
      explanation: "The key difference is when you pay taxes. Roth is ideal if you expect higher income in retirement; Traditional if you need the tax deduction now.",
      funFact: "A Roth IRA lets all your investment gains grow 100% tax-free forever!"
    },
    {
      id: 'future-q6',
      question: "What's the difference between a stock and a bond?",
      options: [
        "They're the same investment",
        "Stock = ownership in a company; Bond = loan to a company/government",
        "Stocks are safer than bonds",
        "Bonds are only for retirement"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'stocks_vs_bonds',
      philFeedback: "Stocks = you own a piece of the company (higher risk, higher potential return). Bonds = you're lending money (lower risk, lower return). Young investors can handle more stocks!",
      explanation: "Stocks represent ownership and can grow significantly but are volatile. Bonds are loans that pay steady interest but grow slower.",
      funFact: "Historically, stocks have returned 10% annually while bonds return 5-6%!"
    },
    {
      id: 'future-q7',
      question: "What does 'diversification' mean in investing?",
      options: [
        "Putting all your money in one stock",
        "Spreading investments across different assets to reduce risk",
        "Only investing in tech companies",
        "Day trading"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'diversification',
      philFeedback: "Don't put all your eggs in one basket! Diversification spreads risk across stocks, bonds, sectors, and countries. If one investment tanks, others cushion the blow. Index funds = instant diversification!",
      explanation: "Diversification reduces risk by ensuring no single investment can destroy your portfolio. It's the foundation of smart investing.",
      funFact: "A diversified portfolio can reduce risk by up to 50% without sacrificing returns!"
    },
    {
      id: 'future-q8',
      question: "At what age can you withdraw from a 401(k) or IRA without penalties?",
      options: [
        "45",
        "50",
        "55",
        "59½"
      ],
      correctIndex: 3,
      difficulty: 'medium',
      topic: 'retirement_age',
      philFeedback: "59½ is the magic number! Withdraw before that and you'll pay a 10% penalty plus taxes. Retirement accounts are for retirement—resist the temptation to raid them early!",
      explanation: "Retirement accounts have age restrictions to encourage long-term saving. Early withdrawals face steep penalties to discourage using retirement money prematurely.",
      funFact: "The ½ year exists because the law was written to align with Social Security rules from the 1930s!"
    },
    {
      id: 'future-q9',
      question: "What's term life insurance?",
      options: [
        "Insurance that lasts your entire life",
        "Coverage for a specific period (like 20 years)",
        "Insurance for your car",
        "A savings account"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'life_insurance',
      philFeedback: "Term life insurance covers you for a set period (10, 20, or 30 years)—like car insurance for your life. It's affordable and perfect for protecting your family during working years!",
      explanation: "Term insurance provides affordable protection during high-need years (like when you have kids and a mortgage) without expensive permanent coverage.",
      funFact: "Term life insurance is 5-15 times cheaper than whole life insurance for the same coverage!"
    },
    {
      id: 'future-q10',
      question: "When should you start investing for retirement?",
      options: [
        "After you buy a house",
        "When you're 40",
        "As soon as you have income—even in your 20s",
        "After paying off all debt"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      topic: 'investing_timeline',
      philFeedback: "Start NOW! Time is your biggest advantage. Even small amounts in your 20s grow into massive sums by retirement. Get the employer match, then tackle debt. Every year you wait costs thousands!",
      explanation: "Starting early gives your money decades to compound. Even small contributions in your 20s outperform large contributions started later.",
      funFact: "Someone who invests $5,000/year from 25-35 (just 10 years) ends up with MORE at 65 than someone who invests $5,000/year from 35-65 (30 years)!"
    }
  ]
};

// 7. TAXES JOURNEY ASSESSMENT
export const taxesAssessment: ModuleAssessment = {
  moduleId: 'taxes-journey',
  moduleName: 'Tax Basics',
  moduleDescription: 'Understand income taxes, deductions, and filing fundamentals',
  questions: [
    {
      id: 'taxes-q1',
      question: "Which type of tax applies when you buy sneakers at a store?",
      options: [
        "Income tax",
        "Sales tax",
        "Property tax",
        "Payroll tax"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'tax_types',
      philFeedback: "Sales tax is added to most purchases (varies by state—0-10%+). It's separate from income tax (what you pay on earnings) and property tax (what homeowners pay). Know your local sales tax rate!",
      explanation: "Sales tax is a consumption tax added to retail purchases. It varies by state and sometimes by city, ranging from 0% to over 10%.",
      funFact: "Five US states have no sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon!"
    },
    {
      id: 'taxes-q2',
      question: "What's the difference between gross income and net income?",
      options: [
        "They're the same",
        "Gross = before taxes; Net = after taxes (take-home)",
        "Net = before taxes; Gross = after taxes",
        "Gross is from your side job"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      topic: 'income_types',
      philFeedback: "Gross income is your total earnings before anything is taken out. Net income (take-home) is what's left after taxes, insurance, and other deductions. Budget based on NET income!",
      explanation: "Gross income is your total earnings; net income is what you actually receive after all deductions. Always budget using your net income.",
      funFact: "The average American's net income is about 25-30% less than their gross due to taxes and deductions!"
    },
    {
      id: 'taxes-q3',
      question: "You earn $50,000. The standard deduction is $13,850. Your taxable income is...",
      options: [
        "$50,000",
        "$36,150",
        "$13,850",
        "$0"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'standard_deduction',
      philFeedback: "Subtract the standard deduction from your income—that's what gets taxed! $50,000 - $13,850 = $36,150 taxable. The standard deduction reduces your tax bill automatically!",
      explanation: "The standard deduction is a set amount you can subtract from your income before calculating taxes, reducing your tax burden.",
      funFact: "Over 90% of taxpayers take the standard deduction instead of itemizing!"
    },
    {
      id: 'taxes-q4',
      question: "What's the difference between W-2 and 1099 forms?",
      options: [
        "No difference",
        "W-2 = employee (taxes withheld); 1099 = contractor (you pay all taxes)",
        "W-2 is for part-time; 1099 is full-time",
        "1099 means you don't pay taxes"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'w2_vs_1099',
      philFeedback: "W-2 workers have taxes automatically withheld from paychecks. 1099 contractors get paid in full but owe ALL taxes themselves (15% self-employment + income tax). Budget accordingly!",
      explanation: "W-2 employees have taxes withheld automatically; 1099 contractors must pay all taxes themselves, including both employer and employee portions.",
      funFact: "1099 contractors pay about 15% more in taxes because they cover both halves of Social Security/Medicare!"
    },
    {
      id: 'taxes-q5',
      question: "Tax brackets work by...",
      options: [
        "Taxing ALL your income at your highest bracket rate",
        "Taxing different portions of income at different rates (progressive)",
        "Everyone pays the same percentage",
        "Rich people pay nothing"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'tax_brackets',
      philFeedback: "Tax brackets are PROGRESSIVE! Only income within each bracket gets taxed at that rate. Example: If you earn $50k, you're NOT taxed 22% on everything—only the portion above $44,725 gets taxed at 22%!",
      explanation: "Progressive tax brackets mean you pay different rates on different portions of income, not one flat rate on everything. This makes the system fairer.",
      funFact: "The highest US tax bracket has varied from 7% (1913) to 94% (1944) throughout history!"
    },
    {
      id: 'taxes-q6',
      question: "What's better: a $100 tax deduction or a $100 tax credit?",
      options: [
        "Tax deduction",
        "Tax credit",
        "They're the same",
        "Depends on your income"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'credits_vs_deductions',
      philFeedback: "Credits are WAY better! A $100 tax credit = $100 OFF your tax bill. A $100 deduction reduces taxable income by $100 (saves ~$20-30 in taxes). Credits are direct savings!",
      explanation: "Tax credits directly reduce the amount of tax you owe dollar-for-dollar. Deductions only reduce your taxable income, saving you a percentage.",
      funFact: "The Child Tax Credit is worth up to $2,000 per child—that's a $2,000 reduction in your tax bill!"
    },
    {
      id: 'taxes-q7',
      question: "If you get a tax refund, it means...",
      options: [
        "You won free money!",
        "You overpaid taxes during the year—the government is returning YOUR money",
        "You don't owe any taxes",
        "You're rich"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'refunds_explained',
      philFeedback: "A refund isn't a bonus—it's YOUR money that you overpaid! It means you gave the government an interest-free loan all year. Ideally, adjust your W-4 to keep more in paychecks!",
      explanation: "Tax refunds are returned overpayments, not free money. Adjusting withholding lets you keep that money throughout the year instead.",
      funFact: "The average tax refund is $3,000—that's $250/month you could have had in your paycheck!"
    },
    {
      id: 'taxes-q8',
      question: "What happens if you don't file your taxes?",
      options: [
        "Nothing—filing is optional",
        "Penalties, interest, and potential legal trouble",
        "You get a refund automatically",
        "You only owe taxes if caught"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      topic: 'filing_requirements',
      philFeedback: "Always file! Not filing leads to penalties (5% per month), interest charges, and possible criminal charges. Even if you can't pay, FILE and work out a payment plan with the IRS!",
      explanation: "Failing to file taxes results in harsh penalties and interest that compound over time, plus potential legal consequences. Always file, even if you can't pay immediately.",
      funFact: "The failure-to-file penalty is 10x worse than the failure-to-pay penalty!"
    },
    {
      id: 'taxes-q9',
      question: "What's a Roth IRA's tax benefit?",
      options: [
        "Tax deduction when you contribute",
        "Tax-free growth and withdrawals in retirement",
        "No taxes ever",
        "Lower income taxes now"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'roth_tax_benefits',
      philFeedback: "Roth IRA magic: Pay taxes NOW on contributions, then all growth and withdrawals in retirement are 100% TAX-FREE! You'll likely earn WAY more than you contribute, so this is huge!",
      explanation: "Roth IRAs are funded with after-tax dollars, but all investment gains and retirement withdrawals are completely tax-free—huge long-term savings.",
      funFact: "Over 30 years, a Roth IRA could save you $100,000+ in taxes vs. a taxable account!"
    },
    {
      id: 'taxes-q10',
      question: "What are capital gains taxes?",
      options: [
        "Taxes on your salary",
        "Taxes on profits from selling investments",
        "Taxes on savings accounts",
        "Taxes on gifts"
      ],
      correctIndex: 1,
      difficulty: 'hard',
      topic: 'capital_gains',
      philFeedback: "Capital gains taxes apply when you sell investments (stocks, property) for a profit. Hold investments 1+ year for lower long-term rates (0-20%) vs. short-term rates (your income tax rate)!",
      explanation: "Capital gains tax is owed on the profit from selling investments. Long-term gains (held 1+ year) are taxed at lower rates than short-term gains.",
      funFact: "Long-term capital gains tax rates (0-20%) are much lower than ordinary income tax rates (10-37%)!"
    }
  ]
};

// Export all assessments
export const personalFinanceAssessments: ModuleAssessment[] = [
  budgetAssessment,
  creditAssessment,
  bigPurchasesAssessment,
  earningMoneyAssessment,
  financialSafetyAssessment,
  futurePlanningAssessment,
  taxesAssessment
];

// Helper function to get assessment by module ID
export const getAssessmentByModuleId = (moduleId: string): ModuleAssessment | undefined => {
  return personalFinanceAssessments.find(assessment => assessment.moduleId === moduleId);
};

// Helper function to calculate weak areas from answers
export const calculateWeakAreas = (
  questions: AssessmentQuestion[],
  userAnswers: number[]
): string[] => {
  const incorrectTopics: string[] = [];
  
  questions.forEach((question, index) => {
    if (userAnswers[index] !== question.correctIndex) {
      incorrectTopics.push(question.topic);
    }
  });
  
  // Return unique topics
  return [...new Set(incorrectTopics)];
};

// Helper function to calculate strong areas from answers
export const calculateStrongAreas = (
  questions: AssessmentQuestion[],
  userAnswers: number[]
): string[] => {
  const correctTopics: string[] = [];
  
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctIndex) {
      correctTopics.push(question.topic);
    }
  });
  
  // Return unique topics
  return [...new Set(correctTopics)];
};
