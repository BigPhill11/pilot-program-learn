
import React from 'react';
import { Briefcase, Landmark, Building, Users, Handshake, Home, BrainCircuit, Heart, ShoppingCart, Banknote, TrendingUp } from 'lucide-react';

export interface JourneyLevel {
    level: number;
    focusArea: string;
    sampleTopics: string[];
}

export interface IndustryJourneyData {
    id: string;
    name: string;
    icon: React.ReactElement;
    description: string;
    prediction: string;
    stocksToWatch: string[];
    levels: JourneyLevel[];
}

export const industryJourneys: IndustryJourneyData[] = [
    {
        id: "investment-banking",
        name: "Investment Banking",
        icon: <Landmark />,
        description: "Investment banking involves helping companies raise capital through debt and equity offerings, facilitating mergers and acquisitions, and providing strategic financial advisory services. Investment banks serve as intermediaries between corporations and investors, structuring complex financial transactions. They play a crucial role in capital markets by underwriting securities and providing market-making services.",
        prediction: "Investment banking is expected to see increased activity in 2024-2025 driven by pent-up M&A demand and IPO activity as interest rates stabilize. Technology sector consolidation and ESG-focused transactions will drive growth. Digital transformation and AI adoption within banks will streamline operations and improve efficiency.",
        stocksToWatch: ["JPM", "GS", "MS", "BAC", "C"],
        levels: [
            { level: 1, focusArea: "Basic Terms", sampleTopics: ["Stock", "IPO", "M&A", "Equity", "Debt", "Leverage"] },
            { level: 2, focusArea: "Banking Process", sampleTopics: ["Deal Flow", "Pitching", "Valuation", "Due Diligence"] },
            { level: 3, focusArea: "Day-to-Day Life", sampleTopics: ["Schedule", "Teams", "Culture", "Etiquette"] },
            { level: 4, focusArea: "Key Skills", sampleTopics: ["Excel", "Modeling", "Communication", "Organization"] },
            { level: 5, focusArea: "Banking in the Real World", sampleTopics: ["Role in Economy", "Clients", "Case Studies", "Trends"] },
            { level: 6, focusArea: "Macroeconomics & Banking", sampleTopics: ["Interest Rates", "Recession Impact", "Regulation"] },
            { level: 7, focusArea: "Careers & Interviews", sampleTopics: ["Recruiting", "Interview Prep", "Networking"] },
        ]
    },
    {
        id: "private-equity",
        name: "Private Equity",
        icon: <Briefcase />,
        description: "Private equity involves investing in private companies or buying out public companies to take them private, with the goal of improving operations and selling for a profit. PE firms use investor capital and leverage to acquire companies, then work to increase their value through operational improvements, strategic initiatives, and financial engineering. The typical investment horizon is 3-7 years before exiting through sale or IPO.",
        prediction: "Private equity is poised for a strong comeback as dry powder reaches record levels and interest rates begin to stabilize. Middle-market deals will dominate as mega-deals face scrutiny. Technology, healthcare, and ESG-focused investments will see increased activity as firms seek resilient, growth-oriented sectors.",
        stocksToWatch: ["BX", "KKR", "APO", "CG", "BAM"],
        levels: [
            { level: 1, focusArea: "Basic PE Terms", sampleTopics: ["Private equity", "buyout", "LBO", "portfolio company", "carried interest"] },
            { level: 2, focusArea: "PE Fund Structure", sampleTopics: ["Limited partners", "general partners", "fund life cycle", "capital calls"] },
            { level: 3, focusArea: "Deal Process", sampleTopics: ["Sourcing deals", "diligence", "bidding", "closing"] },
            { level: 4, focusArea: "PE Investment Skills", sampleTopics: ["Financial modeling", "LBO modeling", "industry analysis"] },
            { level: 5, focusArea: "PE in the Real World", sampleTopics: ["Exits (IPO, sale)", "case studies", "mega-funds", "private vs public"] },
            { level: 6, focusArea: "Macroeconomics & PE", sampleTopics: ["Interest rates", "market cycles", "fundraising environment"] },
            { level: 7, focusArea: "PE Careers & Interviews", sampleTopics: ["Recruiting", "case studies", "fit interviews", "networking"] },
        ]
    },
    {
        id: "credit",
        name: "Credit",
        icon: <Building />,
        description: "Credit markets involve the buying and selling of debt securities, from corporate bonds to structured products, where investors lend money to borrowers in exchange for interest payments. Credit analysts evaluate the creditworthiness of borrowers and determine appropriate risk premiums for different types of debt. This market is essential for corporate financing and provides income-generating investments for institutional and retail investors.",
        prediction: "Credit markets face a challenging environment with potential recession risks and elevated interest rates, but opportunities exist in high-quality corporate debt and distressed situations. Municipal bonds may outperform as infrastructure spending increases. Private credit continues to grow as banks retreat from lending, creating opportunities for direct lenders.",
        stocksToWatch: ["ARCC", "MAIN", "BXSL", "PSEC", "TPVG"],
        levels: [
            { level: 1, focusArea: "Basic Credit Terms", sampleTopics: ["Bonds", "loans", "yield", "credit risk", "covenants"] },
            { level: 2, focusArea: "Types of Credit Instruments", sampleTopics: ["Investment grade", "high yield", "distressed debt", "mezzanine"] },
            { level: 3, focusArea: "Credit Analysis Process", sampleTopics: ["Credit ratings", "risk assessment", "documentation"] },
            { level: 4, focusArea: "Credit Investment Skills", sampleTopics: ["Financial ratios", "coverage analysis", "cash flow modeling"] },
            { level: 5, focusArea: "Credit in the Real World", sampleTopics: ["Default events", "restructuring", "recent crises", "notable deals"] },
            { level: 6, focusArea: "Macroeconomics & Credit", sampleTopics: ["Interest rates", "monetary policy", "recession impact"] },
            { level: 7, focusArea: "Credit Careers & Interviews", sampleTopics: ["Analyst roles", "technical questions", "behavioral prep"] },
        ]
    },
    {
        id: "wealth-management",
        name: "Wealth Management",
        icon: <Users />,
        description: "Wealth management provides comprehensive financial services to high-net-worth individuals and families, including investment management, financial planning, tax strategy, and estate planning. Wealth managers build long-term relationships with clients to preserve and grow their assets across generations. The industry combines investment expertise with personalized service to address complex financial needs of affluent clients.",
        prediction: "Wealth management will benefit from the Great Wealth Transfer as baby boomers pass assets to younger generations, creating demand for digital-savvy advisory services. ESG investing and alternative investments will drive growth. Technology integration and robo-advisors will complement human advisors for more efficient service delivery.",
        stocksToWatch: ["MS", "UBS", "BLK", "STT", "TROW"],
        levels: [
            { level: 1, focusArea: "Basic Wealth Management Terms", sampleTopics: ["Asset allocation", "portfolio", "diversification", "risk tolerance"] },
            { level: 2, focusArea: "Services & Clients", sampleTopics: ["HNWIs", "family offices", "retirement planning", "tax strategy"] },
            { level: 3, focusArea: "Day-to-Day in Wealth Mgmt", sampleTopics: ["Client meetings", "financial plans", "investment selection"] },
            { level: 4, focusArea: "Technical & Soft Skills", sampleTopics: ["Financial planning software", "communication", "relationship building"] },
            { level: 5, focusArea: "Wealth Management in Real Life", sampleTopics: ["Fiduciary duty", "market impact", "case studies"] },
            { level: 6, focusArea: "Macroeconomics & Investing", sampleTopics: ["Economic cycles", "Fed policy", "global diversification"] },
            { level: 7, focusArea: "Careers & Interviews", sampleTopics: ["Recruiting", "client scenarios", "ethical questions", "networking"] },
        ]
    },
    {
        id: "ma",
        name: "M&A",
        icon: <Handshake />,
        description: "Mergers and acquisitions involve the consolidation of companies through various types of financial transactions, including mergers, acquisitions, consolidations, and takeovers. M&A professionals help companies grow through strategic combinations, realize synergies, and create shareholder value. The process involves complex valuation, negotiation, due diligence, and integration planning to ensure successful transactions.",
        prediction: "M&A activity is expected to rebound in 2024-2025 as CEO confidence returns and financing becomes more accessible with stabilizing interest rates. Technology consolidation, healthcare vertical integration, and cross-border deals will drive activity. Private equity-backed transactions will increase as funds deploy record amounts of dry powder.",
        stocksToWatch: ["EVRG", "LAZ", "MORN", "PJT", "MC"],
        levels: [
            { level: 1, focusArea: "Basic M&A Terms", sampleTopics: ["Merger", "acquisition", "synergy", "accretion/dilution", "target/acquirer"] },
            { level: 2, focusArea: "M&A Deal Process", sampleTopics: ["Deal stages", "confidentiality", "NDAs", "LOIs", "SPA"] },
            { level: 3, focusArea: "M&A Financial Analysis", sampleTopics: ["Valuation", "comps", "precedent transactions", "fairness opinions"] },
            { level: 4, focusArea: "M&A Technical Skills", sampleTopics: ["Modeling merger impact", "pro forma analysis", "integration"] },
            { level: 5, focusArea: "M&A in the Real World", sampleTopics: ["Hostile takeovers", "famous deals", "regulatory review"] },
            { level: 6, focusArea: "Macroeconomics & M&A", sampleTopics: ["Market trends", "antitrust law", "global M&A cycles"] },
            { level: 7, focusArea: "M&A Careers & Interviews", sampleTopics: ["Recruiting", "case prep", "common interview Qs", "deal experience"] },
        ]
    },
    {
        id: "real-estate",
        name: "Real Estate",
        icon: <Home />,
        description: "Real estate finance involves the analysis, acquisition, development, and management of income-producing properties across various asset classes including office, retail, industrial, and multifamily. Real estate professionals evaluate properties based on location, cash flow potential, and market fundamentals. The industry encompasses both debt and equity investments, from direct property ownership to REITs and real estate private equity.",
        prediction: "Real estate faces headwinds from high interest rates but opportunities exist in industrial/logistics properties driven by e-commerce growth and data centers supporting AI infrastructure. Multifamily properties in growing Sun Belt markets remain attractive. Office real estate continues to struggle with remote work trends, creating distressed opportunities for skilled investors.",
        stocksToWatch: ["PLD", "AMT", "EQIX", "SPG", "EXR"],
        levels: [
            { level: 1, focusArea: "Basic Real Estate Terms", sampleTopics: ["Cap rate", "NOI", "REIT", "loan-to-value", "lease", "asset classes"] },
            { level: 2, focusArea: "Real Estate Deal Process", sampleTopics: ["Sourcing", "underwriting", "due diligence", "closing"] },
            { level: 3, focusArea: "Financial Analysis", sampleTopics: ["Property cash flow", "valuation", "mortgage modeling"] },
            { level: 4, focusArea: "Technical & Analytical Skills", sampleTopics: ["Argus/Excel", "market comps", "scenario analysis"] },
            { level: 5, focusArea: "Real Estate in Practice", sampleTopics: ["Development", "property management", "case studies"] },
            { level: 6, focusArea: "Macroeconomics & Real Estate", sampleTopics: ["Interest rates", "market cycles", "regulation"] },
            { level: 7, focusArea: "RE Careers & Interviews", sampleTopics: ["Analyst roles", "technical cases", "market questions", "networking"] },
        ]
    },
    {
        id: "consulting",
        name: "Consulting",
        icon: <BrainCircuit />,
        description: "Management consulting involves helping organizations solve complex business problems, improve performance, and implement strategic changes through expert analysis and recommendations. Consultants work across industries to optimize operations, develop growth strategies, and navigate digital transformations. The field requires strong analytical skills, client management abilities, and the capacity to quickly understand and address diverse business challenges.",
        prediction: "Consulting demand will remain strong as companies navigate digital transformation, AI implementation, and ESG compliance requirements. Technology and healthcare consulting will see particular growth. Specialized boutique firms will gain market share as clients seek deep expertise rather than broad service offerings from large firms.",
        stocksToWatch: ["ACN", "IBM", "INFY", "TCS", "WIT"],
        levels: [
            { level: 1, focusArea: "Basic Consulting Terms", sampleTopics: ["Client", "deliverable", "scope", "engagement", "MECE"] },
            { level: 2, focusArea: "Consulting Process", sampleTopics: ["Problem definition", "frameworks", "research", "recommendations"] },
            { level: 3, focusArea: "Day-to-Day Consulting", sampleTopics: ["Team meetings", "travel", "client presentations", "slide building"] },
            { level: 4, focusArea: "Analytical & Soft Skills", sampleTopics: ["Data analysis", "storytelling", "communication", "brainstorming"] },
            { level: 5, focusArea: "Consulting in the Real World", sampleTopics: ["Strategy vs operations", "industry specialties", "famous projects"] },
            { level: 6, focusArea: "Consulting & the Economy", sampleTopics: ["Industry cycles", "macro trends", "global projects"] },
            { level: 7, focusArea: "Consulting Careers & Cases", sampleTopics: ["Recruiting", "case interviews", "fit questions", "career tracks"] },
        ]
    },
    {
        id: "healthcare",
        name: "Healthcare",
        icon: <Heart />,
        description: "Healthcare finance encompasses the complex ecosystem of hospitals, pharmaceutical companies, medical device manufacturers, and healthcare services, all requiring specialized financial analysis due to regulatory requirements and unique business models. Healthcare professionals analyze everything from drug development pipelines to hospital operations and insurance reimbursement models. The sector combines traditional financial analysis with deep understanding of clinical trials, FDA approvals, and healthcare policy impacts.",
        prediction: "Healthcare will benefit from an aging population driving demand for medical services and breakthrough technologies like AI-powered diagnostics and personalized medicine. Biotech M&A activity will increase as large pharma seeks innovation. Digital health and telemedicine adoption will accelerate, creating new investment opportunities in healthcare technology platforms.",
        stocksToWatch: ["UNH", "JNJ", "PFE", "ABBV", "TMO"],
        levels: [
            { level: 1, focusArea: "Healthcare Finance Basics", sampleTopics: ["Drug development", "clinical trials", "FDA approval", "reimbursement", "healthcare REITs"] },
            { level: 2, focusArea: "Healthcare Business Models", sampleTopics: ["Pharma vs biotech", "medical devices", "hospitals", "insurance", "PBMs"] },
            { level: 3, focusArea: "Healthcare Analysis", sampleTopics: ["Pipeline valuation", "patent cliffs", "regulatory risks", "competitive dynamics"] },
            { level: 4, focusArea: "Healthcare Investing Skills", sampleTopics: ["DCF for pharma", "probability-adjusted models", "comp analysis", "ESG factors"] },
            { level: 5, focusArea: "Healthcare in Practice", sampleTopics: ["Notable deals", "breakthrough drugs", "digital health", "policy impacts"] },
            { level: 6, focusArea: "Healthcare & Macro Trends", sampleTopics: ["Aging demographics", "healthcare spending", "global health", "innovation cycles"] },
            { level: 7, focusArea: "Healthcare Careers", sampleTopics: ["Analyst roles", "case studies", "industry networking", "specialized knowledge"] },
        ]
    },
    {
        id: "consumer",
        name: "Consumer",
        icon: <ShoppingCart />,
        description: "Consumer industry finance covers companies that sell goods and services directly to end consumers, from retail and restaurants to consumer packaged goods and luxury brands. Consumer analysts must understand brand value, supply chain dynamics, and changing consumer preferences across demographics and geographies. The sector requires analysis of seasonal patterns, inventory management, and the impact of economic cycles on discretionary spending.",
        prediction: "Consumer companies will benefit from resilient spending on experiences and premium products, while value retailers may outperform in an uncertain economic environment. E-commerce growth continues with omnichannel strategies becoming essential. Sustainability and Gen Z preferences will drive innovation in product development and marketing strategies.",
        stocksToWatch: ["AMZN", "COST", "NKE", "SBUX", "HD"],
        levels: [
            { level: 1, focusArea: "Consumer Finance Basics", sampleTopics: ["Retail metrics", "same-store sales", "inventory turnover", "brand equity", "seasonal patterns"] },
            { level: 2, focusArea: "Consumer Business Models", sampleTopics: ["Retail vs wholesale", "subscription models", "marketplace vs direct", "franchise systems"] },
            { level: 3, focusArea: "Consumer Analysis", sampleTopics: ["Comp store analysis", "market share", "pricing power", "supply chain", "digital transformation"] },
            { level: 4, focusArea: "Consumer Investing Skills", sampleTopics: ["Store-level modeling", "comp analysis", "channel checks", "consumer surveys"] },
            { level: 5, focusArea: "Consumer in Practice", sampleTopics: ["Notable brands", "retail disruption", "private equity deals", "turnaround stories"] },
            { level: 6, focusArea: "Consumer & Economic Cycles", sampleTopics: ["Discretionary vs staples", "inflation impact", "consumer confidence", "demographic trends"] },
            { level: 7, focusArea: "Consumer Careers", sampleTopics: ["Analyst roles", "retail field work", "brand case studies", "industry conferences"] },
        ]
    },
    {
        id: "commercial-banking",
        name: "Commercial Banking",
        icon: <Banknote />,
        description: "Commercial banking focuses on providing financial services to businesses, from small enterprises to large corporations, including lending, cash management, trade finance, and treasury services. Commercial bankers evaluate credit risk, structure loans, and build relationships with business clients across various industries. The sector requires understanding of different business models, industry cycles, and the interplay between interest rates and banking profitability.",
        prediction: "Commercial banking faces net interest margin pressure as interest rates plateau, but loan demand should recover as businesses expand and refinance maturing debt. Credit losses may increase in a slowing economy, particularly in commercial real estate. Digital transformation and fintech competition will drive efficiency improvements and new product offerings.",
        stocksToWatch: ["JPM", "BAC", "WFC", "USB", "PNC"],
        levels: [
            { level: 1, focusArea: "Commercial Banking Basics", sampleTopics: ["Net interest margin", "credit risk", "loan-to-deposit ratio", "capital ratios", "Basel III"] },
            { level: 2, focusArea: "Banking Products & Services", sampleTopics: ["Commercial loans", "lines of credit", "cash management", "trade finance", "treasury services"] },
            { level: 3, focusArea: "Credit Analysis", sampleTopics: ["Financial statement analysis", "cash flow", "collateral", "industry risk", "loan documentation"] },
            { level: 4, focusArea: "Banking Skills", sampleTopics: ["Credit modeling", "risk assessment", "relationship management", "cross-selling", "regulatory compliance"] },
            { level: 5, focusArea: "Commercial Banking in Practice", sampleTopics: ["Large corporate deals", "middle market focus", "industry specialization", "workout situations"] },
            { level: 6, focusArea: "Banking & Economic Environment", sampleTopics: ["Interest rate cycles", "regulatory changes", "economic indicators", "sector rotations"] },
            { level: 7, focusArea: "Commercial Banking Careers", sampleTopics: ["Credit analyst", "relationship manager", "commercial lending", "interview prep"] },
        ]
    },
    {
        id: "sales-trading",
        name: "Sales & Trading",
        icon: <TrendingUp />,
        description: "Sales and trading involves buying and selling securities for institutional clients and the bank's own account, requiring deep market knowledge and quick decision-making under pressure. Sales professionals build relationships with institutional investors, while traders manage risk and provide liquidity across various asset classes. The business combines market-making, client execution, and proprietary trading within strict risk management frameworks.",
        prediction: "Sales and trading will benefit from increased market volatility and institutional trading volumes, though electronic trading continues to compress margins. Fixed income trading may outperform as rates stabilize and corporate bond issuance increases. Crypto and digital assets trading will grow as institutional adoption accelerates.",
        stocksToWatch: ["GS", "MS", "JPM", "COIN", "VIRT"],
        levels: [
            { level: 1, focusArea: "Sales & Trading Basics", sampleTopics: ["Bid-ask spread", "market making", "institutional clients", "flow trading", "risk management"] },
            { level: 2, focusArea: "Trading Desk Structure", sampleTopics: ["Equity vs fixed income", "derivatives", "commodities", "FX", "electronic vs voice"] },
            { level: 3, focusArea: "Market Dynamics", sampleTopics: ["Order flow", "liquidity", "volatility", "market microstructure", "algo trading"] },
            { level: 4, focusArea: "Trading Skills", sampleTopics: ["Risk management", "P&L attribution", "market analysis", "client coverage", "technology systems"] },
            { level: 5, focusArea: "S&T in Practice", sampleTopics: ["Major trading losses", "market crises", "desk culture", "electronic transformation"] },
            { level: 6, focusArea: "Markets & Macro Environment", sampleTopics: ["Central bank policy", "market cycles", "regulatory impact", "global markets"] },
            { level: 7, focusArea: "S&T Careers", sampleTopics: ["Sales vs trading roles", "desk rotations", "interview process", "performance metrics"] },
        ]
    }
];
