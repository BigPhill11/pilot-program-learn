
import React from 'react';
import { Briefcase, Landmark, Building, Users, Handshake, Home, BrainCircuit, Heart, ShoppingCart, Banknote, TrendingUp, Smartphone, Car, Zap } from 'lucide-react';

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
    overview: string;
    howItWorks: string;
    futureOutlook: string;
    levels: JourneyLevel[];
}

export const industryJourneys: IndustryJourneyData[] = [
    {
        id: "consumer",
        name: "Consumer Goods & Retail",
        icon: <ShoppingCart />,
        description: "The consumer sector encompasses companies that produce and sell goods directly to consumers, including retail chains, consumer packaged goods, restaurants, and e-commerce platforms.",
        overview: "Consumer companies are driven by consumer spending patterns, brand loyalty, and changing preferences. This sector includes everything from daily necessities like food and clothing to luxury items and experiences.",
        howItWorks: "Companies generate revenue through direct sales to consumers via retail stores, online platforms, or direct-to-consumer channels. Success depends on understanding consumer behavior, effective marketing, supply chain efficiency, and brand building.",
        futureOutlook: "AI-powered personalization will revolutionize shopping experiences with predictive analytics and customized recommendations. Sustainability will become a key differentiator as consumers increasingly prefer eco-friendly products. Direct-to-consumer brands will continue disrupting traditional retail, while omnichannel experiences will become essential.",
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
        id: "healthcare",
        name: "Healthcare & Biotechnology",
        icon: <Heart />,
        description: "Healthcare encompasses pharmaceutical companies, medical device manufacturers, hospitals, and biotech firms developing new treatments and medical technologies.",
        overview: "The healthcare sector is driven by aging demographics, technological innovation, and regulatory approval processes. It includes drug discovery, medical devices, healthcare services, and digital health solutions.",
        howItWorks: "Revenue comes from drug sales, medical procedures, device sales, and healthcare services. Success depends on R&D innovation, regulatory approvals, patent protection, and reimbursement from insurance providers.",
        futureOutlook: "AI will accelerate drug discovery and enable personalized medicine based on genetic profiles. Telemedicine and remote monitoring will become standard care delivery methods. Gene therapy and precision medicine will transform treatment approaches, while digital therapeutics will emerge as new treatment modalities.",
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
        id: "technology",
        name: "Technology & Software",
        icon: <Smartphone />,
        description: "Technology companies develop software, hardware, cloud services, and digital platforms that power modern business and consumer applications.",
        overview: "The tech sector drives digital transformation across all industries. It includes software companies, hardware manufacturers, cloud providers, cybersecurity firms, and platform businesses.",
        howItWorks: "Revenue models include software licensing, subscription services, hardware sales, advertising, and platform commissions. Success depends on innovation, user adoption, network effects, and scalability.",
        futureOutlook: "Quantum computing will solve complex problems beyond current capabilities. Edge computing will enable real-time processing for IoT devices. Augmented reality will merge digital and physical worlds, while blockchain technology will create new decentralized business models and digital economies.",
        levels: [
            { level: 1, focusArea: "Tech Finance Basics", sampleTopics: ["SaaS metrics", "user acquisition", "churn rate", "platform effects", "cloud computing"] },
            { level: 2, focusArea: "Tech Business Models", sampleTopics: ["Subscription vs licensing", "freemium models", "platform businesses", "hardware vs software"] },
            { level: 3, focusArea: "Tech Analysis", sampleTopics: ["Growth metrics", "unit economics", "competitive moats", "disruption risks"] },
            { level: 4, focusArea: "Tech Investing Skills", sampleTopics: ["Revenue forecasting", "TAM analysis", "cohort analysis", "valuation multiples"] },
            { level: 5, focusArea: "Tech in Practice", sampleTopics: ["IPO case studies", "M&A activity", "venture capital", "startup ecosystems"] },
            { level: 6, focusArea: "Tech & Innovation Cycles", sampleTopics: ["Adoption curves", "platform shifts", "regulatory challenges", "global competition"] },
            { level: 7, focusArea: "Tech Careers", sampleTopics: ["Analyst roles", "technical due diligence", "growth investing", "venture capital"] },
        ]
    },
    {
        id: "artificial-intelligence",
        name: "Artificial Intelligence",
        icon: <BrainCircuit />,
        description: "AI companies develop machine learning algorithms, neural networks, and intelligent systems that can perform tasks traditionally requiring human intelligence.",
        overview: "The AI sector includes companies building foundational AI models, AI-powered applications, autonomous systems, and AI infrastructure. It spans across multiple industries from healthcare to finance to transportation.",
        howItWorks: "Revenue comes from AI software licensing, cloud-based AI services, data analytics platforms, and AI-enhanced products. Success depends on data quality, computing power, talent acquisition, and practical applications.",
        futureOutlook: "Artificial General Intelligence (AGI) will emerge within the next decade, potentially revolutionizing every industry. AI will become embedded in all software applications as a standard feature. Autonomous systems will transform transportation, manufacturing, and service industries, while AI governance and ethics will become critical business considerations.",
        levels: [
            { level: 1, focusArea: "AI Finance Basics", sampleTopics: ["Machine learning", "neural networks", "data monetization", "compute costs", "AI infrastructure"] },
            { level: 2, focusArea: "AI Business Models", sampleTopics: ["AI-as-a-Service", "model licensing", "data platforms", "AI-enhanced products"] },
            { level: 3, focusArea: "AI Analysis", sampleTopics: ["Model performance", "data quality", "competitive advantages", "regulatory risks"] },
            { level: 4, focusArea: "AI Investing Skills", sampleTopics: ["Technology assessment", "market sizing", "competitive positioning", "talent evaluation"] },
            { level: 5, focusArea: "AI in Practice", sampleTopics: ["Breakthrough applications", "acquisition targets", "partnership strategies", "ethical considerations"] },
            { level: 6, focusArea: "AI & Future Trends", sampleTopics: ["AGI timeline", "job displacement", "regulation", "societal impact"] },
            { level: 7, focusArea: "AI Careers", sampleTopics: ["Technical analysis", "AI investing", "due diligence", "industry expertise"] },
        ]
    },
    {
        id: "automotive",
        name: "Automotive & Transportation",
        icon: <Car />,
        description: "The automotive sector includes traditional car manufacturers, electric vehicle companies, autonomous driving technology, and transportation services.",
        overview: "This industry is undergoing massive transformation with the shift to electric vehicles, development of autonomous driving, and new mobility services. It includes manufacturers, suppliers, and technology companies.",
        howItWorks: "Revenue comes from vehicle sales, parts and services, software subscriptions, and mobility services. Success depends on manufacturing efficiency, brand strength, technology integration, and adaptation to changing consumer preferences.",
        futureOutlook: "Fully autonomous vehicles will transform transportation and urban planning. Electric vehicles will achieve cost parity with gasoline cars, accelerating adoption. Mobility-as-a-Service will reduce private car ownership in urban areas, while flying cars and hyperloop technology will emerge for specialized transportation needs.",
        levels: [
            { level: 1, focusArea: "Automotive Finance Basics", sampleTopics: ["Vehicle sales", "manufacturing metrics", "supply chain", "dealership models"] },
            { level: 2, focusArea: "Auto Business Models", sampleTopics: ["OEM vs suppliers", "EV transition", "software services", "mobility platforms"] },
            { level: 3, focusArea: "Auto Analysis", sampleTopics: ["Production capacity", "technology adoption", "regulatory compliance", "market share"] },
            { level: 4, focusArea: "Auto Investing Skills", sampleTopics: ["Cycle analysis", "technology valuation", "disruption assessment", "ESG factors"] },
            { level: 5, focusArea: "Auto in Practice", sampleTopics: ["EV leaders", "autonomous driving", "battery technology", "charging infrastructure"] },
            { level: 6, focusArea: "Auto & Transportation Trends", sampleTopics: ["Electrification timeline", "autonomous adoption", "mobility services", "regulatory changes"] },
            { level: 7, focusArea: "Auto Careers", sampleTopics: ["Industry analysis", "technology assessment", "investment research", "sustainability focus"] },
        ]
    },
    {
        id: "energy",
        name: "Energy & Renewables",
        icon: <Zap />,
        description: "The energy sector includes traditional oil and gas companies, renewable energy providers, utilities, and clean technology companies developing sustainable energy solutions.",
        overview: "Energy companies provide the power that drives the global economy. The sector is transitioning from fossil fuels to renewable sources like solar, wind, and hydroelectric power, driven by climate concerns and cost advantages.",
        howItWorks: "Revenue comes from energy production, distribution, and sales. Traditional energy relies on commodity prices, while renewables benefit from long-term contracts and government incentives. Success depends on operational efficiency, regulatory compliance, and technological advancement.",
        futureOutlook: "Renewable energy will become the dominant power source globally within two decades. Energy storage technology will solve intermittency issues, enabling 24/7 renewable power. Smart grids will optimize energy distribution, while hydrogen fuel will power heavy industry and transportation. Carbon capture technology will help offset remaining emissions.",
        levels: [
            { level: 1, focusArea: "Energy Finance Basics", sampleTopics: ["Oil prices", "renewable costs", "utility rates", "grid infrastructure"] },
            { level: 2, focusArea: "Energy Business Models", sampleTopics: ["Upstream vs downstream", "renewable development", "utility operations", "energy trading"] },
            { level: 3, focusArea: "Energy Analysis", sampleTopics: ["Commodity cycles", "capacity factors", "regulatory environment", "ESG metrics"] },
            { level: 4, focusArea: "Energy Investing Skills", sampleTopics: ["Reserve valuation", "project economics", "policy analysis", "technology assessment"] },
            { level: 5, focusArea: "Energy in Practice", sampleTopics: ["Energy transition", "climate policies", "breakthrough technologies", "geopolitical factors"] },
            { level: 6, focusArea: "Energy & Climate Trends", sampleTopics: ["Decarbonization", "energy security", "storage solutions", "hydrogen economy"] },
            { level: 7, focusArea: "Energy Careers", sampleTopics: ["Sector analysis", "project finance", "ESG investing", "policy research"] },
        ]
    },
    {
        id: "investment-banking",
        name: "Investment Banking",
        icon: <Landmark />,
        description: "Investment banking involves helping companies raise capital through debt and equity offerings, facilitating mergers and acquisitions, and providing strategic financial advisory services.",
        overview: "Investment banks serve as intermediaries between corporations and investors, structuring complex financial transactions. They help companies go public, acquire other businesses, and access capital markets.",
        howItWorks: "Revenue comes from advisory fees, underwriting commissions, and trading profits. Success depends on client relationships, market expertise, execution capabilities, and risk management.",
        futureOutlook: "AI will automate routine tasks like financial modeling and due diligence, allowing bankers to focus on strategic advisory. Digital platforms will streamline deal processes and improve client communication. Fintech disruption will create new competition, while ESG considerations will become central to all transactions.",
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
        description: "Private equity involves investing in private companies or buying out public companies to take them private, with the goal of improving operations and selling for a profit.",
        overview: "PE firms use investor capital and leverage to acquire companies, then work to increase their value through operational improvements, strategic initiatives, and financial engineering.",
        howItWorks: "Revenue comes from management fees and carried interest from successful exits. Success depends on deal sourcing, due diligence, operational improvements, and exit timing.",
        futureOutlook: "Technology will enhance deal sourcing and due diligence processes through data analytics. ESG factors will become critical investment criteria. Continuation funds will provide more flexible exit options, while direct lending will grow as banks retreat from certain lending activities.",
        levels: [
            { level: 1, focusArea: "Basic PE Terms", sampleTopics: ["Private equity", "buyout", "LBO", "portfolio company", "carried interest"] },
            { level: 2, focusArea: "PE Fund Structure", sampleTopics: ["Limited partners", "general partners", "fund life cycle", "capital calls"] },
            { level: 3, focusArea: "Deal Process", sampleTopics: ["Sourcing deals", "diligence", "bidding", "closing"] },
            { level: 4, focusArea: "PE Investment Skills", sampleTopics: ["Financial modeling", "LBO modeling", "industry analysis"] },
            { level: 5, focusArea: "PE in the Real World", sampleTopics: ["Exits (IPO, sale)", "case studies", "mega-funds", "private vs public"] },
            { level: 6, focusArea: "Macroeconomics & PE", sampleTopics: ["Interest rates", "market cycles", "fundraising environment"] },
            { level: 7, focusArea: "PE Careers & Interviews", sampleTopics: ["Recruiting", "case studies", "fit interviews", "networking"] },
        ]
    }
];
