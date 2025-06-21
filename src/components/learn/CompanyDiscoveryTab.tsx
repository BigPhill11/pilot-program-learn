
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
      // Reached end of list, maybe show a message or reset
      console.log("No more companies to show in this batch.");
    }
  };
  
  const resetDeck = () => {
    setCurrentIndex(0);
    setViewedCompanies(new Set());
    // Optional: could shuffle companies here too
    // setCompanies([...initialCompanies].sort(() => Math.random() - 0.5)); 
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
