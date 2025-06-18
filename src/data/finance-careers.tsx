
import React from 'react';
import { Landmark, Briefcase, CreditCard, Handshake, Users, Home, TrendingUp, Building, DollarSign } from 'lucide-react';

export interface CareerLevel {
  level: number;
  focusArea: string;
  sampleTopics: string[];
  isCompleted?: boolean;
  isActive?: boolean;
}

export interface CareerVideo {
  id: string;
  title: string;
  speaker: 'intern' | 'professional' | 'professor';
  duration: string;
  description: string;
  thumbnailUrl?: string;
}

export interface FinanceCareerData {
  id: string;
  name: string;
  icon: React.ReactElement;
  description: string;
  levels: CareerLevel[];
  videos: CareerVideo[];
}

export const financeCareers: FinanceCareerData[] = [
  {
    id: "investment-banking",
    name: "Investment Banking",
    icon: <Landmark />,
    description: "Help companies raise capital through debt and equity offerings, facilitate mergers and acquisitions, and provide strategic financial advisory services.",
    levels: [
      { level: 1, focusArea: "Basic Terms", sampleTopics: ["Stock", "IPO", "M&A", "Equity", "Debt", "Leverage"] },
      { level: 2, focusArea: "Banking Process", sampleTopics: ["Deal Flow", "Pitching", "Valuation", "Due Diligence"] },
      { level: 3, focusArea: "Day-to-Day Life", sampleTopics: ["Schedule", "Teams", "Culture", "Etiquette"] },
      { level: 4, focusArea: "Key Skills", sampleTopics: ["Excel", "Modeling", "Communication", "Organization"] },
      { level: 5, focusArea: "Banking in the Real World", sampleTopics: ["Role in Economy", "Clients", "Case Studies", "Trends"] },
      { level: 6, focusArea: "Macroeconomics & Banking", sampleTopics: ["Interest Rates", "Recession Impact", "Regulation"] },
      { level: 7, focusArea: "Careers & Interviews", sampleTopics: ["Recruiting", "Interview Prep", "Networking"] },
    ],
    videos: [
      { id: "ib-intern", title: "Life as an IB Intern", speaker: "intern", duration: "8:30", description: "Day-to-day experience of a summer analyst" },
      { id: "ib-pro", title: "Managing Director Insights", speaker: "professional", duration: "12:15", description: "Career progression and client relationships" },
      { id: "ib-prof", title: "Industry Evolution", speaker: "professor", duration: "15:45", description: "Academic perspective on investment banking" }
    ]
  },
  {
    id: "private-equity",
    name: "Private Equity",
    icon: <Briefcase />,
    description: "Invest in private companies or buy out public companies to take them private, with the goal of improving operations and selling for a profit.",
    levels: [
      { level: 1, focusArea: "Basic PE Terms", sampleTopics: ["Private equity", "buyout", "LBO", "portfolio company", "carried interest"] },
      { level: 2, focusArea: "PE Fund Structure", sampleTopics: ["Limited partners", "general partners", "fund life cycle", "capital calls"] },
      { level: 3, focusArea: "Deal Process", sampleTopics: ["Sourcing deals", "diligence", "bidding", "closing"] },
      { level: 4, focusArea: "PE Investment Skills", sampleTopics: ["Financial modeling", "LBO modeling", "industry analysis"] },
      { level: 5, focusArea: "PE in the Real World", sampleTopics: ["Exits (IPO, sale)", "case studies", "mega-funds", "private vs public"] },
      { level: 6, focusArea: "Macroeconomics & PE", sampleTopics: ["Interest rates", "market cycles", "fundraising environment"] },
      { level: 7, focusArea: "PE Careers & Interviews", sampleTopics: ["Recruiting", "case studies", "fit interviews", "networking"] },
    ],
    videos: [
      { id: "pe-intern", title: "PE Analyst Experience", speaker: "intern", duration: "9:20", description: "Working on deal sourcing and modeling" },
      { id: "pe-pro", title: "Partner Perspective", speaker: "professional", duration: "14:30", description: "Deal execution and portfolio management" },
      { id: "pe-prof", title: "PE Market Dynamics", speaker: "professor", duration: "18:10", description: "Academic research on private equity returns" }
    ]
  },
  {
    id: "credit",
    name: "Credit",
    icon: <CreditCard />,
    description: "Analyze and assess credit risk across various debt instruments, from corporate bonds to bank loans, managing portfolios and evaluating borrower creditworthiness.",
    levels: [
      { level: 1, focusArea: "Basic Credit Terms", sampleTopics: ["Bonds", "loans", "yield", "credit risk", "covenants"] },
      { level: 2, focusArea: "Types of Credit Instruments", sampleTopics: ["Investment grade", "high yield", "distressed debt", "mezzanine"] },
      { level: 3, focusArea: "Credit Analysis Process", sampleTopics: ["Credit ratings", "risk assessment", "documentation"] },
      { level: 4, focusArea: "Credit Investment Skills", sampleTopics: ["Financial ratios", "coverage analysis", "cash flow modeling"] },
      { level: 5, focusArea: "Credit in the Real World", sampleTopics: ["Default events", "restructuring", "recent crises", "notable deals"] },
      { level: 6, focusArea: "Macroeconomics & Credit", sampleTopics: ["Interest rates", "monetary policy", "recession impact"] },
      { level: 7, focusArea: "Credit Careers & Interviews", sampleTopics: ["Analyst roles", "technical questions", "behavioral prep"] },
    ],
    videos: [
      { id: "credit-intern", title: "Credit Analyst Internship", speaker: "intern", duration: "7:45", description: "Learning credit analysis fundamentals" },
      { id: "credit-pro", title: "Portfolio Manager Insights", speaker: "professional", duration: "13:20", description: "Managing credit portfolios through cycles" },
      { id: "credit-prof", title: "Credit Market Theory", speaker: "professor", duration: "16:30", description: "Academic perspective on credit pricing" }
    ]
  },
  {
    id: "fixed-income",
    name: "Fixed Income",
    icon: <DollarSign />,
    description: "Trade and invest in government bonds, treasury securities, and other fixed income instruments, focusing on interest rate movements and duration risk management.",
    levels: [
      { level: 1, focusArea: "Basic Fixed Income Terms", sampleTopics: ["Treasury bonds", "duration", "yield curve", "interest rate risk", "maturity"] },
      { level: 2, focusArea: "Types of Fixed Income Securities", sampleTopics: ["Government bonds", "municipal bonds", "treasury bills", "TIPS"] },
      { level: 3, focusArea: "Fixed Income Analysis", sampleTopics: ["Yield calculations", "price sensitivity", "curve analysis"] },
      { level: 4, focusArea: "Trading & Portfolio Skills", sampleTopics: ["Duration matching", "convexity", "hedging strategies"] },
      { level: 5, focusArea: "Fixed Income in Practice", sampleTopics: ["Central bank policy", "auction mechanisms", "market making"] },
      { level: 6, focusArea: "Macro & Fixed Income", sampleTopics: ["Fed policy", "inflation impact", "global bond markets"] },
      { level: 7, focusArea: "Careers & Interviews", sampleTopics: ["Trading roles", "research positions", "risk management"] },
    ],
    videos: [
      { id: "fi-intern", title: "Fixed Income Trader Intern", speaker: "intern", duration: "8:15", description: "Learning bond trading basics" },
      { id: "fi-pro", title: "Senior Trader Experience", speaker: "professional", duration: "11:40", description: "Managing fixed income portfolios" },
      { id: "fi-prof", title: "Interest Rate Theory", speaker: "professor", duration: "14:25", description: "Academic foundations of bond pricing" }
    ]
  },
  {
    id: "mergers-acquisitions",
    name: "Mergers & Acquisitions",
    icon: <Handshake />,
    description: "Facilitate corporate combinations, strategic transactions, and provide advisory services for complex business deals.",
    levels: [
      { level: 1, focusArea: "Basic M&A Terms", sampleTopics: ["Merger", "acquisition", "synergy", "accretion/dilution", "target/acquirer"] },
      { level: 2, focusArea: "M&A Deal Process", sampleTopics: ["Deal stages", "confidentiality", "NDAs", "LOIs", "SPA"] },
      { level: 3, focusArea: "M&A Financial Analysis", sampleTopics: ["Valuation", "comps", "precedent transactions", "fairness opinions"] },
      { level: 4, focusArea: "M&A Technical Skills", sampleTopics: ["Modeling merger impact", "pro forma analysis", "integration"] },
      { level: 5, focusArea: "M&A in the Real World", sampleTopics: ["Hostile takeovers", "famous deals", "regulatory review"] },
      { level: 6, focusArea: "Macroeconomics & M&A", sampleTopics: ["Market trends", "antitrust law", "global M&A cycles"] },
      { level: 7, focusArea: "M&A Careers & Interviews", sampleTopics: ["Recruiting", "case prep", "common interview Qs", "deal experience"] },
    ],
    videos: [
      { id: "ma-intern", title: "M&A Summer Analyst", speaker: "intern", duration: "8:15", description: "Working on live deal transactions" },
      { id: "ma-pro", title: "M&A Director Experience", speaker: "professional", duration: "11:40", description: "Leading deal teams and client relationships" },
      { id: "ma-prof", title: "M&A Strategy Research", speaker: "professor", duration: "14:25", description: "Academic studies on merger success factors" }
    ]
  },
  {
    id: "wealth-management",
    name: "Wealth Management",
    icon: <Users />,
    description: "Provide comprehensive financial planning and investment management services to high-net-worth individuals and families.",
    levels: [
      { level: 1, focusArea: "Basic Wealth Management Terms", sampleTopics: ["Asset allocation", "portfolio", "diversification", "risk tolerance"] },
      { level: 2, focusArea: "Services & Clients", sampleTopics: ["HNWIs", "family offices", "retirement planning", "tax strategy"] },
      { level: 3, focusArea: "Day-to-Day in Wealth Mgmt", sampleTopics: ["Client meetings", "financial plans", "investment selection"] },
      { level: 4, focusArea: "Technical & Soft Skills", sampleTopics: ["Financial planning software", "communication", "relationship building"] },
      { level: 5, focusArea: "Wealth Management in Real Life", sampleTopics: ["Fiduciary duty", "market impact", "case studies"] },
      { level: 6, focusArea: "Macroeconomics & Investing", sampleTopics: ["Economic cycles", "Fed policy", "global diversification"] },
      { level: 7, focusArea: "Careers & Interviews", sampleTopics: ["Recruiting", "client scenarios", "ethical questions", "networking"] },
    ],
    videos: [
      { id: "wm-intern", title: "Wealth Management Trainee", speaker: "intern", duration: "9:10", description: "Learning client service and planning" },
      { id: "wm-pro", title: "Senior Advisor Perspective", speaker: "professional", duration: "12:50", description: "Building long-term client relationships" },
      { id: "wm-prof", title: "Behavioral Finance Insights", speaker: "professor", duration: "17:20", description: "Academic research on investor behavior" }
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate Finance",
    icon: <Home />,
    description: "Analyze, finance, and invest in real estate properties across residential, commercial, and institutional markets.",
    levels: [
      { level: 1, focusArea: "Basic Real Estate Terms", sampleTopics: ["Cap rate", "NOI", "REIT", "loan-to-value", "lease", "asset classes"] },
      { level: 2, focusArea: "Real Estate Deal Process", sampleTopics: ["Sourcing", "underwriting", "due diligence", "closing"] },
      { level: 3, focusArea: "Financial Analysis", sampleTopics: ["Property cash flow", "valuation", "mortgage modeling"] },
      { level: 4, focusArea: "Technical & Analytical Skills", sampleTopics: ["Argus/Excel", "market comps", "scenario analysis"] },
      { level: 5, focusArea: "Real Estate in Practice", sampleTopics: ["Development", "property management", "case studies"] },
      { level: 6, focusArea: "Macroeconomics & Real Estate", sampleTopics: ["Interest rates", "market cycles", "regulation"] },
      { level: 7, focusArea: "RE Careers & Interviews", sampleTopics: ["Analyst roles", "technical cases", "market questions", "networking"] },
    ],
    videos: [
      { id: "re-intern", title: "Real Estate Analyst Intern", speaker: "intern", duration: "8:40", description: "Property analysis and market research" },
      { id: "re-pro", title: "Development Professional", speaker: "professional", duration: "13:15", description: "Managing real estate projects" },
      { id: "re-prof", title: "Real Estate Economics", speaker: "professor", duration: "15:55", description: "Academic perspective on property markets" }
    ]
  },
  {
    id: "consulting",
    name: "Financial Consulting",
    icon: <TrendingUp />,
    description: "Provide strategic and operational advice to financial institutions and corporations on complex business challenges.",
    levels: [
      { level: 1, focusArea: "Basic Consulting Terms", sampleTopics: ["Client", "deliverable", "scope", "engagement", "MECE"] },
      { level: 2, focusArea: "Consulting Process", sampleTopics: ["Problem definition", "frameworks", "research", "recommendations"] },
      { level: 3, focusArea: "Day-to-Day Consulting", sampleTopics: ["Team meetings", "travel", "client presentations", "slide building"] },
      { level: 4, focusArea: "Analytical & Soft Skills", sampleTopics: ["Data analysis", "storytelling", "communication", "brainstorming"] },
      { level: 5, focusArea: "Consulting in the Real World", sampleTopics: ["Strategy vs operations", "industry specialties", "famous projects"] },
      { level: 6, focusArea: "Consulting & the Economy", sampleTopics: ["Industry cycles", "macro trends", "global projects"] },
      { level: 7, focusArea: "Consulting Careers & Cases", sampleTopics: ["Recruiting", "case interviews", "fit questions", "career tracks"] },
    ],
    videos: [
      { id: "cons-intern", title: "Consulting Summer Associate", speaker: "intern", duration: "9:30", description: "Working on client projects and cases" },
      { id: "cons-pro", title: "Principal Consultant", speaker: "professional", duration: "14:10", description: "Leading engagements and team management" },
      { id: "cons-prof", title: "Strategy Research", speaker: "professor", duration: "16:45", description: "Academic foundations of strategic consulting" }
    ]
  }
];
