
export const earningMoneyLevel1 = {
  title: "Where Money Comes From",
  flashcards: [
    {
      term: "Allowance",
      definition: "Regular money given by parents/guardians for chores or responsibilities, helping teens learn money management."
    },
    {
      term: "Part-time Job",
      definition: "Employment that requires fewer hours than full-time work, perfect for students to earn money while maintaining studies."
    },
    {
      term: "Freelancing",
      definition: "Working independently on projects for different clients, like tutoring, graphic design, or writing."
    },
    {
      term: "Gig Work",
      definition: "Short-term, flexible jobs like babysitting, lawn care, or delivery services that fit around your schedule."
    }
  ],
  dragDropActivity: {
    title: "Match the Earning Method",
    instruction: "Match each earning opportunity with its best description:",
    items: [
      { id: "tutoring", text: "Tutoring classmates" },
      { id: "babysitting", text: "Babysitting neighbors" },
      { id: "crafts", text: "Selling handmade crafts" },
      { id: "lawn", text: "Lawn care services" }
    ],
    categories: [
      { id: "service", title: "Service-Based", correctItems: ["tutoring", "babysitting", "lawn"] },
      { id: "product", title: "Product-Based", correctItems: ["crafts"] }
    ]
  },
  quiz: {
    question: "What's the main benefit of earning your own money as a teen?",
    options: [
      "Having unlimited spending power",
      "Building independence and budgeting skills",
      "Avoiding all responsibilities",
      "Getting rich quickly"
    ],
    correctAnswer: 1,
    explanation: "Earning your own money helps build financial independence and teaches valuable budgeting skills for the future."
  }
};
