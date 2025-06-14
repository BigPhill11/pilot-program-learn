
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
    overview: "Designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.",
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
    overview: "Develops, licenses, and supports software, services, devices, and solutions worldwide. Segments include Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.",
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
    overview: "Provides online advertising services in the United States, Europe, the Middle East, Africa, Asia-Pacific, Canada, and Latin America. The company operates through Google Services, Google Cloud, and Other Bets segments.",
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
    overview: "Engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS).",
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
    overview: "Designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems. It also offers services related to its products.",
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
