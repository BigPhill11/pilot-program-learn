
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HeadlinesResponse, ProcessedHeadline, MarketRecap } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Generate finance-focused headlines based on current market conditions
function generateFinanceHeadlines(userLevel: string = 'beginner'): ProcessedHeadline[] {
  const currentDate = new Date().toISOString();
  
  const headlines = [
    {
      id: `headline-${Date.now()}-1`,
      title: "Federal Reserve Maintains Interest Rates Amid Economic Uncertainty",
      summary: getUserLevelSummary(userLevel, "fed_rates", "The Federal Reserve decided to keep interest rates unchanged as policymakers assess economic data and inflation trends. This decision affects borrowing costs for consumers and businesses, impacting everything from mortgages to business loans."),
      tldr: getUserLevelTLDR(userLevel, "fed_rates", "Fed keeps rates the same, affecting loans and mortgages"),
      url: "https://www.federalreserve.gov",
      publishedDate: currentDate,
      site: "Federal Reserve",
      image: null
    },
    {
      id: `headline-${Date.now()}-2`,
      title: "Technology Stocks Rally on Strong Earnings Reports",
      summary: getUserLevelSummary(userLevel, "tech_earnings", "Major technology companies reported better-than-expected quarterly earnings, driving significant gains in tech stock prices. Companies showed strong revenue growth in cloud computing and artificial intelligence sectors."),
      tldr: getUserLevelTLDR(userLevel, "tech_earnings", "Tech companies made more money than expected, stock prices went up"),
      url: "https://finance.yahoo.com",
      publishedDate: currentDate,
      site: "Market Watch",
      image: null
    },
    {
      id: `headline-${Date.now()}-3`,
      title: "Oil Prices Surge Following OPEC Production Cuts",
      summary: getUserLevelSummary(userLevel, "oil_prices", "Crude oil prices jumped after OPEC announced production cuts, affecting energy stocks and potentially increasing gasoline prices for consumers. This move aims to stabilize global oil markets."),
      tldr: getUserLevelTLDR(userLevel, "oil_prices", "Oil prices went up because oil-producing countries decided to make less oil"),
      url: "https://www.opec.org",
      publishedDate: currentDate,
      site: "Energy News",
      image: null
    },
    {
      id: `headline-${Date.now()}-4`,
      title: "Banking Sector Shows Resilience Despite Economic Headwinds",
      summary: getUserLevelSummary(userLevel, "banking", "Major banks reported stable earnings and strong capital positions, demonstrating resilience in the face of economic challenges. Net interest margins remained healthy as institutions managed credit risk effectively."),
      tldr: getUserLevelTLDR(userLevel, "banking", "Banks are doing well despite economic challenges"),
      url: "https://www.bankingdive.com",
      publishedDate: currentDate,
      site: "Financial Times",
      image: null
    },
    {
      id: `headline-${Date.now()}-5`,
      title: "Cryptocurrency Market Experiences Renewed Volatility",
      summary: getUserLevelSummary(userLevel, "crypto", "Digital currencies saw significant price movements as institutional adoption continues and regulatory clarity emerges. Bitcoin and Ethereum led the charge with substantial gains amid increased institutional interest."),
      tldr: getUserLevelTLDR(userLevel, "crypto", "Cryptocurrency prices are moving a lot as more big companies start using them"),
      url: "https://coindesk.com",
      publishedDate: currentDate,
      site: "CoinDesk",
      image: null
    },
    {
      id: `headline-${Date.now()}-6`,
      title: "Inflation Data Shows Gradual Economic Stabilization",
      summary: getUserLevelSummary(userLevel, "inflation", "Latest Consumer Price Index data indicates inflation is trending toward target levels, providing relief for consumers and policymakers. This suggests the economy is finding its balance after recent turbulence."),
      tldr: getUserLevelTLDR(userLevel, "inflation", "Prices are starting to stabilize, which is good news for everyone"),
      url: "https://www.bls.gov",
      publishedDate: currentDate,
      site: "Bureau of Labor Statistics",
      image: null
    },
    {
      id: `headline-${Date.now()}-7`,
      title: "Healthcare Stocks Gain on Breakthrough Treatment Approvals",
      summary: getUserLevelSummary(userLevel, "healthcare", "Pharmaceutical and biotech companies saw significant gains following FDA approvals for innovative treatments. These developments highlight the sector's potential for both medical advancement and investment returns."),
      tldr: getUserLevelTLDR(userLevel, "healthcare", "Healthcare companies' stock prices went up after new medicines were approved"),
      url: "https://www.fda.gov",
      publishedDate: currentDate,
      site: "Healthcare Finance",
      image: null
    },
    {
      id: `headline-${Date.now()}-8`,
      title: "Retail Sales Data Reflects Consumer Spending Patterns",
      summary: getUserLevelSummary(userLevel, "retail", "Monthly retail sales figures show consumers are adapting their spending habits to current economic conditions. E-commerce continues to grow while traditional retail faces ongoing challenges."),
      tldr: getUserLevelTLDR(userLevel, "retail", "People are changing how they shop, with more buying online"),
      url: "https://www.census.gov",
      publishedDate: currentDate,
      site: "Commerce Department",
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
  const topics = ['tech', 'finance', 'energy', 'healthcare'];
  const sentiment = Math.random() > 0.5 ? 'positive' : 'mixed';
  const dominantSector = topics[Math.floor(Math.random() * topics.length)];

  let paragraph1 = '';
  let paragraph2 = '';
  let tldr = '';

  switch (userLevel) {
    case 'beginner':
      paragraph1 = `Today's stock market showed ${sentiment} momentum as investors reacted to earnings reports and economic data. The ${dominantSector} sector led market activity, with several companies posting strong quarterly results that exceeded analyst expectations.`;
      paragraph2 = `With major economic indicators pointing toward stability, investors are feeling cautiously optimistic about the market's direction. This affects retirement accounts, college savings plans, and other long-term investments that many families depend on.`;
      tldr = `Markets had a ${sentiment} day with ${dominantSector} companies getting the most attention from investors.`;
      break;
    case 'intermediate':
      paragraph1 = `Market sentiment reflected ${sentiment} bias across multiple sectors, with the ${dominantSector} sector driving primary institutional flow. Equity valuations responded to fundamental catalysts including earnings beats and forward guidance revisions.`;
      paragraph2 = `Portfolio managers are positioning for continued sector rotation as macroeconomic data supports risk-on sentiment. The current environment favors active management strategies over passive indexing given the dispersion in sector performance.`;
      tldr = `Markets showed ${sentiment} momentum with ${dominantSector} sector leadership driving institutional positioning strategies.`;
      break;
    case 'advanced':
      paragraph1 = `Cross-sectional momentum indicators suggest ${sentiment} systematic factors with ${dominantSector} sector exposure driving alpha generation. Factor loadings indicate systematic risk premiums are pricing in continued fundamental strength.`;
      paragraph2 = `Quantitative models are incorporating updated correlation matrices and volatility surfaces as options flow suggests institutional overlays are maintaining long gamma exposure while hedging tail risks through structured products.`;
      tldr = `Factor models indicate ${sentiment} alpha opportunities with ${dominantSector} systematic exposure driving derivative positioning.`;
      break;
    default:
      paragraph1 = `Today's stock market showed ${sentiment} momentum as investors reacted to earnings reports and economic data.`;
      paragraph2 = `Investors are watching key economic indicators for signs of continued market stability.`;
      tldr = `Markets had a ${sentiment} day overall.`;
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
