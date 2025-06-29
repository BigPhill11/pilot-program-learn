
export const sectorSubdivisions = {
  technology: [
    {
      id: 'consumer-electronics',
      name: 'Consumer Electronics',
      parentSector: 'Technology',
      description: 'Companies creating innovative consumer tech products',
      keyMetrics: ['Unit Sales Growth', 'Gross Margin', 'R&D Spending', 'Brand Loyalty'],
      companies: ['AAPL', 'MSFT']
    },
    {
      id: 'cloud-computing',
      name: 'Cloud Computing',
      parentSector: 'Technology',
      description: 'Infrastructure and software-as-a-service providers',
      keyMetrics: ['ARR Growth', 'Net Revenue Retention', 'Free Cash Flow Margin'],
      companies: ['MSFT', 'GOOGL', 'AMZN']
    },
    {
      id: 'ai-chips',
      name: 'AI & Semiconductors',
      parentSector: 'Technology',
      description: 'Cutting-edge chip designers powering the AI revolution',
      keyMetrics: ['GPU Market Share', 'Data Center Revenue', 'R&D Investment'],
      companies: ['NVDA', 'AMD', 'INTC']
    },
    {
      id: 'fintech',
      name: 'Financial Technology',
      parentSector: 'Technology',
      description: 'Digital payment and financial service innovators',
      keyMetrics: ['Transaction Volume', 'Take Rate', 'User Growth'],
      companies: ['V', 'MA']
    }
  ],
  healthcare: [
    {
      id: 'pharmaceuticals',
      name: 'Pharmaceuticals',
      parentSector: 'Healthcare',
      description: 'Drug discovery and development companies',
      keyMetrics: ['Pipeline Success Rate', 'Patent Cliff Risk', 'R&D ROI'],
      companies: ['LLY', 'ABBV', 'JNJ']
    }
  ],
  finance: [
    {
      id: 'banking',
      name: 'Traditional Banking',
      parentSector: 'Finance',
      description: 'Full-service financial institutions',
      keyMetrics: ['Net Interest Margin', 'Return on Equity', 'Tier 1 Capital'],
      companies: ['JPM']
    },
    {
      id: 'payments',
      name: 'Payment Networks',
      parentSector: 'Finance',
      description: 'Global payment processing infrastructure',
      keyMetrics: ['Payment Volume', 'Cross-border Growth', 'Operating Leverage'],
      companies: ['V', 'MA']
    }
  ]
};

export const getAllSubdivisions = () => {
  return Object.values(sectorSubdivisions).flat();
};

export const getSubdivisionsBySector = (sector: string) => {
  return sectorSubdivisions[sector.toLowerCase()] || [];
};
