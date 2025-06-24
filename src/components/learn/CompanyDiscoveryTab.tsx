import React, { useState } from 'react';
import CompanySwipeCard, { CompanyProfile } from './CompanySwipeCard';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const initialCompanies: CompanyProfile[] = [
  {
    id: "AAPL",
    name: "Apple Inc.",
    ticker: "AAPL",
    industry: "Technology",
    professional: {
      overview: "Apple is a global tech leader known for its iconic hardware like the iPhone and Mac, and its rapidly growing services division. It maintains a powerful brand and a loyal customer base.",
      kpis: [
        { title: "iPhone Sales", value: "Cornerstone of revenue" },
        { title: "Services Growth", value: "High-margin, key focus" },
        { title: "Active Devices", value: "Over 2.2 billion" },
      ],
      financials: [
        { title: "Gross Margin", value: "Approx. 45%" },
        { title: "R&D Spending", value: "Investing in future tech" },
        { title: "Cash on Hand", value: "Massive reserves" },
      ],
    },
    dating: {
      marketSentiment: "Most people are either obsessed with me or know someone who is. I'm kind of a big deal and my products are everywhere. The general vibe is super positive, but some think I'm too controlling with my 'walled garden'.",
      analystSentiment: "Wall Street loves me. Most analysts are saying 'Buy! Buy! Buy!', thinking my push into services and new gadgets like the Vision Pro will keep the money rolling in. They see me as a safe, long-term bet.",
      historicalPerformance: "My track record is legendary. I've basically been on a rocket ship for the last 20 years, turning early believers into millionaires. There are bumps, sure, but the trend has been straight up. I'm what you'd call a 'keeper'.",
    },
    marketCap: "$2.8T",
    revenueTTM: "$383B",
    peRatio: "29.5",
    headquarters: "Cupertino, CA"
  },
  {
    id: "MSFT",
    name: "Microsoft Corp.",
    ticker: "MSFT",
    industry: "Technology",
    professional: {
      overview: "Microsoft is a diversified software behemoth, leading the charge in enterprise solutions and cloud computing with its Azure platform. It has successfully pivoted to a subscription-based model, ensuring strong recurring revenue.",
      kpis: [
        { title: "Azure Cloud Growth", value: "Major revenue driver" },
        { title: "Office 365 Subscribers", value: "Huge commercial base" },
        { title: "Gaming Revenue", value: "Xbox & Game Pass growth" },
      ],
      financials: [
        { title: "Cloud Revenue", value: "Exceeds $100B annually" },
        { title: "Operating Margin", value: "Strong and consistent" },
        { title: "LinkedIn Revenue", value: "Steady B2B income" },
      ],
    },
    dating: {
      marketSentiment: "I used to be the 'boring but reliable' type, but now I'm seen as a cool, smart powerhouse, especially with my big moves in AI. Businesses can't live without me, and gamers love my fun side.",
      analystSentiment: "Analysts are basically my fan club. They're all hyped about Azure eating up the cloud market and my AI partnership with OpenAI. They think I have a clear path to keep growing for years to come.",
      historicalPerformance: "Let's just say I had a major glow-up. After a bit of a quiet spell, I've come roaring back over the last decade. My stock chart is a thing of beauty. I've proven I can change and come out even stronger.",
    },
    marketCap: "$3.1T",
    revenueTTM: "$227B",
    peRatio: "38.0",
    headquarters: "Redmond, WA"
  },
  {
    id: "GOOGL",
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    industry: "Technology",
    professional: {
      overview: "Alphabet, Google's parent company, dominates the digital advertising market through its Search and YouTube platforms. It's also a major player in cloud computing and is investing heavily in 'Other Bets' like AI and self-driving cars.",
      kpis: [
        { title: "Ad Revenue Growth", value: "Core of the business" },
        { title: "Google Cloud Performance", value: "Key growth area" },
        { title: "YouTube Watch Hours", value: "Monetization engine" },
      ],
      financials: [
        { title: "Traffic Acquisition Costs", value: "A key expense to watch" },
        { title: "Operating Income", value: "Extremely high profitability" },
        { title: "'Other Bets' Losses", value: "Investing in moonshots" },
      ],
    },
    dating: {
      marketSentiment: "Everyone uses my stuff, so the brand recognition is off the charts. People rely on me for everything. The only drama is when politicians get mad about me being so big and powerful.",
      analystSentiment: "Analysts think my main search business is a cash-printing machine. They're excited about my AI smarts (Gemini) and hope my cloud business can catch up to the competition. They say I'm a solid choice, but to watch out for lawsuits.",
      historicalPerformance: "I've been a straight-A student since I was young. My stock has been a massive winner over the long run. I'm the kind of reliable performer you can bring home to meet your parents, even if I have some weird, expensive hobbies on the side.",
    },
    marketCap: "$2.2T",
    revenueTTM: "$307B",
    peRatio: "27.1",
    headquarters: "Mountain View, CA"
  },
  {
    id: "AMZN",
    name: "Amazon.com, Inc.",
    ticker: "AMZN",
    industry: "E-commerce & Cloud Computing",
    professional: {
      overview: "Amazon is a titan of e-commerce and cloud computing. Its AWS division is the market leader and highly profitable, funding the company's vast logistics network and ventures into new areas like advertising and healthcare.",
      kpis: [
        { title: "AWS Revenue Growth", value: "The profit engine" },
        { title: "Online Store Sales", value: "Massive but lower margin" },
        { title: "Prime Subscribers", value: "Sticky customer base" },
      ],
      financials: [
        { title: "Operating Cash Flow", value: "A key metric of health" },
        { title: "Capital Expenditures", value: "High spending on infrastructure" },
        { title: "Advertising Revenue", value: "Fast-growing segment" },
      ],
    },
    dating: {
      marketSentiment: "Love it or hate it, almost everyone uses me. People love the convenience, even if they sometimes feel guilty about it. I'm basically the utility player of modern life.",
      analystSentiment: "The experts see me as two amazing companies in one. They drool over the profits from my cloud business (AWS) and see my ad business as a hidden gem. They believe I'm built for world domination, as long as I can handle the costs.",
      historicalPerformance: "My life story is insane. I started in a garage and now I'm... well, I'm Amazon. My stock has had some wild rides, but if you stuck with me, you've done incredibly well. I'm all about that long-term growth.",
    },
    marketCap: "$1.9T",
    revenueTTM: "$574B",
    peRatio: "52.3",
    headquarters: "Seattle, WA"
  },
  {
    id: "TSLA",
    name: "Tesla, Inc.",
    ticker: "TSLA",
    industry: "Automotive & Energy",
    professional: {
      overview: "Tesla is a disruptive force in the automotive industry, leading the transition to electric vehicles. Beyond cars, it has ambitions in energy storage, artificial intelligence (Full Self-Driving), and robotics.",
      kpis: [
        { title: "Vehicle Deliveries", value: "The most-watched number" },
        { title: "Automotive Gross Margin", value: "Indicates profitability" },
        { title: "Energy Storage Deployments", value: "Growing side business" },
      ],
      financials: [
        { title: "Free Cash Flow", value: "Shows financial sustainability" },
        { title: "Regulatory Credits Sales", value: "Historically important income" },
        { title: "R&D on AI/Robotics", value: "Betting on the future" },
      ],
    },
    dating: {
      marketSentiment: "I'm the most talked-about name out there. You either think I'm the future of everything or that I'm totally full of it. There's no in-between. My fans are ride-or-die.",
      analystSentiment: "The analysts are totally split on me. Some think I'm going to be the biggest company in the world, thanks to AI and robots. Others think I'm just a car company that's way too expensive. It's a total soap opera.",
      historicalPerformance: "My history is a rollercoaster. I've made some people insanely rich and given others heart attacks. My stock chart looks like a seismograph during an earthquake. If you're into high-stakes excitement, I'm your match.",
    },
    marketCap: "$580B",
    revenueTTM: "$96B",
    peRatio: "45.0",
    headquarters: "Austin, TX"
  },
  {
    id: "NVDA",
    name: "NVIDIA Corp.",
    ticker: "NVDA",
    industry: "Technology",
    professional: {
      overview: "NVIDIA has transformed from a gaming graphics company into the backbone of the AI revolution. Their chips power everything from data centers to autonomous vehicles, making them essential for modern computing.",
      kpis: [
        { title: "Data Center Revenue", value: "Explosive AI-driven growth" },
        { title: "Gaming GPU Sales", value: "Core legacy business" },
        { title: "AI Chip Market Share", value: "Dominant position" },
      ],
      financials: [
        { title: "Gross Margin", value: "Exceptionally high 70%+" },
        { title: "R&D Investment", value: "Heavy AI research focus" },
        { title: "Cash Generation", value: "Massive free cash flow" },
      ],
    },
    dating: {
      marketSentiment: "I'm the hottest thing in tech right now. Everyone wants a piece of me because I'm basically powering the AI revolution. People see me as the picks-and-shovels play for the gold rush of our time.",
      analystSentiment: "Wall Street can't get enough of me. Analysts keep raising their price targets because my AI business is just exploding. They think I'm still in the early innings of a massive growth story.",
      historicalPerformance: "Talk about a glow-up! I went from being just a gaming chip company to the star of the AI show. My stock went absolutely parabolic - I've been one of the best performers in the entire market.",
    },
    marketCap: "$2.9T",
    revenueTTM: "$79B",
    peRatio: "66.0",
    headquarters: "Santa Clara, CA"
  },
  {
    id: "META",
    name: "Meta Platforms Inc.",
    ticker: "META",
    industry: "Technology",
    professional: {
      overview: "Meta owns the world's largest social media platforms including Facebook, Instagram, and WhatsApp. The company is heavily investing in virtual reality and the metaverse while maintaining its advertising dominance.",
      kpis: [
        { title: "Monthly Active Users", value: "3.9B across all apps" },
        { title: "Ad Revenue per User", value: "Key monetization metric" },
        { title: "Metaverse Investment", value: "Billions in VR/AR spending" },
      ],
      financials: [
        { title: "Advertising Revenue", value: "98% of total revenue" },
        { title: "Reality Labs Losses", value: "Heavy metaverse investment" },
        { title: "Operating Margin", value: "Strong core business profitability" },
      ],
    },
    dating: {
      marketSentiment: "I'm complicated. People love my apps but sometimes hate my company. Privacy issues make some people nervous, but let's be real - they still can't quit me. I'm working on my image though!",
      analystSentiment: "Analysts are cautiously optimistic about me. They love my cash flow from ads but worry about my expensive metaverse bets. Most think I'm undervalued if I can prove the VR thing works out.",
      historicalPerformance: "I've had my ups and downs. The whole metaverse pivot was rough on my stock, but I've been bouncing back strong. When I focus on efficiency and my core business, investors remember why they loved me in the first place.",
    },
    marketCap: "$1.5T",
    revenueTTM: "$134B",
    peRatio: "25.8",
    headquarters: "Menlo Park, CA"
  },
  {
    id: "NFLX",
    name: "Netflix Inc.",
    ticker: "NFLX",
    industry: "Entertainment",
    professional: {
      overview: "Netflix revolutionized entertainment by pioneering streaming video and creating a global content empire. The company invests billions in original programming while expanding into gaming and international markets.",
      kpis: [
        { title: "Global Subscribers", value: "260M+ worldwide" },
        { title: "Content Spending", value: "$15B+ annually" },
        { title: "International Growth", value: "Key expansion metric" },
      ],
      financials: [
        { title: "Revenue Growth", value: "Subscription-based recurring" },
        { title: "Free Cash Flow", value: "Recently turned positive" },
        { title: "Content Amortization", value: "Major expense category" },
      ],
    },
    dating: {
      marketSentiment: "People are obsessed with my shows but sometimes complain about my prices. I'm the OG of streaming, but now everyone's trying to copy my homework. Still, when people want to 'Netflix and chill,' they mean me specifically.",
      analystSentiment: "Analysts think I'm mature now - less explosive growth but more stability. They like my international expansion and recent profitability improvements. Some worry about the streaming wars, but most see me as the leader.",
      historicalPerformance: "I was the darling of growth investors for years, then hit a rough patch when competition heated up. But I've proven I can adapt and grow sustainably. My comeback story has been pretty impressive.",
    },
    marketCap: "$240B",
    revenueTTM: "$33B",
    peRatio: "42.1",
    headquarters: "Los Gatos, CA"
  },
  {
    id: "DIS",
    name: "The Walt Disney Co.",
    ticker: "DIS",
    industry: "Entertainment",
    professional: {
      overview: "Disney is an entertainment conglomerate owning iconic brands like Marvel, Star Wars, and Pixar. The company operates theme parks, streaming services, and creates content across multiple platforms globally.",
      kpis: [
        { title: "Disney+ Subscribers", value: "Streaming growth focus" },
        { title: "Park Attendance", value: "High-margin revenue" },
        { title: "Content Library Value", value: "Massive IP portfolio" },
      ],
      financials: [
        { title: "Streaming Losses", value: "Investment phase" },
        { title: "Parks Operating Income", value: "Highly profitable segment" },
        { title: "Content Production Costs", value: "Major expense driver" },
      ],
    },
    dating: {
      marketSentiment: "I'm basically everyone's childhood, so there's a lot of nostalgia and love for my brand. People want me to succeed but get frustrated when I stumble. I'm seen as wholesome and family-friendly, which is my superpower.",
      analystSentiment: "Analysts love my IP but worry about my execution. They're cautiously optimistic about my streaming turnaround and think my parks business is a cash cow. Most see me as a long-term winner despite short-term challenges.",
      historicalPerformance: "I've been a bit of a rollercoaster lately. The pandemic hit my parks hard, and streaming has been expensive. But I'm Disney - I've been creating magic for 100 years, and I'm not stopping now.",
    },
    marketCap: "$175B",
    revenueTTM: "$82B",
    peRatio: "39.2",
    headquarters: "Burbank, CA"
  },
  {
    id: "BRK.A",
    name: "Berkshire Hathaway Inc.",
    ticker: "BRK.A",
    industry: "Diversified Holdings",
    professional: {
      overview: "Berkshire Hathaway is Warren Buffett's investment conglomerate owning dozens of businesses and massive stock positions. Known for long-term value investing and strong management culture.",
      kpis: [
        { title: "Book Value Growth", value: "Key performance metric" },
        { title: "Operating Earnings", value: "Business performance indicator" },
        { title: "Cash Holdings", value: "$150B+ for opportunities" },
      ],
      financials: [
        { title: "Investment Portfolio", value: "$300B+ in stocks" },
        { title: "Insurance Float", value: "Low-cost capital source" },
        { title: "Operating Business Revenue", value: "Diversified income streams" },
      ],
    },
    dating: {
      marketSentiment: "I'm the wise grandfather of investing. People respect my track record and conservative approach. When markets get scary, investors come running to me for safety. I'm old-fashioned but reliable.",
      analystSentiment: "Analysts respect my historical performance but worry about life after Buffett. They like my diversified business model and massive cash pile. Most see me as a defensive play with upside potential.",
      historicalPerformance: "I've been compounding wealth for decades. My long-term returns are legendary, even if I sometimes lag in bull markets. I'm proof that slow and steady wins the race in investing.",
    },
    marketCap: "$900B",
    revenueTTM: "$364B",
    peRatio: "14.8",
    headquarters: "Omaha, NE"
  },
  {
    id: "JPM",
    name: "JPMorgan Chase & Co.",
    ticker: "JPM",
    industry: "Financial Services",
    professional: {
      overview: "JPMorgan Chase is America's largest bank by assets, offering consumer banking, investment banking, and asset management services. Known for strong risk management and consistent profitability.",
      kpis: [
        { title: "Return on Equity", value: "Exceptional profitability metric" },
        { title: "Net Interest Income", value: "Core banking revenue" },
        { title: "Investment Banking Fees", value: "High-margin business" },
      ],
      financials: [
        { title: "Loan Loss Provisions", value: "Risk management indicator" },
        { title: "Efficiency Ratio", value: "Cost management metric" },
        { title: "Tier 1 Capital Ratio", value: "Strong regulatory position" },
      ],
    },
    dating: {
      marketSentiment: "I'm the gold standard of big banks. People trust me to handle their money because I've proven I can navigate any crisis. Sure, I'm not flashy, but I'm dependable when times get tough.",
      analystSentiment: "Analysts love my consistent performance and strong leadership under Jamie Dimon. They think I'm well-positioned for rising rates and see me as the best-run big bank. I'm their go-to financial pick.",
      historicalPerformance: "I've weathered every financial storm and come out stronger. During the 2008 crisis, I was one of the survivors. My track record of steady growth and dividend increases speaks for itself.",
    },
    marketCap: "$650B",
    revenueTTM: "$158B",
    peRatio: "12.5",
    headquarters: "New York, NY"
  },
  {
    id: "V",
    name: "Visa Inc.",
    ticker: "V",
    industry: "Financial Technology",
    professional: {
      overview: "Visa operates the world's largest electronic payments network, facilitating transactions between consumers, merchants, and financial institutions. The company benefits from the global shift to digital payments.",
      kpis: [
        { title: "Payment Volume Growth", value: "Transaction volume increases" },
        { title: "Cross-border Transactions", value: "High-margin international fees" },
        { title: "Network Processing", value: "Billions of transactions daily" },
      ],
      financials: [
        { title: "Net Revenue Growth", value: "Consistent double-digit growth" },
        { title: "Operating Margin", value: "Exceptionally high 60%+" },
        { title: "Free Cash Flow", value: "Asset-light business model" },
      ],
    },
    dating: {
      marketSentiment: "I'm everywhere you want to be! Seriously, I touch almost every purchase people make. I'm seen as essential infrastructure for the modern economy. People love my reliability and global reach.",
      analystSentiment: "Analysts adore my business model - I'm like a toll booth on the highway of commerce. They love my high margins, recurring revenue, and growth prospects as the world goes cashless. I'm a favorite pick for quality growth.",
      historicalPerformance: "I've been a phenomenal long-term performer. My stock has consistently outperformed the market as digital payments exploded. I'm proof that sometimes the best businesses are the ones that just facilitate other people's transactions.",
    },
    marketCap: "$570B",
    revenueTTM: "$32B",
    peRatio: "33.2",
    headquarters: "Foster City, CA"
  },
  {
    id: "JNJ",
    name: "Johnson & Johnson",
    ticker: "JNJ",
    industry: "Healthcare",
    professional: {
      overview: "Johnson & Johnson is a diversified healthcare giant operating in pharmaceuticals, medical devices, and consumer products. Known for innovation in drug development and a strong pipeline of treatments.",
      kpis: [
        { title: "Pharmaceutical Sales", value: "Largest revenue segment" },
        { title: "R&D Investment", value: "$15B+ annually" },
        { title: "Pipeline Drugs", value: "Multiple late-stage candidates" },
      ],
      financials: [
        { title: "Gross Margin", value: "High-margin pharma focus" },
        { title: "Dividend History", value: "60+ years of increases" },
        { title: "Legal Provisions", value: "Litigation expense management" },
      ],
    },
    dating: {
      marketSentiment: "I'm the trusted healthcare name everyone knows. From baby shampoo to life-saving drugs, I'm in people's medicine cabinets and hospitals. People see me as reliable and essential, even if sometimes boring.",
      analystSentiment: "Analysts appreciate my defensive characteristics and steady dividend. They're excited about my pharmaceutical pipeline but watch my legal issues carefully. Most view me as a solid healthcare play for income and stability.",
      historicalPerformance: "I'm the epitome of steady growth. My dividend track record is legendary - I've increased it for over 60 years straight. I may not be exciting, but I'm dependable through all market cycles.",
    },
    marketCap: "$420B",
    revenueTTM: "$85B",
    peRatio: "15.8",
    headquarters: "New Brunswick, NJ"
  },
  {
    id: "PG",
    name: "Procter & Gamble Co.",
    ticker: "PG",
    industry: "Consumer Goods",
    professional: {
      overview: "Procter & Gamble is a consumer goods powerhouse owning brands like Tide, Crest, and Pampers. The company focuses on premium products with strong brand loyalty and global distribution.",
      kpis: [
        { title: "Organic Sales Growth", value: "Core brand performance" },
        { title: "Market Share", value: "Leadership in key categories" },
        { title: "Brand Value", value: "Premium positioning strategy" },
      ],
      financials: [
        { title: "Gross Margin Expansion", value: "Premium pricing power" },
        { title: "Free Cash Flow", value: "Consistent cash generation" },
        { title: "Dividend Yield", value: "Attractive income component" },
      ],
    },
    dating: {
      marketSentiment: "I'm in everyone's daily routine - from their morning toothpaste to their laundry detergent. People see me as reliable and high-quality. I'm not flashy, but I'm essential to everyday life.",
      analystSentiment: "Analysts love my defensive characteristics and consistent performance. They appreciate my focus on premium brands and pricing power. I'm seen as a safe haven during economic uncertainty with upside potential.",
      historicalPerformance: "I'm a dividend aristocrat with decades of consistent returns. My focus on essential products means I perform well in all economic cycles. I'm the definition of a reliable, long-term compounder.",
    },
    marketCap: "$360B",
    revenueTTM: "$82B",
    peRatio: "25.4",
    headquarters: "Cincinnati, OH"
  },
  {
    id: "KO",
    name: "The Coca-Cola Co.",
    ticker: "KO",
    industry: "Consumer Beverages",
    professional: {
      overview: "Coca-Cola is the world's largest beverage company with over 200 brands sold in more than 190 countries. The company is adapting to health trends while maintaining its core brand strength.",
      kpis: [
        { title: "Unit Case Volume", value: "Global consumption metric" },
        { title: "Net Revenue Growth", value: "Pricing and mix improvements" },
        { title: "Market Share", value: "Leadership in non-alcoholic beverages" },
      ],
      financials: [
        { title: "Concentrate Margins", value: "High-margin business model" },
        { title: "Free Cash Flow", value: "Strong cash generation" },
        { title: "Dividend History", value: "60+ years of increases" },
      ],
    },
    dating: {
      marketSentiment: "I'm literally everywhere in the world - my brand is probably more recognized than most countries' flags. People have nostalgic feelings about me, though some worry about my health impact. I'm working on that!",
      analystSentiment: "Analysts see me as a defensive play with global reach. They like my efforts to diversify beyond sugary drinks and my strong brand moat. Most view me as a reliable dividend stock with modest growth potential.",
      historicalPerformance: "I'm one of the most successful stocks of all time. Warren Buffett has owned me for decades for good reason. My combination of steady growth and reliable dividends has created enormous wealth over time.",
    },
    marketCap: "$275B",
    revenueTTM: "$45B",
    peRatio: "25.1",
    headquarters: "Atlanta, GA"
  },
  {
    id: "WMT",
    name: "Walmart Inc.",
    ticker: "WMT",
    industry: "Retail",
    professional: {
      overview: "Walmart is the world's largest retailer, known for low prices and massive scale. The company is investing heavily in e-commerce, technology, and supply chain innovation to compete with Amazon.",
      kpis: [
        { title: "Same-Store Sales Growth", value: "Core retail performance" },
        { title: "E-commerce Growth", value: "Digital transformation metric" },
        { title: "Market Share", value: "Retail dominance in key markets" },
      ],
      financials: [
        { title: "Operating Leverage", value: "Scale advantage benefits" },
        { title: "Inventory Turnover", value: "Efficiency metric" },
        { title: "Capital Allocation", value: "Store investments and technology" },
      ],
    },
    dating: {
      marketSentiment: "I'm the place people love to hate but can't stop shopping at. My low prices are essential for millions of families, especially during tough times. I'm practical, not glamorous, but incredibly useful.",
      analystSentiment: "Analysts respect my defensive characteristics and improving e-commerce capabilities. They appreciate my focus on both DIY and professional customers, plus my digital investments. I'm seen as a high-quality retail play with defensive characteristics.",
      historicalPerformance: "I've been a consistent performer for decades. My focus on efficiency and low prices has created a sustainable competitive advantage. While not the most exciting, I've delivered steady returns through all market cycles.",
    },
    marketCap: "$720B",
    revenueTTM: "$648B",
    peRatio: "32.5",
    headquarters: "Bentonville, AR"
  },
  {
    id: "UNH",
    name: "UnitedHealth Group Inc.",
    ticker: "UNH",
    industry: "Healthcare",
    professional: {
      overview: "UnitedHealth Group is America's largest health insurer and a major healthcare services provider through Optum. The company benefits from aging demographics and healthcare digitization trends.",
      kpis: [
        { title: "Medical Loss Ratio", value: "Claims cost management" },
        { title: "Membership Growth", value: "Health plan enrollment" },
        { title: "Optum Revenue", value: "Fast-growing services segment" },
      ],
      financials: [
        { title: "Revenue Growth", value: "Consistent double-digit growth" },
        { title: "Return on Equity", value: "Exceptional profitability" },
        { title: "Cash Flow Generation", value: "Strong and predictable" },
      ],
    },
    dating: {
      marketSentiment: "People have complicated feelings about me - they need healthcare but don't always love insurance companies. I'm seen as necessary and well-run, even if the industry has image issues. I'm working to improve the healthcare experience.",
      analystSentiment: "Analysts love my consistent execution and diversified business model. They see me benefiting from aging demographics and healthcare technology trends. I'm considered one of the highest-quality names in healthcare.",
      historicalPerformance: "I've been an absolute wealth creator for long-term investors. My stock has dramatically outperformed the market over the past two decades. I've proven that healthcare can be both profitable and beneficial to society.",
    },
    marketCap: "$520B",
    revenueTTM: "$371B",
    peRatio: "25.8",
    headquarters: "Minnetonka, MN"
  },
  {
    id: "HD",
    name: "The Home Depot, Inc.",
    ticker: "HD",
    industry: "Retail",
    professional: {
      overview: "Home Depot is the world's largest home improvement retailer, serving both DIY customers and professional contractors. The company benefits from housing market trends and infrastructure spending.",
      kpis: [
        { title: "Comparable Store Sales", value: "Core growth metric" },
        { title: "Professional Customer Sales", value: "High-margin B2B segment" },
        { title: "Digital Sales Growth", value: "Omnichannel expansion" },
      ],
      financials: [
        { title: "Return on Invested Capital", value: "Exceptional capital efficiency" },
        { title: "Inventory Turnover", value: "Operational excellence" },
        { title: "Free Cash Flow", value: "Strong cash generation" },
      ],
    },
    dating: {
      marketSentiment: "I'm the go-to place for home improvement and repairs. People see me as essential, especially homeowners and contractors. My orange aprons are trusted, and my expertise is valued. I'm practical and dependable.",
      analystSentiment: "Analysts love my market leadership and execution. They appreciate my focus on both DIY and professional customers, plus my digital investments. I'm seen as a high-quality retail play with defensive characteristics.",
      historicalPerformance: "I've been a phenomenal long-term performer, creating massive wealth for shareholders. My focus on customer service and operational excellence has paid off handsomely. I'm proof that retail can be a great business with the right strategy.",
    },
    marketCap: "$420B",
    revenueTTM: "$153B",
    peRatio: "26.8",
    headquarters: "Atlanta, GA"
  },
  {
    id: "MCD",
    name: "McDonald's Corp.",
    ticker: "MCD",
    industry: "Restaurants",
    professional: {
      overview: "McDonald's is the world's largest restaurant chain with over 40,000 locations globally. The company operates primarily as a franchisor, generating stable rental and royalty income from franchisees.",
      kpis: [
        { title: "Comparable Store Sales", value: "Same-store growth metric" },
        { title: "Digital Sales Growth", value: "Mobile and delivery expansion" },
        { title: "Franchise Percentage", value: "Asset-light business model" },
      ],
      financials: [
        { title: "Rental Income Growth", value: "Predictable franchise revenue" },
        { title: "Operating Margin", value: "High-margin franchise model" },
        { title: "Return on Capital", value: "Efficient capital allocation" },
      ],
    },
    dating: {
      marketSentiment: "I'm a global icon that everyone knows. Some people feel guilty about loving me, but they keep coming back. I'm convenient, affordable, and everywhere. I'm working on being healthier and more sustainable too!",
      analystSentiment: "Analysts love my asset-light franchise model and predictable cash flows. They're impressed by my digital transformation and global reach. I'm seen as a defensive play with steady dividend growth potential.",
      historicalPerformance: "I've been a remarkably consistent performer over decades. My franchise model provides steady income through all economic cycles. I'm proof that sometimes the simplest business models are the most durable and profitable.",
    },
    marketCap: "$220B",
    revenueTTM: "$25B",
    peRatio: "25.7",
    headquarters: "Chicago, IL"
  },
  {
    id: "AVGO",
    name: "Broadcom Inc.",
    ticker: "AVGO",
    industry: "Technology",
    professional: {
      overview: "Broadcom is a global technology leader in semiconductor and infrastructure software solutions. The company serves data center, networking, software, wireless, and industrial markets with mission-critical products.",
      kpis: [
        { title: "Semiconductor Revenue", value: "Core hardware business" },
        { title: "Software Revenue Growth", value: "High-margin recurring income" },
        { title: "R&D Investment", value: "Innovation in connectivity" },
      ],
      financials: [
        { title: "Free Cash Flow", value: "Exceptional cash generation" },
        { title: "Gross Margin", value: "Premium product positioning" },
        { title: "Acquisition Integration", value: "Strategic bolt-on purchases" },
      ],
    },
    dating: {
      marketSentiment: "I'm the behind-the-scenes tech company that makes everything work. People might not know my name, but my chips are in their phones and data centers everywhere. I'm essential infrastructure for the digital world.",
      analystSentiment: "Analysts love my diversified technology portfolio and strong cash generation. They're excited about my software acquisitions and see me benefiting from 5G and cloud trends. I'm viewed as a premium tech play.",
      historicalPerformance: "I've been a wealth-creating machine through smart acquisitions and organic growth. My focus on returning cash to shareholders through dividends has made me a favorite among income-focused tech investors.",
    },
    marketCap: "$660B",
    revenueTTM: "$51B",
    peRatio: "32.1",
    headquarters: "San Jose, CA"
  },
  {
    id: "XOM",
    name: "Exxon Mobil Corp.",
    ticker: "XOM",
    industry: "Energy",
    professional: {
      overview: "ExxonMobil is one of the world's largest publicly traded oil and gas companies, with operations spanning exploration, production, refining, and chemical manufacturing globally.",
      kpis: [
        { title: "Oil Production Growth", value: "Permian Basin expansion" },
        { title: "Refining Margins", value: "Downstream profitability" },
        { title: "Cost Reduction", value: "Operational efficiency gains" },
      ],
      financials: [
        { title: "Free Cash Flow", value: "Capital discipline focus" },
        { title: "Debt Reduction", value: "Balance sheet strengthening" },
        { title: "Capital Allocation", value: "Shareholder returns priority" },
      ],
    },
    dating: {
      marketSentiment: "I'm controversial but essential. People need energy, and I provide it reliably. Some see me as old-school, others as a necessary part of the economy. I'm working on being more sustainable while meeting energy needs.",
      analystSentiment: "Analysts appreciate my improved capital discipline and shareholder focus. They like my low-cost oil production and strong refining assets. I'm seen as a cyclical play that can generate significant cash at higher oil prices.",
      historicalPerformance: "I've been through boom and bust cycles for over a century. My recent focus on efficiency and capital discipline has impressed investors. When energy prices are favorable, I can generate enormous cash flows and returns.",
    },
    marketCap: "$525B",
    revenueTTM: "$344B",
    peRatio: "14.2",
    headquarters: "Irving, TX"
  }
];

