
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PodcastCard from './PodcastCard';

const personalFinanceTopics = [
    {
        value: "budgeting",
        title: "Budgeting 101",
        content: "Budgeting is the process of creating a plan to spend your money. This spending plan is called a budget. Creating this spending plan allows you to determine in advance whether you will have enough money to do the things you need to do or would like to do."
    },
    {
        value: "taxes",
        title: "Understanding Taxes",
        content: "Taxes are involuntary fees levied on individuals or corporations by a government entity—whether local, regional, or national—in order to finance government activities. In the U.S., taxpayers can be subject to taxes at the federal, state, and local levels."
    },
    {
        value: "roth-ira",
        title: "What is a Roth IRA?",
        content: "A Roth IRA is a special individual retirement account (IRA) where you pay taxes on money going into your account, and then all future withdrawals are tax-free. Roth IRAs are best for people who expect their tax rate to be higher in retirement than it is now."
    },
    {
        value: "401k",
        title: "Intro to 401(k) Plans",
        content: "A 401(k) is a retirement savings plan sponsored by an employer. It lets workers save and invest a piece of their paycheck before taxes are taken out. Taxes aren't paid until the money is withdrawn from the account."
    },
    {
        value: "buying-house",
        title: "How to Buy a House",
        content: "Buying a house involves several key steps: determining your budget, getting pre-approved for a mortgage, finding a real estate agent, house hunting, making an offer, getting an inspection and appraisal, and finally, closing the sale."
    },
    {
        value: "building-credit",
        title: "How to Build Credit",
        content: "Building credit is essential for your financial health. You can build credit by opening a new credit account, making payments on time, keeping your credit utilization low, and regularly monitoring your credit report for errors."
    }
];

const podcastRecommendations = [
    {
        name: "The Ramsey Show",
        description: "Dave Ramsey offers practical financial advice, helping listeners get out of debt and build wealth.",
        imageUrl: "/placeholder.svg",
        link: "https://www.ramseysolutions.com/shows/the-ramsey-show"
    },
    {
        name: "Planet Money",
        description: "NPR's podcast that makes complex economic topics accessible and entertaining.",
        imageUrl: "/placeholder.svg",
        link: "https://www.npr.org/sections/money/"
    },
    {
        name: "Afford Anything",
        description: "Hosted by Paula Pant, this podcast explores how to make smarter decisions about money, time, and life.",
        imageUrl: "/placeholder.svg",
        link: "https://affordanything.com/podcast/"
    }
];

const PersonalFinanceTab = () => {
    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">Personal Finance Essentials</h2>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                    {personalFinanceTopics.map((topic) => (
                        <AccordionItem value={topic.value} key={topic.value}>
                            <AccordionTrigger className="text-lg text-left">{topic.title}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {topic.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">Podcast Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {podcastRecommendations.map((podcast) => (
                        <PodcastCard key={podcast.name} {...podcast} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PersonalFinanceTab;
