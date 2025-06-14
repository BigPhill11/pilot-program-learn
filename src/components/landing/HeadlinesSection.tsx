
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

const HeadlinesSection = () => {
  const dailyHeadlines = [
    {
      title: "Tech Giants Rally on AI Advancements",
      summary: "Major technology companies saw their stock prices surge following announcements of significant breakthroughs in artificial intelligence. Investors are optimistic about the potential for these advancements to drive future growth and innovation across various industries. Analysts predict this trend could reshape software development and consumer electronics. The rally has also boosted related sectors like chip manufacturing and cloud computing services.",
      tldr: "Big tech companies are doing great because they're making cool new AI stuff, and people think it'll make them a lot of money."
    },
    {
      title: "Federal Reserve Signals Cautious Stance on Interest Rates",
      summary: "In a closely watched announcement, the Federal Reserve indicated it would maintain a cautious approach to adjusting interest rates. While acknowledging ongoing economic recovery, officials expressed concerns about lingering inflationary pressures. This suggests that any future rate hikes will be gradual and data-dependent. Markets reacted with mild volatility as traders assessed the implications for borrowing costs and investment strategies.",
      tldr: "The big bank (Federal Reserve) is being careful about changing interest rates because prices are still high, so they'll take it slow."
    },
    {
      title: "Oil Prices Climb Amid Supply Chain Disruptions",
      summary: "Global oil prices continued their upward trajectory as ongoing supply chain disruptions and geopolitical uncertainties impacted production. Major oil-producing nations have struggled to meet rising demand, leading to tighter market conditions. Consumers may see higher prices at the pump as a result. Analysts are monitoring international talks that could potentially ease some of these supply pressures.",
      tldr: "Gas prices might go up because it's harder to get oil right now due to problems around the world."
    },
    {
      title: "Retail Sales Show Unexpected Resilience",
      summary: "Despite concerns about inflation, the latest retail sales figures surprised analysts by showing continued consumer spending. Strong demand in electronics and home goods offset slight declines in other categories. This resilience suggests that consumers are still willing to spend, bolstering hopes for sustained economic activity. However, economists caution that this trend may not last if inflation remains elevated.",
      tldr: "People are still buying a lot of stuff, even though things are more expensive, which is good for the economy (for now)."
    },
    {
      title: "IPO Market Sees Renewed Interest in Biotech",
      summary: "The market for Initial Public Offerings (IPOs) is showing signs of life, with a particular surge in interest for biotechnology firms. Several promising biotech companies have recently filed for IPOs, attracting significant investor attention. This renewed appetite for risk in the biotech sector reflects optimism about new drug discoveries and medical technologies. Successful IPOs in this space could encourage more companies to go public.",
      tldr: "New medicine and health tech companies are starting to sell their shares to the public, and investors are excited."
    },
    {
      title: "Global Shipping Costs Begin to Stabilize",
      summary: "After months of volatility, global shipping costs are reportedly starting to stabilize, albeit at elevated levels. Improvements in port congestion and an increase in container availability are contributing to this trend. While still higher than pre-pandemic levels, this stabilization could ease some inflationary pressures on goods. Businesses are hopeful this will lead to more predictable supply chains in the coming months.",
      tldr: "It's still expensive to ship things, but prices aren't going crazy up and down like before, which is a bit better for businesses."
    },
    {
      title: "Renewable Energy Stocks Gain on New Policy Support",
      summary: "Shares in renewable energy companies rose following announcements of new government policies aimed at boosting green energy production. These policies include tax incentives and subsidies for solar, wind, and other renewable sources. Investors are betting that this increased support will accelerate the transition to cleaner energy. This sector is expected to see significant growth and investment in the coming years.",
      tldr: "Companies that make clean energy (like solar and wind power) are doing well because the government is helping them out."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="flex items-center justify-center mb-2">
              <Newspaper className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-semibold text-foreground">Top Financial Headlines</h2>
          </div>
          <p className="mt-2 text-muted-foreground">Key news stories impacting the markets today. (Static data for now)</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyHeadlines.map((headline, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{headline.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm flex-grow">
                <p className="text-muted-foreground leading-relaxed">{headline.summary}</p>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">TL;DR:</h4>
                  <p className="text-muted-foreground italic text-xs bg-blue-50 p-2 rounded-md border border-blue-200">{headline.tldr}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeadlinesSection;