const CompanyDiscoveryTab: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyProfile[]>(initialCompanies);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewedCompanies, setViewedCompanies] = useState<Set<string>>(new Set());

  const handleSwipe = (companyId: string, liked: boolean) => {
    console.log(`Company ${companyId} was ${liked ? 'liked' : 'disliked'}`);
    setViewedCompanies(prev => new Set(prev).add(companyId));
    if (currentIndex < companies.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      console.log("No more companies to show in this batch.");
    }
  };
  
  const resetDeck = () => {
    setCurrentIndex(0);
    setViewedCompanies(new Set());
  }

  const currentCompany = companies[currentIndex];
  const allViewed = currentIndex >= companies.length -1 && viewedCompanies.has(currentCompany?.id);

  return (
    <div className="py-6">
      {currentCompany && !allViewed ? (
        <CompanySwipeCard company={currentCompany} onSwipe={handleSwipe} />
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground mb-4">
            {companies.length > 0 ? "You've seen all companies for now!" : "No companies loaded."}
          </p>
          {companies.length > 0 && (
            <Button onClick={resetDeck}>
              <RotateCcw className="mr-2 h-4 w-4" /> Start Over
            </Button>
          )}
        </div>
      )}
      {companies.length > 0 && (
        <p className="text-center text-sm text-muted-foreground mt-6">
          Showing company {Math.min(currentIndex + 1, companies.length)} of {companies.length}
        </p>
      )}
    </div>
  );
};

export default CompanyDiscoveryTab;
