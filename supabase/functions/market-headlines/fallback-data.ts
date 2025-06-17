
import { ProcessedHeadline } from './types.ts';

export function getFallbackHeadlines(): ProcessedHeadline[] {
  return [
    {
      id: 'fallback-1',
      title: "Markets Show Mixed Performance Amid Economic Uncertainty",
      summary: "Stock markets displayed varied performance today as investors weighed economic indicators and corporate earnings reports. Technology stocks led gains while energy sectors faced headwinds from fluctuating commodity prices.",
      tldr: "Mixed market performance with tech gains and energy losses due to economic uncertainty.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Financial News",
      image: null
    },
    {
      id: 'fallback-2',
      title: "Federal Reserve Maintains Cautious Stance on Interest Rates",
      summary: "The Federal Reserve continues its measured approach to monetary policy, keeping interest rates steady while monitoring inflation trends and employment data. Market participants are closely watching for signals about future rate adjustments.",
      tldr: "Fed keeps rates steady while monitoring economic conditions for future policy changes.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Economic Times",
      image: null
    },
    {
      id: 'fallback-3',
      title: "Tech Giants Report Strong Quarterly Earnings",
      summary: "Major technology companies exceeded analyst expectations in their latest quarterly reports, driven by robust demand for cloud services and artificial intelligence solutions. Investors remain optimistic about the sector's growth prospects.",
      tldr: "Tech companies beat earnings expectations with strong AI and cloud service growth.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Tech News",
      image: null
    },
    {
      id: 'fallback-4',
      title: "Oil Prices Fluctuate on Global Supply Concerns",
      summary: "Crude oil prices experienced volatility as geopolitical tensions and supply chain disruptions continue to impact global energy markets. Analysts predict continued price swings as market conditions evolve.",
      tldr: "Oil prices volatile due to geopolitical tensions and supply chain issues.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Energy Report",
      image: null
    },
    {
      id: 'fallback-5',
      title: "Cryptocurrency Market Sees Renewed Interest",
      summary: "Digital assets are gaining traction as institutional investors show increased interest in cryptocurrency investments. Regulatory clarity and technological improvements are driving market confidence.",
      tldr: "Crypto market gains momentum with institutional investor interest and regulatory clarity.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Crypto News",
      image: null
    },
    {
      id: 'fallback-6',
      title: "Retail Sales Data Shows Consumer Resilience",
      summary: "Latest retail sales figures indicate consumer spending remains robust despite economic headwinds. Strong employment numbers and wage growth continue to support household spending patterns.",
      tldr: "Consumer spending stays strong with solid employment and wage growth support.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Retail Monitor",
      image: null
    },
    {
      id: 'fallback-7',
      title: "Manufacturing Sector Adapts to Supply Chain Challenges",
      summary: "Industrial companies are implementing innovative strategies to navigate ongoing supply chain disruptions. Investment in automation and domestic production capabilities is reshaping the manufacturing landscape.",
      tldr: "Manufacturers adapt with automation and domestic production to handle supply chain issues.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Industry Today",
      image: null
    },
    {
      id: 'fallback-8',
      title: "Green Energy Investments Reach Record Levels",
      summary: "Renewable energy projects are attracting unprecedented investment as companies and governments accelerate their transition to sustainable energy sources. Solar and wind capacity additions continue to break records.",
      tldr: "Record green energy investments as renewable capacity additions hit new highs.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Green Finance",
      image: null
    }
  ];
}
