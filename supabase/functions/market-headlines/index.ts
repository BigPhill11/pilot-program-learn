
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HeadlinesResponse, ProcessedHeadline, MarketRecap } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Cache for storing generated content
let cachedContent: HeadlinesResponse | null = null;
let lastUpdateTime: Date | null = null;

const shouldUpdateContent = (): boolean => {
  if (!lastUpdateTime || !cachedContent) return true;
  
  const now = new Date();
  const currentHour = now.getHours();
  const lastUpdateHour = lastUpdateTime.getHours();
  const lastUpdateDate = lastUpdateTime.toDateString();
  const currentDate = now.toDateString();
  
  // If it's a new day, update
  if (lastUpdateDate !== currentDate) return true;
  
  // Update at 9 AM and 5 PM (17:00)
  const updateHours = [9, 17];
  
  // Check if we've crossed an update hour since last update
  for (const hour of updateHours) {
    if (currentHour >= hour && lastUpdateHour < hour) {
      return true;
    }
  }
  
  return false;
};

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
      // Simplified explanation without jargon - always 3 sentences
      const beginnerExplanations = {
        ai_finance: "Banks are using computer programs to help them work better and keep money safe. These smart computer systems can spot fraud and help banks make better decisions. This makes banking safer and easier for everyone.",
        ev_market: "Electric cars are becoming more popular, which is good for companies that make them. More people want cars that don't use gas because they're better for the environment. This means electric car companies are selling more cars and making more money.",
        supply_chain: "Companies that make products are getting better at getting the materials they need. They're finding new ways to get supplies closer to home so they don't have to wait as long. This helps them make products faster and cheaper.",
        cybersecurity: "Businesses need better computer protection, so security companies are growing. More people work from home now, which means companies need stronger computer safety. Security companies help protect important information from bad people online.",
        esg_investing: "People want to invest in companies that are good for the environment and society. They care about how companies treat workers and whether they help or hurt the planet. Companies that do good things often make good investments too.",
        digital_payments: "More people are paying with their phones instead of cash. Apps like Venmo and Apple Pay make it easy to send money without needing paper bills. This is changing how banks and payment companies do business.",
        biotech: "Scientists are making new medicines to help people feel better. They're using new technology to create treatments for diseases that were hard to cure before. These discoveries help people live longer, healthier lives.",
        space_economy: "Space companies are starting to make money from satellite services and space travel. They're launching satellites that help with internet and GPS services. Some companies are even planning to take regular people to space for vacation."
      };
      return beginnerExplanations[topic] || baseSummary;
    case 'intermediate':
      // Enhanced 3-sentence summaries with more technical detail
      const intermediateExplanations = {
        ai_finance: "Financial institutions are rapidly implementing artificial intelligence solutions across risk management, fraud detection, and algorithmic trading operations. These AI systems utilize machine learning models to analyze vast datasets and identify patterns that enhance decision-making accuracy and operational efficiency. The integration of AI technology is fundamentally reshaping how financial services firms approach customer service, compliance monitoring, and investment strategies.",
        ev_market: "Electric vehicle manufacturers are experiencing unprecedented growth as global adoption accelerates driven by government incentives and advancing battery technology. Traditional automotive companies are pivoting their production lines while new EV startups are capturing significant market share in the sustainable transportation sector. This transition is creating substantial investment opportunities in the broader clean energy ecosystem including charging infrastructure and renewable energy companies.",
        supply_chain: "Manufacturing companies are strengthening their supply chain resilience through diversification strategies and nearshoring initiatives to reduce disruption risks. These operational improvements are resulting in better profit margins and more predictable revenue streams for companies that have invested in supply chain modernization. The shift toward regional supply networks is creating new investment themes in industrial real estate and logistics technology platforms.",
        cybersecurity: "Cybersecurity companies are experiencing record demand as enterprises increase their digital security spending in response to evolving threat landscapes. The accelerated adoption of remote work and cloud computing has expanded attack surfaces, driving sustained investment in security infrastructure and services. This sector growth is supported by increasing regulatory requirements and the rising cost of data breaches across all industries.",
        esg_investing: "Environmental, Social, and Governance investing continues to attract significant capital flows as institutional investors integrate sustainability criteria into their investment processes. Companies with strong ESG ratings are demonstrating better risk-adjusted returns and accessing capital at more favorable terms than their traditional counterparts. This investment approach is becoming mainstream as asset managers respond to client demand for sustainable investment solutions.",
        digital_payments: "Digital payment platforms are revolutionizing the financial landscape through innovative fintech solutions that enable seamless cashless transactions across multiple channels. Mobile payment adoption and cryptocurrency integration are creating new revenue models for financial technology companies and traditional payment processors. This digital transformation is driving consolidation in the payments industry while creating opportunities for blockchain and financial infrastructure companies.",
        biotech: "Biotechnology companies are achieving breakthrough advances in personalized medicine and gene therapy that are creating new treatment paradigms for previously incurable diseases. These scientific innovations are attracting significant venture capital and pharmaceutical partnership investments as companies advance through clinical trial phases. The convergence of biotechnology with artificial intelligence and data analytics is accelerating drug discovery timelines and improving success rates.",
        space_economy: "Commercial space companies are transitioning from experimental ventures to sustainable business models through satellite services, space tourism, and asteroid mining opportunities. The privatization of space exploration is creating new investment categories in aerospace technology, satellite communications, and space-based manufacturing capabilities. Government contracts and commercial partnerships are providing revenue visibility for companies developing next-generation space technologies."
      };
      return intermediateExplanations[topic] || (baseSummary + " Market analysts are closely monitoring these developments for their impact on sector rotation strategies and portfolio allocation decisions. Institutional demand continues to drive price discovery in these emerging growth narratives.");
    case 'advanced':
      // Professional 3-sentence summaries with sophisticated financial language
      const advancedExplanations = {
        ai_finance: "Artificial intelligence adoption in financial services is driving systematic alpha generation through enhanced quantitative modeling, alternative data integration, and real-time risk management capabilities. The technology is enabling new factor discovery methodologies and cross-asset correlation analysis that are reshaping portfolio construction frameworks and systematic trading strategies. AI-driven operational efficiency gains are compressing expense ratios while expanding addressable markets for asset managers and investment banks.",
        ev_market: "The electric vehicle sector is experiencing regime change dynamics as traditional automotive OEMs face margin compression while pure-play EV manufacturers demonstrate scalable unit economics and vertical integration advantages. This transition is creating systematic rotation opportunities from legacy automotive exposure toward clean energy infrastructure, battery technology, and autonomous driving platforms. The sector's capital allocation patterns suggest sustained outperformance potential driven by regulatory tailwinds and declining battery cost curves.",
        supply_chain: "Supply chain diversification strategies are creating systematic factor exposure shifts as companies prioritize operational resilience over cost optimization, fundamentally altering working capital dynamics and asset turnover ratios. The nearshoring trend is generating systematic alpha opportunities in industrial real estate, logistics automation, and regional manufacturing capabilities that benefit from shortened supply chains. These structural changes are creating new risk premiums in global trade-sensitive sectors while supporting domestic industrial capacity utilization.",
        cybersecurity: "Cybersecurity investment themes are demonstrating systematic outperformance characteristics driven by inelastic demand curves and high switching costs that create sustainable competitive moats for market leaders. The sector's recurring revenue models and expanding addressable markets are generating consistent earnings growth that supports premium valuations across the cybersecurity ecosystem. Systematic exposure to this thematic trend provides portfolio diversification benefits given its low correlation with traditional cyclical factors.",
        esg_investing: "ESG integration is becoming a systematic factor in asset pricing as institutional mandates and regulatory frameworks create persistent demand imbalances that favor companies with superior sustainability metrics. This systematic preference is generating measurable alpha in factor models while creating systematic risks for companies failing to meet evolving ESG standards. The trend represents a fundamental shift in cost of capital dynamics that benefits ESG leaders through improved access to institutional funding sources.",
        digital_payments: "Digital payment platforms are exhibiting network effect characteristics that create systematic moats and enable sustainable revenue growth through expanding transaction volumes and cross-selling opportunities. The fintech ecosystem's capital-light business models are generating superior return on equity metrics while enabling rapid geographic expansion and product diversification strategies. This secular growth trend is creating systematic exposure opportunities in financial technology, blockchain infrastructure, and digital currency platforms.",
        biotech: "Biotechnology innovation cycles are creating systematic alpha opportunities through breakthrough therapeutic modalities that command premium pricing power and expand addressable patient populations. The sector's clinical trial progression dynamics and regulatory approval pathways generate distinct volatility patterns that create systematic factor exposures for specialized healthcare investment strategies. Advances in precision medicine and AI-driven drug discovery are accelerating development timelines while improving commercial success probabilities.",
        space_economy: "The commercial space sector is demonstrating systematic value creation through expanding addressable markets in satellite communications, Earth observation, and space-based manufacturing that justify current valuation premiums. Government contract visibility and commercial partnership agreements are providing revenue stability that supports systematic exposure to this emerging thematic investment opportunity. The sector's capital intensity and technological barriers create natural competitive moats that benefit first-mover advantages in orbital infrastructure development."
      };
      return advancedExplanations[topic] || (baseSummary + " Institutional investors are adjusting their risk models and factor exposures in response to these systematic market developments. Cross-asset correlations suggest regime change implications for alternative risk premiums and factor timing strategies.");
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
      paragraph1 = `Today the stock market ${sentiment === 'positive' ? 'went up' : sentiment === 'mixed' ? 'was mixed' : 'went down'}. Companies in the ${dominantSector} sector did well, especially ${leadingCompany}. This means people who own stocks in these companies saw their investments gain value.`;
      paragraph2 = `When the market does well, it's good news for people's retirement savings and investment accounts. These market changes affect everyone's long-term savings, so it's important to stay invested in a variety of different stocks and funds.`;
      tldr = `The market was ${sentiment} today, with ${dominantSector} companies like ${leadingCompany} doing well.`;
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
    // Get user level from request
    let userLevel = 'beginner';
    try {
      const requestData = await req.json();
      userLevel = requestData.userLevel || 'beginner';
    } catch {
      userLevel = 'beginner';
    }

    // Check if we should use cached content
    if (!shouldUpdateContent() && cachedContent) {
      console.log('Using cached content - no update needed');
      return new Response(
        JSON.stringify(cachedContent),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    console.log('Generating fresh finance headlines and market recap...');
    
    // Generate headlines and market recap
    const processedHeadlines = generateFinanceHeadlines(userLevel);
    const marketRecap = generateMarketRecap(userLevel);

    console.log(`Generated ${processedHeadlines.length} finance headlines for user level: ${userLevel}`);

    const response: HeadlinesResponse = {
      headlines: processedHeadlines,
      marketRecap: marketRecap,
      lastUpdated: new Date().toISOString()
    };

    // Cache the new content
    cachedContent = response;
    lastUpdateTime = new Date();

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
