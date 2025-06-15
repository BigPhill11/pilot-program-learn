
import React from 'react';
import { Briefcase, Landmark, Building, Users, Handshake, Home, BrainCircuit } from 'lucide-react';

export interface JourneyLevel {
    level: number;
    focusArea: string;
    sampleTopics: string[];
}

export interface IndustryJourneyData {
    id: string;
    name: string;
    icon: React.ReactNode;
    levels: JourneyLevel[];
}

export const industryJourneys: IndustryJourneyData[] = [
    {
        id: "investment-banking",
        name: "Investment Banking",
        icon: <Landmark />,
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
        levels: [
            { level: 1, focusArea: "Basic Consulting Terms", sampleTopics: ["Client", "deliverable", "scope", "engagement", "MECE"] },
            { level: 2, focusArea: "Consulting Process", sampleTopics: ["Problem definition", "frameworks", "research", "recommendations"] },
            { level: 3, focusArea: "Day-to-Day Consulting", sampleTopics: ["Team meetings", "travel", "client presentations", "slide building"] },
            { level: 4, focusArea: "Analytical & Soft Skills", sampleTopics: ["Data analysis", "storytelling", "communication", "brainstorming"] },
            { level: 5, focusArea: "Consulting in the Real World", sampleTopics: ["Strategy vs operations", "industry specialties", "famous projects"] },
            { level: 6, focusArea: "Consulting & the Economy", sampleTopics: ["Industry cycles", "macro trends", "global projects"] },
            { level: 7, focusArea: "Consulting Careers & Cases", sampleTopics: ["Recruiting", "case interviews", "fit questions", "career tracks"] },
        ]
    }
];
