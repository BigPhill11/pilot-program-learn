export interface CorporateFinanceLevel {
  id: number;
  title: string;
  description: string;
  overview: string;
  flashcards: Array<{
    term: string;
    definition: string;
  }>;
  realLifeExample: string;
  miniGames: Array<{
    name: string;
    description: string;
    learningGoal: string;
    completionSystem: string;
    keyTerms: string[];
  }>;
  quiz: Array<{
    question: string;
    answer: string;
  }>;
  takeHomeActivity: string;
}

export const corporateFinanceLevels: CorporateFinanceLevel[] = [
  {
    id: 1,
    title: "What Is Corporate Finance?",
    description: "Learn the fundamentals of how businesses make money decisions",
    overview: "Corporate finance is the study of how businesses make decisions about money. It looks at where companies get their money, how they spend it, and how they make sure those choices create value for their owners. Unlike personal finance, which focuses on individuals and families, corporate finance involves large sums of money, big investments, and complex trade-offs. Companies often need to decide whether to borrow money, issue shares, or use profits to fund projects. They also decide whether to reinvest profits in the business or return them to shareholders as dividends. At its core, corporate finance is about balancing risk and reward to make a company stronger and more valuable over time.",
    flashcards: [
      {
        term: "Corporate Finance",
        definition: "Corporate finance is how companies raise, manage, and spend money. It focuses on creating value for shareholders by making smart decisions about investments and funding. For example, when Amazon builds new warehouses to speed up delivery, it's practicing corporate finance."
      },
      {
        term: "Debt",
        definition: "Debt is borrowed money that must be repaid with interest. Companies often borrow from banks or sell bonds to raise cash quickly. For instance, a company might borrow $1 million to build a new factory, then pay it back over time with interest."
      },
      {
        term: "Equity",
        definition: "Equity represents ownership in a company. Companies raise equity by selling shares, giving investors a piece of ownership in exchange for money. For example, when Tesla sells stock to raise funds for new production, it is issuing equity."
      },
      {
        term: "Capital",
        definition: "Capital is the total pool of money a company uses to operate and grow. It includes both debt and equity. A startup with $500,000 from investors and a $200,000 loan has $700,000 in capital."
      },
      {
        term: "Goal of Corporate Finance",
        definition: "The goal is to increase the company's overall value for its owners, usually the shareholders. This can be done by investing in profitable projects, cutting unnecessary costs, and managing risk wisely. For example, if Apple invests in a new iPhone model that boosts profits, it achieves this goal."
      }
    ],
    realLifeExample: "A bakery owner wants to open three new shops across town. To do so, she needs $100,000. She can borrow money from a bank (debt) or sell a share of her business to an investor (equity). If she borrows, she must pay interest each month, but she keeps full control. If she sells equity, she avoids loan payments but gives up some ownership. This decision is corporate finance in action — choosing how to fund growth while balancing risk, cost, and control.",
    miniGames: [
      {
        name: "Debt vs Equity",
        description: "Players see scenarios like 'company borrows from a bank' or 'company sells shares' and must identify whether it's debt or equity.",
        learningGoal: "Recognize the two main sources of business funding.",
        completionSystem: "Bronze = 2 correct, Silver = 3–4, Gold = all correct.",
        keyTerms: ["Debt", "Equity"]
      },
      {
        name: "Finance Detective",
        description: "Players read short business stories (like 'wants to grow but avoid sharing control') and choose the best financing method (debt or equity).",
        learningGoal: "Understand how companies match financing choices with goals.",
        completionSystem: "Points awarded for correct answers; leaderboard option.",
        keyTerms: ["Corporate Finance", "Capital"]
      }
    ],
    quiz: [
      {
        question: "What is the main goal of corporate finance?",
        answer: "To increase the company's overall value for its owners (shareholders) by making smart decisions about investments and funding."
      },
      {
        question: "In Debt vs Equity, which option gives ownership: selling shares or borrowing from a bank?",
        answer: "Selling shares gives ownership (equity), while borrowing from a bank does not."
      },
      {
        question: "What does equity mean in simple terms?",
        answer: "Equity represents ownership in a company - when you buy shares, you own a piece of the business."
      },
      {
        question: "In Finance Detective, why might a business avoid equity funding?",
        answer: "To maintain full control and ownership of the business, since equity funding means giving up ownership to investors."
      },
      {
        question: "In the bakery example, what trade-off did the owner face?",
        answer: "Between keeping control (debt) vs avoiding loan payments (equity) - balancing cost, risk, and control."
      }
    ],
    takeHomeActivity: "Pick a small business in your community (like a restaurant, coffee shop, or gym). Imagine they want to expand. Would they use debt, equity, or both? Write 5–6 sentences explaining your reasoning."
  },
  {
    id: 2,
    title: "Understanding Business Money",
    description: "Master simplified financial statements and business accounting basics",
    overview: "Businesses keep track of their money using three main reports: the income statement, the balance sheet, and the cash flow statement. These documents may sound intimidating, but they answer simple questions: How much money came in? How much went out? What's left? Investors and managers use them to see if the company is healthy and whether it can grow. Ratios like profit margin or debt-to-equity make it easier to compare companies. Understanding these basics helps anyone see if a business is profitable, risky, or running smoothly.",
    flashcards: [
      {
        term: "Revenue",
        definition: "Revenue is the total money a company makes from sales. It shows the 'top line' of how much customers are paying. For example, if a lemonade stand sells 200 cups at $2 each, its revenue is $400."
      },
      {
        term: "Expenses",
        definition: "Expenses are the costs of running the business, like wages, rent, or supplies. They reduce profit. For instance, if the lemonade stand spends $100 on lemons and sugar, that's an expense."
      },
      {
        term: "Profit (Net Income)",
        definition: "Profit is what's left after expenses are subtracted from revenue. It's often called the 'bottom line.' If the stand makes $400 in revenue and spends $300 in expenses, its profit is $100."
      },
      {
        term: "Assets",
        definition: "Assets are things a company owns that have value, like cash, buildings, or equipment. For example, a delivery truck is an asset for a logistics company."
      },
      {
        term: "Liabilities",
        definition: "Liabilities are what the company owes, like loans, rent, or unpaid bills. A bank loan for $10,000 is a liability."
      }
    ],
    realLifeExample: "A small clothing store makes $100,000 in revenue in one year. It spends $70,000 on salaries, rent, and supplies. The result is $30,000 in profit. On the balance sheet, the store lists a delivery van as an asset and a $10,000 bank loan as a liability. These basic numbers help the owner understand if the store is financially strong and where improvements are needed.",
    miniGames: [
      {
        name: "Sort the Money",
        description: "Players drag items like 'cash,' 'loan,' 'sales,' or 'rent' into the right bucket: Asset, Liability, Revenue, or Expense.",
        learningGoal: "Learn how to classify business money flows.",
        completionSystem: "Bronze = 50% correct, Silver = 75%, Gold = all correct.",
        keyTerms: ["Assets", "Liabilities", "Revenue", "Expenses"]
      },
      {
        name: "Profit Puzzle",
        description: "Players are given revenue and expenses, then must calculate profit by subtracting.",
        learningGoal: "Practice basic profit calculation.",
        completionSystem: "Score based on correct answers; badges for speed and accuracy.",
        keyTerms: ["Profit", "Revenue", "Expenses"]
      }
    ],
    quiz: [
      {
        question: "What is revenue?",
        answer: "Revenue is the total money a company makes from sales - the 'top line' showing how much customers are paying."
      },
      {
        question: "In Sort the Money, is a loan an asset or a liability?",
        answer: "A loan is a liability because it's money the company owes and must pay back."
      },
      {
        question: "What does profit measure?",
        answer: "Profit measures what's left after all expenses are subtracted from revenue - the 'bottom line' of business success."
      },
      {
        question: "In Profit Puzzle, what is profit if revenue is $50,000 and expenses are $30,000?",
        answer: "$20,000 profit ($50,000 revenue minus $30,000 expenses)."
      },
      {
        question: "In the clothing store example, what was the asset and what was the liability?",
        answer: "The delivery van was an asset (something owned with value) and the $10,000 bank loan was a liability (money owed)."
      }
    ],
    takeHomeActivity: "Track your own 'mini finances' for one week. Write down all the money you receive (revenue) and all the money you spend (expenses). Subtract them to calculate your 'profit.' Then list one asset you own (like a bike or laptop) and one liability (like money you owe a friend)."
  },
  {
    id: 3,
    title: "The Value of Money Over Time",
    description: "Discover why timing matters in financial decisions",
    overview: "One of the most important ideas in corporate finance is that money today is worth more than money tomorrow. This is because money can earn interest if invested or lose value due to inflation. Companies use this principle, called the 'time value of money,' to decide whether future projects are worth the cost today. Managers compare the present value of future cash inflows with the money they must spend now. If the inflows are worth more, the project is a good choice. This idea also helps compare loans, investments, and savings options.",
    flashcards: [
      {
        term: "Time Value of Money (TVM)",
        definition: "TVM means money today is more valuable than the same amount in the future. For example, $100 today can be invested to grow, while $100 five years from now cannot earn anything in the meantime."
      },
      {
        term: "Interest",
        definition: "Interest is the extra money earned when you invest or the cost of borrowing money. If you borrow $100 at 10% interest, you pay back $110. If you invest $100 at 10%, you earn $110."
      },
      {
        term: "Future Value (FV)",
        definition: "Future value is how much money today will be worth in the future after earning interest. For example, $100 invested at 5% annually grows to about $105 after one year."
      },
      {
        term: "Present Value (PV)",
        definition: "Present value is the worth today of money you will receive in the future, discounted back using an interest rate. For instance, $110 next year is worth $100 today at 10%."
      },
      {
        term: "Discounting",
        definition: "Discounting is shrinking the value of future money to see how much it's worth today. Companies use it to evaluate projects. For example, a $1,000 payment in 3 years might be worth only $850 today."
      }
    ],
    realLifeExample: "A company can invest $1,000,000 today in a project expected to return $1,500,000 in 5 years. If the discount rate is 10%, the present value of $1,500,000 is about $930,000. Since this is less than the $1,000,000 cost, the project should be rejected. This shows how companies use the time value of money to avoid investments that look good at first but aren't worth it after discounting.",
    miniGames: [
      {
        name: "Future Value Calculator",
        description: "Players enter starting money and interest rates to see how money grows.",
        learningGoal: "Understand how compounding works over time.",
        completionSystem: "Bronze = 1 correct, Silver = 2–3, Gold = all correct.",
        keyTerms: ["Future Value", "Interest"]
      },
      {
        name: "Present Value Challenge",
        description: "Players compare two choices (money today vs. money in the future) and must pick the smarter financial decision.",
        learningGoal: "Apply discounting to everyday choices.",
        completionSystem: "Points for correct choices; leaderboard available.",
        keyTerms: ["Present Value", "Discounting"]
      }
    ],
    quiz: [
      {
        question: "Why is money today worth more than money tomorrow?",
        answer: "Because money today can be invested to earn interest and grow, while future money cannot earn anything in the meantime. Also, inflation reduces the purchasing power of future money."
      },
      {
        question: "In Future Value Calculator, what happens when interest rates increase?",
        answer: "Higher interest rates make money grow faster over time, so the future value increases."
      },
      {
        question: "What is present value, and why is it useful?",
        answer: "Present value is what future money is worth today after discounting. It's useful for comparing different investment options and making better financial decisions."
      },
      {
        question: "In Present Value Challenge, why might $10,000 today be better than $12,000 in 3 years?",
        answer: "Because $10,000 invested today at a good interest rate might grow to more than $12,000 in 3 years, making the immediate payment more valuable."
      },
      {
        question: "In the $1,000,000 project example, why was the investment rejected?",
        answer: "Because the present value of future returns ($930,000) was less than the initial investment cost ($1,000,000), making it a losing proposition."
      }
    ],
    takeHomeActivity: "If you save $500 today and it earns 8% annual interest, how much will it be worth in 10 years? Then calculate the present value of receiving $2,000 in 10 years if the discount rate is 8%. Write a short paragraph about which choice feels smarter."
  }
];