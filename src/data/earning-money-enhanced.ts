export interface EarningMoneyEnhancedContent {
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
  modernExamples: string[];
}

export const earningMoneyEnhancedContent: Record<number, EarningMoneyEnhancedContent> = {
  1: {
    proTips: [
      "Start small and build reputation - your first clients will likely come from people who already know you. Focus on doing excellent work rather than earning big money initially.",
      "Track ALL income sources in a simple spreadsheet. Even $20 here and there adds up, and you'll thank yourself at tax time.",
      "Don't undersell yourself! Research what others charge for similar services. If you're babysitting, find out the going rate in your area ($15-20/hour is typical).",
      "Turn your hobbies into income - are you good at graphic design, video editing, or writing? Platforms like Fiverr and Upwork let you monetize these skills immediately."
    ],
    realScenarios: [
      {
        name: "Marcus",
        age: 16,
        story: "I started mowing lawns for $25/yard and thought I was killing it. After buying gas, maintaining equipment, and accounting for my time, I was making like $8/hour - less than minimum wage!",
        lesson: "Marcus learned to calculate his TRUE hourly rate by tracking all expenses. He raised his prices to $40/yard and started offering premium services like edging and fertilizing.",
        outcome: "Within 6 months, Marcus had 15 regular clients, was earning $18/hour after expenses, and saved $2,400 for his first car."
      },
      {
        name: "Jasmine",
        age: 17,
        story: "I started tutoring classmates in math for $20/hour. Word spread fast, and within two months I had more requests than I could handle!",
        lesson: "Jasmine realized that service-based income scales with reputation. She raised her rate to $30/hour and created group tutoring sessions at $15/person to maximize her time.",
        outcome: "Now 18, Jasmine has tutored over 50 students, earned $4,000, and built a college application showcase of entrepreneurship."
      },
      {
        name: "Tyler",
        age: 18,
        story: "I got my first part-time job at a coffee shop making $13/hour. My friends made fun of me for 'just' working retail, but I learned so much about customer service, time management, and got employee discounts on everything.",
        lesson: "Tyler discovered that traditional employment offers stability, learning opportunities, and benefits beyond just the hourly wage. His manager became a strong reference for future jobs.",
        outcome: "After a year, Tyler got promoted to shift lead at $16/hour, and the management experience helped him land a summer internship at a tech company."
      }
    ],
    cheatSheet: {
      title: "Income Streams at a Glance",
      items: [
        "Service-Based: Tutoring ($20-30/hr), Babysitting ($15-20/hr), Pet Care ($15-25/hr), Lawn Care ($25-40/job)",
        "Product-Based: Handmade crafts on Etsy, Reselling (sneakers, vintage clothes), Digital products (templates, designs)",
        "Traditional Employment: Retail ($12-15/hr), Food Service ($12-15/hr + tips), Grocery Stores ($13-16/hr)",
        "Gig Economy: Food Delivery (DoorDash, Uber Eats - $12-20/hr), Task Apps (TaskRabbit - $20-40/hr)",
        "Creative Work: Graphic Design (Fiverr - $50-200/project), Content Creation (YouTube, TikTok - varies wildly)",
        "Remember: Your time is valuable! Always calculate your real hourly rate (earnings ÷ total time including prep)"
      ]
    },
    commonMistakes: [
      {
        mistake: "Working for exposure or 'practice' for free when you have real skills",
        consequence: "You devalue your work and set low price expectations. Free work rarely leads to paid opportunities.",
        avoidanceStrategy: "Offer a discounted 'introductory rate' for your first 3-5 clients, but always charge something. This establishes that your work has value."
      },
      {
        mistake: "Not tracking time spent on 'side' activities like shopping for supplies or commuting",
        consequence: "You think you're making $20/hour but actually earning $12/hour after accounting for hidden time costs.",
        avoidanceStrategy: "Use a simple time-tracking app (Toggl is free) to log ALL time related to your income activity, including prep and cleanup."
      },
      {
        mistake: "Saying yes to every opportunity without considering if it's profitable",
        consequence: "You burn out doing low-paying work and have no time for better opportunities or schoolwork.",
        avoidanceStrategy: "Create a 'minimum acceptable rate' for yourself. If an opportunity pays less, politely decline or negotiate higher."
      },
      {
        mistake: "Keeping all your earnings in cash or not tracking income",
        consequence: "Money disappears on random purchases, no record for taxes, can't prove income for future needs (car loan, apartment).",
        avoidanceStrategy: "Open a checking account and deposit ALL earnings. This creates a paper trail and makes saving automatic."
      }
    ],
    nextSteps: {
      immediate: [
        "List 3 skills you have that others might pay for (tutoring, pet sitting, tech help, creative work)",
        "Research going rates in your area for 2 services you could offer",
        "Ask a parent or trusted adult about one earning opportunity they had as a teen",
        "Set up a simple income tracker (even just a notes app works!)"
      ],
      shortTerm: [
        "Start ONE income activity this month - babysit once, mow one lawn, tutor one session",
        "Open a bank account if you don't have one (many banks have teen accounts with no fees)",
        "Create a simple 'rate sheet' for services you could offer regularly",
        "Tell 5 people (family, neighbors, friends) what service you're now offering"
      ],
      longTerm: [
        "Build a client base of 3-5 regular customers over the next 3 months",
        "Save your first $500 from earned income (not gifts/allowance)",
        "Ask for a reference or testimonial from satisfied customers",
        "Research part-time job opportunities for when you're ready for consistent employment"
      ]
    },
    expertInsights: [
      "The most successful teen entrepreneurs I've worked with all had one thing in common: they started before they felt 'ready.' Don't wait for perfect conditions - start small and learn as you go. - Sarah Chen, Youth Financial Coach",
      "Your reputation is your most valuable asset as a young earner. Show up on time, do quality work, and communicate professionally. These habits will serve you for life. - Marcus Rodriguez, Small Business Advisor",
      "The income you earn as a teen isn't just about money - it's about building confidence, learning responsibility, and discovering what kind of work energizes you versus drains you. - Dr. Emily Thompson, Adolescent Development Psychologist"
    ],
    resources: [
      {
        name: "Fiverr",
        type: "website",
        description: "Marketplace for freelance services - great for creative skills like design, writing, video editing",
        isFree: true
      },
      {
        name: "Rover",
        type: "app",
        description: "Connect with pet owners who need dog walking, pet sitting, and pet care services",
        isFree: true
      },
      {
        name: "TaskRabbit",
        type: "app",
        description: "Get hired for local tasks like furniture assembly, moving help, and errands",
        isFree: true
      },
      {
        name: "Side Hustle: From Idea to Income in 27 Days",
        type: "book",
        description: "Chris Guillebeau's practical guide to starting small income projects quickly",
        isFree: false
      }
    ],
    modernExamples: [
      "Instagram theme page owner (15 years old) earning $200/month through sponsored posts about gaming",
      "High school student making $400/month reselling limited sneakers on StockX",
      "Teen TikTok creator with 100K followers earning through Creator Fund + brand deals ($300-800/month)",
      "16-year-old earning $25/hour doing basic website updates for local small businesses using Wix"
    ]
  },
  2: {
    proTips: [
      "Your first paycheck will look shockingly small - expect 20-25% to disappear to taxes. This is normal! Everyone experiences 'paycheck shock.'",
      "FICA (7.65%) comes out of EVERY paycheck and goes to Social Security and Medicare. You're paying into the system you'll benefit from later.",
      "Save your pay stubs! You'll need them for tax filing, loan applications, and to verify your employer is withholding correctly.",
      "If your gross pay is $300 but your net pay is only $220, you didn't get 'scammed' - that $80 went to taxes that fund roads, schools, and services you use daily."
    ],
    realScenarios: [
      {
        name: "Jordan",
        age: 18,
        story: "I was SO excited about my first $15/hour job. I worked 20 hours my first week and expected $300. When I got $232, I thought my boss shorted me! I almost confronted him before my dad explained taxes.",
        lesson: "Jordan learned that gross pay (before taxes) and net pay (take-home) are VERY different. Now he budgets based on net pay, not gross.",
        outcome: "Jordan started a simple spreadsheet tracking gross pay, deductions, and net pay. After 6 months, he understood his tax situation and even got a small refund by filing correctly."
      },
      {
        name: "Aisha",
        age: 17,
        story: "My first W-2 form arrived in January and I had NO idea what it was. I almost threw it away thinking it was junk mail! Luckily my mom caught me and explained I needed it for taxes.",
        lesson: "Aisha learned that employers send W-2 forms by January 31st, and you MUST keep them safe. They summarize your entire year's earnings and taxes paid.",
        outcome: "Aisha set up a simple file folder for 'important money stuff' and now keeps all W-2s, pay stubs, and tax documents organized. She filed her taxes easily using her W-2."
      },
      {
        name: "Chris",
        age: 19,
        story: "I got my first big paycheck after working overtime during the holidays - $850 gross. But my net was only $628. I was furious until my uncle showed me exactly where that $222 went: federal tax $85, FICA $65, state tax $52, local tax $20.",
        lesson: "Chris discovered that multiple taxes come out of paychecks. Breaking down each deduction helped him understand he wasn't being 'robbed' - this is how society funds itself.",
        outcome: "Now Chris automatically calculates his take-home as 75% of gross pay when budgeting. He saves 20% of every net paycheck and still has money for fun."
      }
    ],
    cheatSheet: {
      title: "Paycheck Anatomy 101",
      items: [
        "Gross Pay = Total earnings BEFORE any deductions (hours × hourly rate, or salary amount)",
        "Federal Income Tax = Usually 10-12% for teens, based on tax withholding form (W-4) you filled out",
        "FICA = 7.65% ALWAYS (6.2% Social Security + 1.45% Medicare) - no exceptions, everyone pays this",
        "State Income Tax = 0-10% depending on your state (lucky states: TX, FL, WA, NV have ZERO state tax!)",
        "Local/City Tax = Some cities charge extra 1-3% (like NYC, Philadelphia)",
        "Net Pay = Take-home pay after ALL deductions - this is what hits your bank account",
        "Quick Math: Take-home is usually 75-80% of gross pay for most teen earners"
      ]
    },
    commonMistakes: [
      {
        mistake: "Budgeting based on gross pay instead of net pay",
        consequence: "You plan to spend $300 (your gross pay) but only receive $232 (net pay), leaving you $68 short every paycheck.",
        avoidanceStrategy: "ALWAYS budget using your net pay (take-home amount). Ignore gross pay when planning spending - that's not money you'll actually receive."
      },
      {
        mistake: "Not verifying that hours worked match hours paid",
        consequence: "Payroll errors happen! You might work 20 hours but get paid for only 18, costing you $30+ per mistake.",
        avoidanceStrategy: "Keep your own time log (phone notes app works). Compare it to your pay stub every single paycheck. Report discrepancies to HR immediately."
      },
      {
        mistake: "Throwing away pay stubs or not checking them",
        consequence: "You won't notice errors, can't prove income for loans/rentals, and will struggle during tax season.",
        avoidanceStrategy: "Take a photo of EVERY pay stub and save to a 'Work Documents' folder on your phone. Review each stub when received."
      },
      {
        mistake: "Claiming too many allowances on W-4 to get a 'bigger paycheck'",
        consequence: "You'll owe a huge tax bill in April instead of getting a refund. Many teens have been shocked with $500+ tax bills they can't pay.",
        avoidanceStrategy: "Claim 0 or 1 allowance on your W-4 as a teen. Yes, your paycheck is slightly smaller, but you'll get a refund instead of owing money."
      },
      {
        mistake: "Not setting up direct deposit and waiting for paper checks",
        consequence: "Delayed access to your money, risk of lost checks, and no automatic record-keeping.",
        avoidanceStrategy: "Set up direct deposit on Day 1 of your job. Your money arrives faster, it's safer, and you have automatic proof of all deposits."
      }
    ],
    nextSteps: {
      immediate: [
        "If you have a job, pull out your most recent pay stub and identify: gross pay, FICA, federal tax, state tax, and net pay",
        "Calculate your true take-home percentage: (net pay ÷ gross pay) × 100",
        "Set up a phone folder called 'Work Docs' and start photographing every pay stub",
        "Ask your employer how to access pay stubs online (most have employee portals)"
      ],
      shortTerm: [
        "Review your last 3 pay stubs for any errors - do hours match what you worked?",
        "Set up direct deposit if you haven't already (ask your employer for the form)",
        "Start a simple pay tracking spreadsheet: Date | Gross Pay | Taxes | Net Pay | Running Total",
        "Save at least one full paycheck in your savings account as an emergency buffer"
      ],
      longTerm: [
        "Keep all pay stubs for at least 3 years (you may need them for tax audits, loan applications, or dispute resolution)",
        "When you receive your W-2 in January, compare it to your pay stub totals to ensure accuracy",
        "Learn to file your own taxes using free software (TurboTax Free Edition, Cash App Taxes)",
        "Build a habit of saving 20% of every net paycheck automatically"
      ]
    },
    expertInsights: [
      "The biggest mistake I see teens make is spending their gross pay mentally before they even receive their net pay. Always budget based on what actually hits your account. - Jennifer Wu, CPA",
      "Your pay stub is a financial literacy document. Learning to read it at 16 puts you ahead of most adults. Take time to understand every line. - Robert Jackson, Payroll Specialist",
      "Don't be mad about taxes - be informed. Those deductions are funding roads you drive on, schools you attend, and safety nets you might need someday. - Dr. Patricia Martinez, Economics Professor"
    ],
    resources: [
      {
        name: "PaycheckCity Calculator",
        type: "website",
        description: "Free calculator that shows exactly how much you'll take home after taxes based on your income and location",
        isFree: true
      },
      {
        name: "IRS Tax Withholding Estimator",
        type: "website",
        description: "Official IRS tool to check if you're withholding the right amount from paychecks",
        isFree: true
      },
      {
        name: "QuickBooks Workforce",
        type: "app",
        description: "Many employers use this - lets you access pay stubs and W-2s digitally anytime",
        isFree: true
      },
      {
        name: "Money 101: Everything You Need to Know About Personal Finance",
        type: "book",
        description: "Alfred Mill's beginner guide includes detailed paycheck breakdown examples",
        isFree: false
      }
    ],
    modernExamples: [
      "18-year-old retail worker earning $15/hr, working 25 hrs/week: Gross = $375, Net = ~$290 (22% to taxes)",
      "16-year-old restaurant server: $12/hr + $80 tips/week = Gross $260, Net ~$198 + all tips (tips not taxed at source but ARE taxable income)",
      "Part-time grocery worker in Texas (no state tax): $14/hr, 20 hrs = Gross $280, Net ~$235 (16% to federal/FICA only)",
      "California teen barista: $16/hr, 20 hrs = Gross $320, Net ~$243 (24% to taxes including state)"
    ]
  },
  3: {
    proTips: [
      "Overtime is your friend! If you're hourly and can pick up extra hours beyond 40/week, you get paid 1.5x your normal rate. That $15/hour becomes $22.50/hour.",
      "Salaried jobs offer stability and predictability, but you lose overtime pay. Don't accept a salary position without calculating if it actually pays better than hourly.",
      "Most teen jobs are hourly for good reason - you want flexibility for school, and overtime protection. Salary jobs are better once you're in a career.",
      "Benefits can be worth $3-5/hour! A job paying $15/hour with health insurance is often better than a $17/hour job with no benefits."
    ],
    realScenarios: [
      {
        name: "Devon",
        age: 19,
        story: "I got offered a 'promotion' to shift supervisor - salary of $28,000/year. Sounds great, right? But I was already making $14/hour working 35 hours/week with overtime. I calculated: the salary was actually a PAY CUT once I lost overtime!",
        lesson: "Devon learned to convert salary to hourly rate before accepting offers. $28,000 ÷ 52 weeks ÷ 40 hours = $13.46/hour - less than his $14 hourly rate, and no overtime!",
        outcome: "Devon negotiated for $32,000 salary instead, stayed in the role for 6 months gaining management experience, then got a better-paying position at another company."
      },
      {
        name: "Samantha",
        age: 20,
        story: "During the holidays, my retail job offered unlimited overtime. I worked 55 hours one week (40 regular + 15 overtime). My normal week at $13/hour would be $520, but with overtime I made $812.50! That extra $292 paid for ALL my holiday gifts.",
        lesson: "Samantha discovered that strategic overtime during peak seasons can significantly boost income without committing to more hours year-round.",
        outcome: "Now Samantha plans her big purchases around busy seasons when overtime is available. She's saved $3,000 in one year by maximizing overtime opportunities."
      },
      {
        name: "Alex",
        age: 21,
        story: "I compared two job offers: Job A paid $16/hour with no benefits. Job B paid $14/hour but included health insurance (worth $200/month) and 401k match. I almost took Job A because '$16 is more than $14.'",
        lesson: "Alex learned to calculate total compensation, not just base pay. Job B's benefits added $2.50/hour in value ($200÷80 hours), making real pay $16.50/hour.",
        outcome: "Alex took Job B, avoided paying $200/month for insurance, and his employer matched $50/month into his 401k. After one year, he was $3,000 ahead of where he'd be at Job A."
      }
    ],
    cheatSheet: {
      title: "Hourly vs Salary Quick Guide",
      items: [
        "Hourly: Paid for exact hours worked | Overtime eligible (1.5x after 40 hrs/week) | Flexible scheduling | Less predictable income",
        "Salary: Fixed annual amount ÷ by pay periods | No overtime pay | Expected to work 'as needed' | Predictable income",
        "Calculate Hourly from Salary: (Annual salary ÷ 52 weeks ÷ 40 hours) = hourly equivalent",
        "Calculate Annual from Hourly: (Hourly rate × 40 hours × 52 weeks) = annual equivalent",
        "Overtime Math: (Regular rate × 1.5) × overtime hours | Example: $12/hr × 1.5 = $18/hr for overtime",
        "Benefits Value: Health insurance (~$2-3/hr), 401k match (~$0.50-1/hr), Paid time off (~$1-2/hr)",
        "Best for teens: Hourly jobs with overtime potential + part-time benefits = maximum flexibility + earning power"
      ]
    },
    commonMistakes: [
      {
        mistake: "Accepting a salary position without calculating the real hourly rate",
        consequence: "You commit to working 50+ hours/week but only get paid for 40, effectively cutting your hourly rate by 20% or more.",
        avoidanceStrategy: "Always convert salary offers to hourly rates: Annual salary ÷ 2,080 hours. Compare this to your current or expected hourly pay including realistic overtime."
      },
      {
        mistake: "Turning down overtime opportunities because you're 'tired' without considering the financial impact",
        consequence: "You miss out on 50% pay boost during overtime hours. Saying no to 5 overtime hours at $15/hr costs you $112.50.",
        avoidanceStrategy: "Create an 'overtime fund' goal (car payment, college, trip). When you're tempted to skip overtime, remember your goal. Even 5 hours every other week adds $2,900/year."
      },
      {
        mistake: "Only comparing base pay rates between jobs, ignoring benefits",
        consequence: "You take a 'higher paying' job that actually costs you money when you factor in benefits. A $2/hour difference can be wiped out by health insurance costs.",
        avoidanceStrategy: "Create a total compensation comparison: Base pay + employer 401k match + health insurance value + paid time off value + other perks = TRUE pay rate."
      },
      {
        mistake: "Not understanding 'exempt' vs 'non-exempt' status as a salaried employee",
        consequence: "You accept a salaried 'manager' role thinking you're moving up, but you're now expected to work 55 hours/week with no extra pay.",
        avoidanceStrategy: "Before accepting any salaried position, ask: 'Is this exempt or non-exempt?' Non-exempt salaried employees still get overtime. Most teen/young adult positions should be non-exempt."
      },
      {
        mistake: "Not tracking actual hours worked as a salaried employee",
        consequence: "You have no idea if you're actually being paid fairly. You might be working 50 hours/week and effectively making less than minimum wage per hour.",
        avoidanceStrategy: "Even on salary, track your actual hours worked for 2 months. Calculate your real hourly rate. If it drops below your previous hourly rate or minimum wage, it's time to renegotiate or leave."
      }
    ],
    nextSteps: {
      immediate: [
        "If you're hourly, calculate your overtime rate (your rate × 1.5) so you know what you earn for extra hours",
        "Ask your employer about overtime policy - is it available? When? Are there busy seasons with guaranteed overtime?",
        "Look at your pay stub and confirm you're being paid correctly for any overtime you've worked",
        "If considering a salaried position, ask for the exact expectations: typical hours/week, busy season hours, on-call requirements"
      ],
      shortTerm: [
        "Create a comparison spreadsheet for any job opportunities: hourly rate, overtime potential, benefits value, commute time/cost",
        "Calculate your current annual earnings if you worked every available hour (including realistic overtime): This is your earning ceiling",
        "If you're hourly, try to pick up ONE overtime shift this month if available - experience the pay boost firsthand",
        "Research typical benefits for entry-level positions in your industry - know what to ask for in future negotiations"
      ],
      longTerm: [
        "Set a goal for annual earnings and back-calculate how many hours (including overtime) you need to reach it",
        "Track all income from your job for 6 months, including overtime. Identify patterns - when is overtime available? Can you plan for it?",
        "Before accepting any future salaried position, get clear written expectations about hours. If possible, negotiate a minimum hourly rate guarantee.",
        "Learn about labor laws in your state regarding overtime, breaks, and minimum wage - know your rights as a worker"
      ]
    },
    expertInsights: [
      "Young workers often don't realize that their time becomes MORE valuable as they gain skills and experience. Don't be afraid to ask for raises every 12-18 months based on your improved performance. - Linda Chen, HR Director",
      "Overtime is essentially a 50% raise on those hours. If you're saving for something big, strategic overtime is your fastest legal path to that goal. - Michael Torres, Financial Planner",
      "The shift from hourly to salary is a significant career milestone, but it shouldn't happen too early. I generally advise people to stay hourly until they're in a role where their value isn't directly tied to hours worked. - Dr. Rachel Kim, Career Development Coach"
    ],
    resources: [
      {
        name: "DOL Overtime Calculator",
        type: "website",
        description: "Official Department of Labor tool to calculate overtime pay and verify you're paid correctly",
        isFree: true
      },
      {
        name: "Salary.com",
        type: "website",
        description: "Compare salary ranges for different positions in your area - know your market value",
        isFree: true
      },
      {
        name: "Indeed Salary Calculator",
        type: "website",
        description: "Convert between hourly and salary rates, factor in benefits, compare offers",
        isFree: true
      },
      {
        name: "The Total Money Makeover",
        type: "book",
        description: "Dave Ramsey's guide includes sections on maximizing earning potential in your current job",
        isFree: false
      }
    ],
    modernExamples: [
      "Amazon warehouse worker: $18/hr, peak season offers 60-hour weeks = $1,620/week ($1,080 regular + $540 overtime)",
      "Starbucks barista: $15/hr part-time BUT gets health insurance (worth $200/mo) + stock options + free college tuition (ASU online)",
      "Retail assistant manager: $35K salary sounds good, but expected to work 50 hrs/week = $13.46/hr actual rate (worse than $15/hr hourly!)",
      "UPS driver helper (seasonal): $21/hr with guaranteed overtime during holidays = $1,470/week for 60-hour weeks"
    ]
  },
  4: {
    proTips: [
      "The 1099 tax surprise: As a freelancer/gig worker, YOU pay both sides of FICA (15.3% instead of 7.65%). Set aside 25-30% of ALL gig income for taxes!",
      "Track EVERY business expense - phone bill (partial), mileage, supplies, software subscriptions. These reduce your taxable income and can save you hundreds in taxes.",
      "Your true gig work profit = (Total income - All expenses - Taxes). Many gig workers quit after calculating this and realizing they're making $8/hour.",
      "Start with low barrier-to-entry gigs (DoorDash, Rover, Fiverr) to learn the ropes, then transition to higher-paying specialized services as you build skills and reputation."
    ],
    realScenarios: [
      {
        name: "Carlos",
        age: 18,
        story: "I started DoorDashing and was pumped to see $800 in earnings my first month. Then my dad asked about gas, car maintenance, and taxes. After tracking everything, my profit was $320. I was making $8/hour after expenses!",
        lesson: "Carlos learned that gig work has hidden costs: gas, car wear, insurance increases, and higher taxes (15.3% self-employment tax). Now he tracks every expense meticulously.",
        outcome: "Carlos optimized his routes, only accepted orders over $7, and worked during peak hours with surge pricing. His effective rate jumped to $18/hour after expenses, and he saved $2,100 in 6 months."
      },
      {
        name: "Zoe",
        age: 19,
        story: "I started a pet-sitting business on Rover charging $25/visit. At tax time, I got a 1099 showing $3,400 earned. I owed $900 in taxes that I didn't have saved! I literally cried filing my taxes.",
        lesson: "Zoe learned the hard way that 1099 income doesn't have taxes automatically withheld. She should have set aside $850 throughout the year (25% of her earnings).",
        outcome: "Zoe created a separate 'tax savings' account and now transfers 30% of EVERY gig payment immediately. She'll never face a tax surprise again, and she increased her rates to $35/visit to cover the tax burden."
      },
      {
        name: "Malik",
        age: 20,
        story: "I started doing graphic design on Fiverr for $50/logo. After 20 logos, I had made $1,000! But each logo took me 4-6 hours. I was making $8.33-$12.50/hour and hadn't factored in Adobe subscription costs or taxes.",
        lesson: "Malik realized he was undervaluing his specialized skills. He raised his prices to $150/logo, limited revisions, and now makes $25-37.50/hour for the same work.",
        outcome: "At higher prices, Malik gets fewer orders but makes more money in less time. He earned $4,200 in 6 months working only 168 hours versus $3,000 for 360 hours at his old rate. He saved 192 hours of his life!"
      }
    ],
    cheatSheet: {
      title: "Gig Economy Survival Guide",
      items: [
        "1099 vs W-2: 1099 = You're self-employed (no taxes withheld, you pay 15.3% self-employment tax) | W-2 = You're an employee (taxes auto-withheld)",
        "Tax Rule: Set aside 25-30% of ALL gig income immediately for taxes - don't touch this money!",
        "Deductible Expenses: Mileage ($0.67/mile in 2024), phone bill (business %), supplies, subscriptions, equipment, home office space",
        "Quarterly Taxes: If you'll owe $1,000+ in taxes, you must pay quarterly (April, June, Sept, Jan) or face penalties",
        "True Hourly Rate = (Total Revenue - All Expenses - Taxes) ÷ Total Time (including waiting, driving, prep)",
        "Platform Fees: Fiverr takes 20%, Upwork 10-20%, Etsy 6.5%, DoorDash 0% but you pay gas - factor these in!",
        "Insurance: Personal auto insurance doesn't cover business use - you need rideshare/delivery insurance or risk denials"
      ]
    },
    commonMistakes: [
      {
        mistake: "Not setting aside tax money from gig income throughout the year",
        consequence: "You owe $1,200 in taxes in April but spent all your earnings. Now you're in debt to the IRS and face penalties plus interest.",
        avoidanceStrategy: "Open a separate savings account called 'Tax Fund.' Immediately transfer 30% of every gig payment. Don't touch it until tax time. This is non-negotiable."
      },
      {
        mistake: "Accepting every low-paying gig request to 'stay busy' without calculating profit",
        consequence: "You work 40 hours doing $5 tasks and make $200, but after expenses and taxes you net $80 ($2/hour). You've destroyed your hourly value.",
        avoidanceStrategy: "Set a minimum acceptable rate ($20/hour after expenses). Track a few gigs carefully, calculate true profit, then only accept gigs above your minimum."
      },
      {
        mistake: "Not tracking mileage and business expenses",
        consequence: "You lose thousands in tax deductions. Example: 5,000 miles driven for gigs = $3,350 deduction lost = ~$600 extra taxes paid unnecessarily.",
        avoidanceStrategy: "Use a free mileage tracker app (Stride, Everlance). Log EVERY business mile the day you drive. Track all expenses in a simple spreadsheet immediately when spent."
      },
      {
        mistake: "Using personal vehicle for gig work without proper insurance",
        consequence: "You get in an accident while delivering food. Your personal insurance denies the claim because it was commercial use. You're personally liable for $15,000+ in damages.",
        avoidanceStrategy: "Call your insurance company and add rideshare/delivery coverage (usually adds $10-20/month). Or use platforms' insurance, but understand the limitations."
      },
      {
        mistake: "Underpricing specialized skills to compete with cheaper providers",
        consequence: "You earn $10/hour doing skilled work (design, coding, tutoring) when you could earn $30/hour with proper pricing. You burn out and quit, losing the income stream entirely.",
        avoidanceStrategy: "Research market rates for your skill level. Price at the middle-to-high end. You'll get fewer clients but better-paying ones. Quality > Quantity."
      }
    ],
    nextSteps: {
      immediate: [
        "If you're doing any gig work, calculate your TRUE hourly profit from your last 5 gigs (revenue - expenses - 25% taxes ÷ total time)",
        "Download a mileage tracking app (Stride is free) and start tracking every business mile TODAY",
        "Open a separate savings account for taxes and transfer 30% of any gig income you currently have",
        "List all business-related expenses from the past month - these are deductions you can claim"
      ],
      shortTerm: [
        "Set up a simple expense tracking system (spreadsheet or app like QuickBooks Self-Employed)",
        "Research pricing for your services on the platform you use - are you priced too low?",
        "Call your insurance company if you drive for gigs - add proper coverage",
        "Create a 'minimum acceptable gig' rate and start declining offers below that rate"
      ],
      longTerm: [
        "Track ALL gig income and expenses for 3 months, then evaluate: Is this profitable? Should you adjust pricing? Should you quit this gig?",
        "If earning $1,000+ per quarter, learn about quarterly estimated tax payments (IRS Form 1040-ES) and make your first payment",
        "File your first Schedule C (business profit/loss) with your taxes - consider using TurboTax Self-Employed or hiring a CPA",
        "Consider transitioning from low-paying general gigs (delivery, tasks) to specialized higher-paying gigs (tutoring, design, coding)"
      ]
    },
    expertInsights: [
      "The gig economy is fantastic for flexibility but terrible for financial stability unless you treat it like a real business. Track expenses religiously, set aside taxes automatically, and know your worth. - Jessica Martinez, CPA specializing in gig workers",
      "I've seen countless young gig workers quit after 3 months because they never calculated their true profit. Do the math FIRST, adjust your rates or strategy, then commit. - Tom Henderson, Small Business Coach",
      "The most successful gig workers I know have one thing in common: they specialize. Instead of doing everything on TaskRabbit, they became THE person for furniture assembly. Instead of every design on Fiverr, they mastered logo design. Specialize, charge premium, earn more. - Priya Patel, Entrepreneurship Educator"
    ],
    resources: [
      {
        name: "Stride Tax & Mileage Tracker",
        type: "app",
        description: "Free app that automatically tracks mileage, finds deductions, and estimates quarterly taxes for gig workers",
        isFree: true
      },
      {
        name: "QuickBooks Self-Employed",
        type: "app",
        description: "Tracks expenses, mileage, and helps with quarterly taxes ($15/month but worth it for serious gig workers)",
        isFree: false
      },
      {
        name: "Upwork",
        type: "website",
        description: "Platform for freelance work - design, writing, programming, virtual assistance (better rates than Fiverr)",
        isFree: true
      },
      {
        name: "$100 Startup",
        type: "book",
        description: "Chris Guillebeau's guide to starting micro-businesses with minimal investment - perfect for teen entrepreneurs",
        isFree: false
      }
    ],
    modernExamples: [
      "Teen graphic designer on Fiverr: Charges $150/logo, completes 3/week = $1,800/month gross, ~$1,200 net after taxes/expenses",
      "DoorDash driver (optimized): Works only dinner rush (5-9pm), 15 hours/week, $22/hour gross = $1,320/month, ~$950 net after gas/taxes",
      "Online tutor (Wyzant): Charges $40/hour for SAT prep, 10 hours/week = $1,600/month gross, ~$1,200 net after platform fees (15%) and taxes",
      "Etsy shop owner (handmade jewelry): $2,000/month revenue, $600 in supplies/fees, $350 taxes = $1,050/month profit"
    ]
  },
  5: {
    proTips: [
      "If you earn less than $13,850 (2023), you probably owe $0 federal income tax! File anyway to get back everything that was withheld from paychecks.",
      "The standard deduction means your first $13,850 earned is TAX-FREE. Most part-time teen workers owe absolutely nothing in federal taxes.",
      "Keep every W-2 and 1099 form you receive. These arrive in January/February and you MUST have them to file taxes. Employers must send them by Jan 31.",
      "Free tax filing is available to almost everyone! Don't pay $50-100 for TurboTax when Cash App Taxes, IRS Free File, or FreeTaxUSA work great for simple returns."
    ],
    realScenarios: [
      {
        name: "Emma",
        age: 18,
        story: "I worked part-time and earned $9,200 for the year. Throughout the year, my employer withheld $800 in federal taxes. My friend told me I'd have to pay more taxes. I was terrified!",
        lesson: "Emma learned about the standard deduction ($13,850). Since she earned less than that, her taxable income was $0. She filed taxes and got her entire $800 back as a refund!",
        outcome: "Emma now understands that filing taxes as a lower-income teen usually means GETTING money back. She filed for free using Cash App Taxes in 15 minutes and had her $800 refund in 2 weeks."
      },
      {
        name: "Jamal",
        age: 19,
        story: "I did DoorDash and made $5,200. I didn't receive any paychecks - just direct deposits. At tax time, I got a 1099-NEC showing $5,200. I didn't know I had to file because 'I didn't make much money.' Big mistake.",
        lesson: "Jamal learned that even if you earn less than $13,850, self-employment income over $400 REQUIRES filing. He owed ~$735 in self-employment tax plus penalties for late filing.",
        outcome: "After penalties and interest, Jamal paid $850 total. Now he sets aside 30% of ALL gig income, tracks expenses to reduce taxes, and files on time every year. He'll never make that mistake again."
      },
      {
        name: "Sofia",
        age: 20,
        story: "I worked two jobs (retail and restaurant) and earned $16,000 total. I received two W-2s. I didn't realize I needed BOTH to file taxes. I filed with only one W-2 and got audited by the IRS 6 months later!",
        lesson: "Sofia learned that you must report ALL income from ALL employers. The IRS receives copies of every W-2 and 1099 - they know exactly what you earned. Missing one triggers an audit.",
        outcome: "Sofia had to file an amended return, pay $320 more in taxes plus $45 in penalties. Now she keeps a checklist: 'Did I receive a W-2/1099 from everyone who paid me?' and verifies before filing."
      }
    ],
    cheatSheet: {
      title: "First-Time Tax Filer Essentials",
      items: [
        "Standard Deduction 2024: $14,600 (your first $14,600 earned = tax-free!) - most teen workers owe $0 federal tax",
        "Filing Threshold: Must file if earned $14,600+ from W-2 jobs OR $400+ from self-employment (1099/gig work)",
        "Documents Needed: All W-2s (from employers), All 1099s (from gig work), Student loan interest statement if applicable",
        "Tax Forms: 1040 (main form), Schedule C (if self-employed), Schedule SE (self-employment tax)",
        "Filing Deadline: April 15th - file even if you owe nothing to get your withholding refunded!",
        "Free Options: Cash App Taxes (easiest), IRS Free File (income <$79K), FreeTaxUSA (free federal)",
        "Refund Timeline: E-file + direct deposit = refund in 2-3 weeks | Paper filing = 6-8 weeks"
      ]
    },
    commonMistakes: [
      {
        mistake: "Not filing taxes because 'I didn't make much money'",
        consequence: "You forfeit your refund! If taxes were withheld, you're literally giving the government YOUR money. Average teen refund: $400-800.",
        avoidanceStrategy: "File taxes EVERY year you earn income, even if it's just $1,000. You can only claim refunds for the past 3 years - after that, you lose the money forever."
      },
      {
        mistake: "Paying for expensive tax software when you qualify for free filing",
        consequence: "You waste $60-120 that could be in your savings account. Free options work identically for simple returns (just W-2s).",
        avoidanceStrategy: "Use Cash App Taxes (completely free, super easy interface), IRS Free File (if income <$79K), or FreeTaxUSA (free federal filing). Only pay for software if you have complex taxes."
      },
      {
        mistake: "Not keeping organized records of income and expenses",
        consequence: "You forget about income sources, miss deductions, can't defend yourself if audited, and leave money on the table.",
        avoidanceStrategy: "Create a simple system: Folder (digital or physical) with all W-2s, 1099s, receipts for deductible expenses. Organize by year. Keep for 3 years minimum."
      },
      {
        mistake: "Missing the April 15 deadline and not filing an extension",
        consequence: "Failure-to-file penalty = 5% of tax owed per month (up to 25%). If you owe $500, that's $25/month in penalties. Plus interest.",
        avoidanceStrategy: "Mark April 15 on your calendar NOW. If you can't file by then, submit Form 4868 for automatic 6-month extension (takes 5 minutes online). Extension to file ≠ extension to pay."
      },
      {
        mistake: "Not tracking gig work expenses and missing massive deductions",
        consequence: "You pay taxes on $5,000 gig income when $2,000 in expenses would have reduced taxable income to $3,000, costing you ~$450 in extra taxes.",
        avoidanceStrategy: "Track EVERY business expense: mileage, supplies, phone bill %, subscriptions, equipment. Use Schedule C to deduct these. Even $1,000 in deductions saves ~$225 in taxes."
      }
    ],
    nextSteps: {
      immediate: [
        "Create a 'Tax Documents' folder (phone or computer) and save photos of all income documents (W-2s, 1099s, pay stubs)",
        "Add April 15 tax deadline to your calendar with reminders starting February 1",
        "Make a list of all places you earned income this year - did you receive tax forms from each?",
        "Download Cash App Taxes or visit IRS Free File website to familiarize yourself with the interface"
      ],
      shortTerm: [
        "When you receive W-2s/1099s (arrives by Jan 31), verify the amounts match your records",
        "If any employer/platform doesn't send you a tax form by Feb 15, contact them immediately",
        "Gather all expense receipts if you did any self-employment work - these are deductions",
        "File your taxes by March 1 (early!) to get your refund fast and avoid last-minute stress"
      ],
      longTerm: [
        "Keep all tax returns and supporting documents for at least 3 years (IRS can audit up to 3 years back)",
        "Learn about tax-advantaged accounts: Roth IRA (invest with after-tax money, grows tax-free), HSA (health savings - triple tax benefit)",
        "If you'll consistently earn $20K+, consider learning about tax planning: maximizing deductions, estimated quarterly payments, retirement contributions",
        "Build a relationship with a CPA once your finances become complex (multiple income streams, investments, side business growth)"
      ]
    },
    expertInsights: [
      "Filing taxes for the first time can feel intimidating, but for most teens it's incredibly simple - just one W-2, standard deduction, done in 10 minutes. Don't overthink it. - Mark Thompson, CPA",
      "The biggest money mistake I see teens make is not filing when they have taxes withheld. You're entitled to that money back! I've helped teens recover $500-1,000 in refunds they almost lost. - Angela Rodriguez, Tax Preparer",
      "Keep records of everything. Even if you don't need it this year, good financial record-keeping habits built at 18 will serve you for life. Future-you will thank present-you. - Dr. James Chen, Financial Literacy Educator"
    ],
    resources: [
      {
        name: "Cash App Taxes",
        type: "app",
        description: "Completely free tax filing (federal and state) with super simple interface - perfect for first-time filers",
        isFree: true
      },
      {
        name: "IRS Free File",
        type: "website",
        description: "Official IRS program offering free tax software if you earned less than $79,000",
        isFree: true
      },
      {
        name: "FreeTaxUSA",
        type: "website",
        description: "Free federal filing (state costs $15) - great for simple returns, very user-friendly",
        isFree: true
      },
      {
        name: "IRS Where's My Refund",
        type: "website",
        description: "Track your refund status after filing - updated daily, shows exactly where your refund is",
        isFree: true
      },
      {
        name: "J.K. Lasser's Your Income Tax",
        type: "book",
        description: "Comprehensive tax guide updated annually - reference for complex situations",
        isFree: false
      }
    ],
    modernExamples: [
      "Teen retail worker earned $10,500: Owed $0 federal tax (under standard deduction), got $840 refund from withholdings",
      "Gig worker earned $8,000: Owed ~$1,130 in self-employment tax, but deducted $1,800 in expenses, final tax ~$850",
      "Restaurant server earned $18,000 ($12K wages + $6K tips): Paid ~$1,050 federal tax after standard deduction (effective rate 5.8%)",
      "Dual-job teen earned $15,500 (both W-2s): Owed ~$90 federal tax after standard deduction, plus state tax ~$400 (varies by state)"
    ]
  }
};
