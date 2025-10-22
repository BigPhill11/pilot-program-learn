import { TaxLevel } from './taxes-journey-data';

export interface EnhancedTaxContent {
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
  modernExamples: string[];
}

export const taxesEnhancedContent: Record<number, EnhancedTaxContent> = {
  1: {
    proTips: [
      "Your first paycheck shock is normal - everyone feels it! Expect about 20-25% to go to taxes.",
      "That 'missing' money from your paycheck is funding roads, schools, and public services you use daily."
    ],
    realScenarios: [
      {
        name: "Jordan",
        age: 18,
        story: "I got my first job and was so excited about making $15/hour. But when I got my first paycheck, I was confused why it was so much less than I calculated!",
        lesson: "Taxes are automatically withheld from your paycheck. Jordan learned to expect take-home pay to be about 75-80% of gross pay."
      }
    ],
    cheatSheet: {
      title: "Where Your Tax Dollars Go",
      items: [
        "Social Security & Medicare: ~35%",
        "National Defense: ~15%",
        "Healthcare Programs: ~25%",
        "Education & Transportation: ~10%",
        "Everything Else: ~15%"
      ]
    },
    modernExamples: [
      "That Uber ride? Sales tax included.",
      "Your Steam game purchase? Yep, sales tax.",
      "Summer job paycheck? Income and FICA taxes withheld."
    ]
  },
  2: {
    proTips: [
      "Sales tax varies by state - from 0% (Oregon, Delaware) to 10%+ (California). Plan for this when shopping online!",
      "If you sell concert tickets for profit on StubHub, that's taxable income - even as a teen."
    ],
    realScenarios: [
      {
        name: "Maya",
        age: 19,
        story: "I started reselling sneakers on eBay and made $3,000 in profit. I had no idea I needed to report this income until tax season!",
        lesson: "Any income - even from side hustles - is taxable. Maya now tracks all her sales and sets aside 25% for taxes."
      }
    ],
    cheatSheet: {
      title: "Quick Tax Type Guide",
      items: [
        "Income Tax: On money you earn from work",
        "Sales Tax: Added when you buy things (varies by state)",
        "FICA: 7.65% for Social Security & Medicare",
        "Property Tax: Annual tax on homes (if you own)",
        "Capital Gains: On profits from selling investments"
      ]
    },
    modernExamples: [
      "Selling on Depop/Poshmark: Income tax applies",
      "Crypto gains: Capital gains tax (yes, really!)",
      "Gig work (DoorDash, Uber): Self-employment tax"
    ]
  },
  3: {
    proTips: [
      "Tax brackets are progressive - you don't pay the higher rate on ALL your income, just the part in that bracket.",
      "The standard deduction ($13,850 in 2023) means most part-time teen workers owe $0 federal income tax!"
    ],
    realScenarios: [
      {
        name: "Alex",
        age: 17,
        story: "I worked all summer and earned $8,000. My friend said I'd owe tons in taxes, but it turned out I owed nothing!",
        lesson: "Thanks to the standard deduction, Alex's entire income was tax-free. He got back all the federal tax that was withheld."
      }
    ],
    cheatSheet: {
      title: "Reading Your First Paycheck",
      items: [
        "Gross Pay: Total before deductions",
        "Federal Income Tax: Usually 10-12% for teens",
        "FICA (Social Security + Medicare): 7.65%",
        "State Tax: Varies by state (0-10%)",
        "Net Pay: What hits your bank account"
      ]
    },
    modernExamples: [
      "Your $500 paycheck becomes ~$380 after taxes",
      "W-2 form arrives in January (check your email!)",
      "Tax filing can be done FREE with IRS Free File"
    ]
  },
  4: {
    proTips: [
      "You MUST file if you earned more than $13,850 in 2023 (updated annually).",
      "Free filing tools: IRS Free File, TurboTax Free Edition, Cash App Taxes - don't pay unless necessary!"
    ],
    realScenarios: [
      {
        name: "Sam",
        age: 20,
        story: "I paid $60 for tax prep when I could have filed for free. I only made $15,000 and had one W-2!",
        lesson: "If your taxes are simple (just a W-2, no dependents), free filing options work perfectly. Sam now uses TurboTax Free Edition."
      }
    ],
    cheatSheet: {
      title: "Tax Filing Checklist for First-Timers",
      items: [
        "Collect all W-2 forms (from each employer)",
        "Gather 1099 forms (if you did gig work)",
        "Note any student loan interest paid",
        "Choose free filing software if income < $73,000",
        "File by April 15th deadline",
        "Set up direct deposit for faster refund"
      ]
    },
    modernExamples: [
      "File on your phone with Cash App Taxes",
      "Get your refund in 2-3 weeks with direct deposit",
      "Track your refund status with IRS's 'Where's My Refund' tool"
    ]
  },
  5: {
    proTips: [
      "Roth IRA: Pay taxes now, withdraw TAX-FREE in retirement. Best strategy for teens with low income!",
      "Student loan interest deduction: Deduct up to $2,500 of interest paid.",
      "American Opportunity Credit: Worth up to $2,500 per year for first 4 years of college."
    ],
    realScenarios: [
      {
        name: "Taylor",
        age: 22,
        story: "I started a Roth IRA at 18 and contributed $1,000/year. At 22, I've got $4,500 growing TAX-FREE for the next 40+ years!",
        lesson: "Starting early with a Roth IRA is the ultimate tax strategy. That money will grow tax-free for decades."
      }
    ],
    cheatSheet: {
      title: "Teen Tax Hacks (Legal Ways to Pay Less)",
      items: [
        "Open a Roth IRA and contribute early",
        "Claim education credits (American Opportunity)",
        "Deduct student loan interest",
        "Keep receipts for job-search expenses",
        "Hold investments >1 year for lower capital gains rate",
        "Use HSA if offered (triple tax advantage)"
      ]
    },
    modernExamples: [
      "Invest $100/month in Roth IRA → $300k+ by retirement (tax-free!)",
      "College expenses? Claim up to $2,500 tax credit",
      "Sell stocks held >1 year = pay less tax (15% vs 22%+)"
    ]
  }
};
