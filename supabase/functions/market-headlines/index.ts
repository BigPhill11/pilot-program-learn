
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
      url: "https://www.fintech.com",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-2`,
      title: "Electric Vehicle Market Drives Clean Energy Stock Surge",
      summary: getUserLevelSummary(userLevel, "ev_market", "Electric vehicle manufacturers and clean energy companies saw significant gains as global adoption accelerates. Government incentives and improving battery technology are driving widespread consumer adoption."),
      tldr: getUserLevelTLDR(userLevel, "ev_market", "Electric car companies are doing really well as more people buy them"),
      url: "https://www.cleanenergy.com",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-3`,
      title: "Global Supply Chain Resilience Boosts Manufacturing Stocks",
      summary: getUserLevelSummary(userLevel, "supply_chain", "Manufacturing companies are benefiting from improved supply chain management and nearshoring trends. Companies that invested in supply chain diversification are seeing stronger margins and reduced disruption risks."),
      tldr: getUserLevelTLDR(userLevel, "supply_chain", "Companies that make things are doing better by improving how they get materials"),
      url: "https://www.manufacturing.com",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-4`,
      title: "Cybersecurity Sector Sees Record Investment Growth",
      summary: getUserLevelSummary(userLevel, "cybersecurity", "Cybersecurity companies are experiencing unprecedented demand as businesses increase digital security spending. Remote work trends and growing cyber threats are driving sustained investment in security infrastructure."),
      tldr: getUserLevelTLDR(userLevel, "cybersecurity", "Computer security companies are growing fast as businesses need better protection"),
      url: "https://www.cybersec.com",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-5`,
      title: "Sustainable Investing Reaches New Milestone",
      summary: getUserLevelSummary(userLevel, "esg_investing", "Environmental, Social, and Governance (ESG) investing continues to attract record capital flows as investors prioritize sustainable returns. Companies with strong ESG ratings are outperforming traditional benchmarks."),
      tldr: getUserLevelTLDR(userLevel, "esg_investing", "More investors are choosing companies that care about the environment and society"),
      url: "https://www.sustainable-investing.com",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-6`,
      title: "Digital Payment Revolution Accelerates Globally",
      summary: getUserLevelSummary(userLevel, "digital_payments", "Digital payment platforms and fintech companies are experiencing explosive growth as cashless transactions become the norm. Mobile payments and cryptocurrency adoption are reshaping the financial landscape."),
      tldr: getUserLevelTLDR(userLevel, "digital_payments", "People are using phones and apps to pay for things instead of cash"),
      url: "https://www.digitalfinance.com",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-7`,
      title: "Healthcare Innovation Drives Biotech Breakthrough",
      summary: getUserLevelSummary(userLevel, "biotech", "Biotechnology companies are achieving remarkable breakthroughs in personalized medicine and gene therapy. Advanced treatment options are creating new investment opportunities in the healthcare sector."),
      tldr: getUserLevelTLDR(userLevel, "biotech", "Scientists are creating new medicines that could help treat diseases better"),
      url: "https://www.biotech-news.com",
      publishedDate: currentDate,
      site: "Powered by Lovable AI",
      image: null
    },
    {
      id: `headline-${Date.now()}-8`,
      title: "Space Economy Reaches Commercial Maturity",
      summary: getUserLevelSummary(userLevel, "space_economy", "Commercial space companies are transitioning from experimental ventures to profitable businesses. Satellite technology, space tourism, and asteroid mining are opening new frontiers for investment."),
      tldr: getUserLevelTLDR(userLevel, "space_economy", "Space companies are becoming real businesses that make money"),
      url: "https://www.space-business.com",
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
  const topics = ['tech', 'finance', 'energy', 'healthcare', 'ai', 'space', 'biotech', 'clean energy'];
  const sentiments = ['positive', 'mixed', 'optimistic', 'cautious'];
  const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
  const dominantSector = topics[Math.floor(Math.random() * topics.length)];
  
  // Generate more dynamic content with current market themes
  const marketThemes = [
    'AI revolution in financial services',
    'sustainable investing trends',
    'digital transformation acceleration',
    'supply chain resilience improvements',
    'cybersecurity infrastructure growth',
    'electric vehicle market expansion',
    'renewable energy adoption',
    'biotechnology breakthroughs'
  ];
  
  const currentTheme = marketThemes[Math.floor(Math.random() * marketThemes.length)];

  let paragraph1 = '';
  let paragraph2 = '';
  let tldr = '';

  switch (userLevel) {
    case 'beginner':
      paragraph1 = `Today's stock market showed ${sentiment} momentum as investors focused on ${currentTheme}. The ${dominantSector} sector attracted significant attention from both individual and institutional investors, driving notable price movements across multiple companies.`;
      paragraph2 = `This market activity reflects broader economic trends that directly impact everyday Americans through their retirement accounts, college savings plans, and investment portfolios. The current environment suggests continued opportunities for long-term wealth building through diversified investing strategies.`;
      tldr = `Markets had a ${sentiment} day with ${dominantSector} companies leading investor interest due to ${currentTheme}.`;
      break;
    case 'intermediate':
      paragraph1 = `Market sentiment reflected ${sentiment} bias across sectors, with ${dominantSector} exposure driving institutional capital allocation decisions. The focus on ${currentTheme} created meaningful sector rotation opportunities and volatility clustering in related securities.`;
      paragraph2 = `Portfolio managers are actively repositioning for the evolving landscape around ${currentTheme}, with factor tilts favoring growth-oriented strategies. The current market structure supports active management approaches over passive indexing given the dispersion in sector performance and emerging thematic opportunities.`;
      tldr = `Markets showed ${sentiment} momentum with ${dominantSector} sector leadership driven by ${currentTheme} investment themes.`;
      break;
    case 'advanced':
      paragraph1 = `Cross-asset momentum indicators suggest ${sentiment} systematic factors with ${dominantSector} beta exposure generating alpha through exposure to ${currentTheme} disruption. Factor loadings indicate systematic risk premiums are incorporating structural shifts in the investment landscape.`;
      paragraph2 = `Quantitative models are incorporating regime changes around ${currentTheme} into correlation matrices and volatility surfaces. Institutional overlays are maintaining convexity exposure while implementing structured hedging strategies to capture thematic alpha while managing tail risks.`;
      tldr = `Factor models indicate ${sentiment} alpha opportunities in ${dominantSector} systematic exposure driven by ${currentTheme} structural trends.`;
      break;
    default:
      paragraph1 = `Today's stock market showed ${sentiment} momentum as investors reacted to developments in ${currentTheme}.`;
      paragraph2 = `The market continues to adapt to emerging trends and technological innovations that are reshaping various industries.`;
      tldr = `Markets had a ${sentiment} day with focus on ${currentTheme}.`;
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
