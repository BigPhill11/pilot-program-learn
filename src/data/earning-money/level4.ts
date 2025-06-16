
export const earningMoneyLevel4 = {
  title: "Gig Work & Entrepreneur Basics",
  flashcards: [
    {
      term: "Freelance Platform",
      definition: "Websites like Fiverr, Upwork, or Etsy where you can offer services or sell products to customers worldwide."
    },
    {
      term: "Hourly Value",
      definition: "How much money you actually earn per hour after considering time spent on prep, travel, and other work tasks."
    },
    {
      term: "Entrepreneur",
      definition: "Someone who starts their own business, taking on financial risks to create something new and profitable."
    },
    {
      term: "Side Hustle",
      definition: "A secondary job or business you do alongside school or your main job to earn extra income."
    },
    {
      term: "1099 Form",
      definition: "Tax form for independent contractors showing how much you earned from freelance or gig work."
    }
  ],
  dragDropActivity: {
    title: "Gig Work Categories",
    instruction: "Categorize these gig opportunities:",
    items: [
      { id: "doordash", text: "DoorDash delivery" },
      { id: "etsy", text: "Selling on Etsy" },
      { id: "fiverr", text: "Graphic design on Fiverr" },
      { id: "tutoring", text: "Online tutoring" }
    ],
    categories: [
      { id: "service", title: "Service Gigs", correctItems: ["doordash", "fiverr", "tutoring"] },
      { id: "product", title: "Product Sales", correctItems: ["etsy"] }
    ]
  },
  quiz: {
    question: "You spend 3 hours making crafts and earn $45. What's your hourly value?",
    options: ["$10", "$15", "$20", "$25"],
    correctAnswer: 1,
    explanation: "Hourly value = Total earnings ÷ Total time spent. $45 ÷ 3 hours = $15 per hour."
  }
};
