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
    professionalOverview: "Apple Inc. designs and markets consumer electronics and software. A consistent top performer, its stock has seen massive long-term growth driven by the iPhone ecosystem. The broader tech hardware industry is mature but sees continuous demand. Analysts project steady growth, fueled by its expansion into high-margin services (App Store, Apple Music) and new frontiers like AR/VR. Key watch-outs include geopolitical tensions and intense competition.",
    datingProfile: "Hey, I'm Apple. You've probably heard of me. I'm a creative type who values sleek design and a seamless connection. My past is full of hits (iPhone, Mac) and my future's looking just as bright. I'm financially stable and always growing (hello, services revenue!). Looking for a long-term partner who appreciates quality and isn't afraid of a little walled garden. If you want a relationship that 'just works,' swipe right.",
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
    professionalOverview: "Microsoft is a diversified technology giant, dominating in enterprise software, cloud computing (Azure), and gaming (Xbox). The company executed a remarkable turnaround, with its stock performing exceptionally well over the last decade. It operates in high-growth sectors like cloud and AI, which have strong tailwinds. Analysts are overwhelmingly bullish, citing Azure's market share gains and AI integration as key catalysts for future growth.",
    datingProfile: "I'm Microsoft. I had a bit of an awkward phase in the 2000s, but I've had a serious glow-up. I'm more open-minded now (love you, open source!) and have my head in the clouds (Azure, get it?). I'm dependable, successful, and have a playful side (Xbox anyone?). Looking for someone who sees my potential and is ready to build a powerful future together. I'm all about creating productivity and synergy.",
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
    professionalOverview: "Alphabet Inc. is the parent company of Google, dominating online search, advertising, and the Android OS. The stock has been a historic outperformer, though it faces cyclical advertising trends. The digital ad market is massive but maturing. Analysts see major growth potential in Google Cloud and AI initiatives (Waymo, DeepMind), but are watchful of significant regulatory risks and antitrust lawsuits globally.",
    datingProfile: "You can call me Alphabet, but my friends know me as Google. I'm the one you turn to when you have questions. I'm incredibly knowledgeable, have a great memory, and I'm into some pretty futuristic hobbies (self-driving cars, AI). My financial situation is... well, just Google it. Looking for an inquisitive partner who is curious about the world and trusts me to find the answers. Let's explore the world together.",
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
    professionalOverview: "Amazon is a global leader in e-commerce, cloud computing (AWS), and digital streaming. Its stock performance has been legendary, reflecting its relentless expansion. The e-commerce and cloud industries continue to grow robustly. Analysts forecast continued growth driven by AWS's dominance and the expansion of its ad business, though they note the high capital expenditures and potential for labor-related and regulatory headwinds.",
    datingProfile: "Name's Amazon. I'm ambitious, customer-obsessed, and I can get you anything you want, usually in two days or less. I've got a practical side (e-commerce) and a high-flying, intellectual side (AWS). I'm always working on myself and expanding my interests. Looking for someone who values speed, convenience, and variety. Swipe right and I'll be on your doorstep before you know it.",
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
    professionalOverview: "Tesla is a leader in the electric vehicle (EV) market and is expanding into energy storage and AI. Its stock is famously volatile but has delivered astronomical returns for early investors. The EV industry is in a high-growth, hyper-competitive phase. Analyst opinions are sharply divided: bulls see a world-changing tech company with massive potential in AI and robotics, while bears point to intense competition, production challenges, and a high valuation.",
    datingProfile: "I'm Tesla. I'm electrifying, a bit unpredictable, and I'm here to change the world. My past is a wild ride, and my future is even more ambitious (think robots and space travel). I run on pure energy and vision. I'm not for the faint of heart; I'm looking for a true believer who can handle my ups and downs and wants to be part of a revolution. Buckle up.",
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
