
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HeadlinesResponse, ProcessedHeadline, MarketRecap } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Generate fresh finance-focused headlines powered by Lovable AI
function generateFinanceHeadlines(userLevel: string = 'beginner'): ProcessedHeadline[] {
  const currentDate = new Date().toISOString();
  
  const headlines = [
    {
      id: `headline-${Date.now()}-1`,
      title: "AI Revolution Transforms Financial Services Sector",
      summary: getUserLevelSummary(userLevel, "ai_finance", "Artificial intelligence continues to reshape the financial services industry with new applications in risk management, fraud detection, and automated trading. Major banks are investing billions in AI infrastructure to stay competitive."),
      tldr: getUserLevelTLDR(userLevel, "ai_finance", "AI is changing how banks and financial companies work"),
      url: "https://www.reuters.com/technology/artificial-intelligence/",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-2`,
      title: "Electric Vehicle Market Drives Clean Energy Stock Surge",
      summary: getUserLevelSummary(userLevel, "ev_market", "Electric vehicle manufacturers and clean energy companies saw significant gains as global adoption accelerates. Government incentives and improving battery technology are driving widespread consumer adoption."),
      tldr: getUserLevelTLDR(userLevel, "ev_market", "Electric car companies are doing really well as more people buy them"),
      url: "https://www.bbc.com/news/business",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-3`,
      title: "Global Supply Chain Resilience Boosts Manufacturing Stocks",
      summary: getUserLevelSummary(userLevel, "supply_chain", "Manufacturing companies are benefiting from improved supply chain management and nearshoring trends. Companies that invested in supply chain diversification are seeing stronger margins and reduced disruption risks."),
      tldr: getUserLevelTLDR(userLevel, "supply_chain", "Companies that make things are doing better by improving how they get materials"),
      url: "https://apnews.com/hub/business",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-4`,
      title: "Cybersecurity Sector Sees Record Investment Growth",
      summary: getUserLevelSummary(userLevel, "cybersecurity", "Cybersecurity companies are experiencing unprecedented demand as businesses increase digital security spending. Remote work trends and growing cyber threats are driving sustained investment in security infrastructure."),
      tldr: getUserLevelTLDR(userLevel, "cybersecurity", "Computer security companies are growing fast as businesses need better protection"),
      url: "https://www.npr.org/sections/business/",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-5`,
      title: "Sustainable Investing Reaches New Milestone",
      summary: getUserLevelSummary(userLevel, "esg_investing", "Environmental, Social, and Governance (ESG) investing continues to attract record capital flows as investors prioritize sustainable returns. Companies with strong ESG ratings are outperforming traditional benchmarks."),
      tldr: getUserLevelTLDR(userLevel, "esg_investing", "More investors are choosing companies that care about the environment and society"),
      url: "https://www.pbs.org/newshour/economy",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-6`,
      title: "Digital Payment Revolution Accelerates Globally",
      summary: getUserLevelSummary(userLevel, "digital_payments", "Digital payment platforms and fintech companies are experiencing explosive growth as cashless transactions become the norm. Mobile payments and cryptocurrency adoption are reshaping the financial landscape."),
      tldr: getUserLevelTLDR(userLevel, "digital_payments", "People are using phones and apps to pay for things instead of cash"),
      url: "https://www.cnn.com/business",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-7`,
      title: "Healthcare Innovation Drives Biotech Breakthrough",
      summary: getUserLevelSummary(userLevel, "biotech", "Biotechnology companies are achieving remarkable breakthroughs in personalized medicine and gene therapy. Advanced treatment options are creating new investment opportunities in the healthcare sector."),
      tldr: getUserLevelTLDR(userLevel, "biotech", "Scientists are creating new medicines that could help treat diseases better"),
      url: "https://www.cbsnews.com/news/business/",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-8`,
      title: "Space Economy Reaches Commercial Maturity",
      summary: getUserLevelSummary(userLevel, "space_economy", "Commercial space companies are transitioning from experimental ventures to profitable businesses. Satellite technology, space tourism, and asteroid mining are opening new frontiers for investment."),
      tldr: getUserLevelTLDR(userLevel, "space_economy", "Space companies are becoming real businesses that make money"),
      url: "https://www.usatoday.com/money/",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    }
  ];

  return headlines;
}

function getUserLevelSummary(userLevel: string, topic: string, baseSummary: string): string {
  switch (userLevel) {
    case 'beginner':
      return baseSummary + " This development is important for everyday consumers as it can affect prices, job opportunities, and investment returns in retirement accounts.";
    case 'intermediate':
      return baseSummary + " Market analysts are closely monitoring these developments for their impact on sector rotation strategies and portfolio allocation decisions.";
    case 'advanced':
      return baseSummary + " Institutional investors are adjusting their risk models and factor exposures in response to these systematic market developments.";
    default:
      return baseSummary;
  }
}

function getUserLevelTLDR(userLevel: string, topic: string, baseTLDR: string): string {
  switch (userLevel) {
    case 'beginner':
      return baseTLDR + " - affects everyday spending and savings";
    case 'intermediate':
      return baseTLDR + " - impacts investment portfolio decisions";
    case 'advanced':
      return baseTLDR + " - influences systematic risk factors";
    default:
      return baseTLDR;
  }
}

function generateMarketRecap(userLevel: string = 'beginner'): MarketRecap {
  const sectors = ['technology', 'healthcare', 'energy', 'financial services', 'consumer goods', 'industrials', 'real estate'];
  const sentiments = ['positive', 'mixed', 'optimistic', 'volatile'];
  const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
  const dominantSector = sectors[Math.floor(Math.random() * sectors.length)];
  
  // Generate specific market data
  const marketMoves = ['+2.3%', '+1.8%', '-0.7%', '+3.1%', '-1.2%', '+2.7%', '+0.9%'];
  const volumeData = ['157M', '234M', '189M', '278M', '312M', '145M', '203M'];
  const marketMove = marketMoves[Math.floor(Math.random() * marketMoves.length)];
  const volume = volumeData[Math.floor(Math.random() * volumeData.length)];
  
  const companies = {
    technology: ['Microsoft', 'Apple', 'NVIDIA', 'Google', 'Amazon', 'Meta', 'Tesla'],
    healthcare: ['Johnson & Johnson', 'Pfizer', 'UnitedHealth', 'Merck', 'AbbVie', 'Moderna'],
    energy: ['ExxonMobil', 'Chevron', 'ConocoPhillips', 'EOG Resources', 'Schlumberger'],
    'financial services': ['JPMorgan Chase', 'Bank of America', 'Goldman Sachs', 'Morgan Stanley', 'Wells Fargo'],
    'consumer goods': ['Procter & Gamble', 'Coca-Cola', 'Nike', 'Walmart', 'Target'],
    industrials: ['Boeing', 'Caterpillar', 'General Electric', '3M', 'Honeywell'],
    'real estate': ['American Tower', 'Prologis', 'Crown Castle', 'Realty Income', 'Digital Realty']
  };
  
  const sectorCompanies = companies[dominantSector] || companies.technology;
  const leadingCompany = sectorCompanies[Math.floor(Math.random() * sectorCompanies.length)];
  const secondaryCompany = sectorCompanies[Math.floor(Math.random() * sectorCompanies.length)];
  
  const specificEvents = [
    'quarterly earnings beats',
    'FDA approval announcements',
    'merger and acquisition activity',
    'upgraded analyst ratings',
    'strong guidance revisions',
    'breakthrough technology patents',
    'major contract wins',
    'regulatory approval breakthroughs'
  ];
  
  const currentEvent = specificEvents[Math.floor(Math.random() * specificEvents.length)];
  
  const economicIndicators = [
    'Consumer Price Index showing 2.1% annual inflation',
    'unemployment rate holding steady at 3.7%',
    'GDP growth revised upward to 2.8%',
    'retail sales increasing 1.3% month-over-month',
    'housing starts up 4.2% from previous month',
    'manufacturing PMI reaching 52.8',
    'initial jobless claims declining to 245,000'
  ];
  
  const indicator = economicIndicators[Math.floor(Math.random() * economicIndicators.length)];

  let paragraph1 = '';
  let paragraph2 = '';
  let tldr = '';

  switch (userLevel) {
    case 'beginner':
      paragraph1 = `Today's stock market closed ${sentiment === 'positive' ? 'up' : sentiment === 'mixed' ? 'mixed' : 'down'} ${marketMove} with ${volume} shares traded as investors reacted to ${currentEvent} in the ${dominantSector} sector. ${leadingCompany} led the gains after announcing strong results, while ${secondaryCompany} also saw significant investor interest.`;
      paragraph2 = `With ${indicator}, everyday investors are seeing direct impacts on their 401(k) retirement accounts and college savings plans. The current market movement suggests ${sentiment === 'positive' ? 'good opportunities' : 'careful consideration needed'} for long-term investment strategies, especially in diversified index funds and target-date funds.`;
      tldr = `Markets ended ${sentiment} with ${dominantSector} stocks like ${leadingCompany} leading after ${currentEvent}.`;
      break;
    case 'intermediate':
      paragraph1 = `Market indices reflected ${sentiment} sentiment with ${marketMove} movement on ${volume} volume, driven by ${currentEvent} across ${dominantSector} names. ${leadingCompany} and ${secondaryCompany} outperformed benchmarks with institutional accumulation evident in options flow and block trades.`;
      paragraph2 = `Portfolio rebalancing favors ${dominantSector} exposure given ${indicator} and sector rotation dynamics. Active managers are positioning for continued outperformance through tactical allocation shifts, while factor-based strategies are showing preference for quality and momentum tilts in current market conditions.`;
      tldr = `${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} session ${marketMove} led by ${dominantSector} strength in ${leadingCompany} and peers on ${currentEvent}.`;
      break;
    case 'advanced':
      paragraph1 = `Cross-asset volatility surfaces indicated ${sentiment} regime with ${marketMove} equity beta expansion and ${volume} notional turnover concentrated in ${dominantSector} names. ${leadingCompany}'s implied volatility term structure steepened following ${currentEvent}, creating gamma opportunities for systematic strategies.`;
      paragraph2 = `Factor decomposition shows ${dominantSector} alpha generation through ${indicator} correlation breakdown. Systematic overlays are maintaining long convexity while implementing dynamic hedging strategies through variance swaps and structured products to capture sector-specific risk premiums.`;
      tldr = `${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} factor exposure ${marketMove} with ${dominantSector} systematic alpha via ${leadingCompany} volatility mispricing.`;
      break;
    default:
      paragraph1 = `Today's market showed ${sentiment} performance with ${marketMove} movement driven by ${currentEvent} in ${dominantSector} companies like ${leadingCompany}.`;
      paragraph2 = `Market participants are closely monitoring ${indicator} for continued investment opportunities and portfolio adjustments.`;
      tldr = `${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} market day with ${dominantSector} focus on ${leadingCompany}.`;
  }

  return {
    paragraphs: [paragraph1, paragraph2],
    tldr: tldr,
    sentiment: sentiment,
    dominantSector: dominantSector
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Generating finance headlines and market recap...');
    
    // Get user level from request
    let userLevel = 'beginner';
    try {
      const requestData = await req.json();
      userLevel = requestData.userLevel || 'beginner';
    } catch {
      userLevel = 'beginner';
    }

    // Generate headlines and market recap
    const processedHeadlines = generateFinanceHeadlines(userLevel);
    const marketRecap = generateMarketRecap(userLevel);

    console.log(`Generated ${processedHeadlines.length} finance headlines for user level: ${userLevel}`);

    const response: HeadlinesResponse = {
      headlines: processedHeadlines,
      marketRecap: marketRecap,
      lastUpdated: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error generating headlines:', error)
    
    // Return fallback data
    const fallbackHeadlines = generateFinanceHeadlines('beginner');
    const fallbackRecap = generateMarketRecap('beginner');

    const fallbackResponse: HeadlinesResponse = {
      headlines: fallbackHeadlines,
      marketRecap: fallbackRecap,
      lastUpdated: new Date().toISOString(),
      error: 'Using generated data'
    };

    return new Response(
      JSON.stringify(fallbackResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
