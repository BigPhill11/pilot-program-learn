import React from 'react';
import { Briefcase, Landmark, Building, Users, Handshake, Home, BrainCircuit, Heart, ShoppingCart, Banknote, TrendingUp, Smartphone, Car, Zap } from 'lucide-react';

export interface JourneyLevel {
    level: number;
    focusArea: string;
    sampleTopics: string[];
    interactiveContent?: {
        beginner: {
            explanation: string;
            realWorldExample: string;
            keyTakeaways: string[];
        };
        intermediate: {
            explanation: string;
            realWorldExample: string;
            keyTakeaways: string[];
        };
        pro: {
            explanation: string;
            realWorldExample: string;
            keyTakeaways: string[];
        };
    };
}

export interface IndustryJourneyData {
    id: string;
    name: string;
    icon: React.ReactElement;
    description: string;
    overview: string;
    howItWorks: string;
    futureOutlook: string;
    levels: JourneyLevel[];
}

export const industryJourneys: IndustryJourneyData[] = [
    {
        id: "consumer",
        name: "Consumer Goods & Retail",
        icon: <ShoppingCart />,
        description: "The consumer sector encompasses companies that produce and sell goods directly to consumers, including retail chains, consumer packaged goods, restaurants, and e-commerce platforms.",
        overview: "Consumer companies are driven by consumer spending patterns, brand loyalty, and changing preferences. This sector includes everything from daily necessities like food and clothing to luxury items and experiences.",
        howItWorks: "Companies generate revenue through direct sales to consumers via retail stores, online platforms, or direct-to-consumer channels. Success depends on understanding consumer behavior, effective marketing, supply chain efficiency, and brand building.",
        futureOutlook: "AI-powered personalization will revolutionize shopping experiences with predictive analytics and customized recommendations. Sustainability will become a key differentiator as consumers increasingly prefer eco-friendly products. Direct-to-consumer brands will continue disrupting traditional retail, while omnichannel experiences will become essential.",
        levels: [
            { 
                level: 1, 
                focusArea: "Consumer Finance Basics", 
                sampleTopics: ["Retail metrics", "same-store sales", "inventory turnover", "brand equity", "seasonal patterns"],
                interactiveContent: {
                    beginner: {
                        explanation: "Retail metrics are like a store's report card! Same-store sales tell us if existing stores are selling more this year than last year (like comparing your test scores from last semester to this one). Inventory turnover is how fast products fly off the shelves - imagine a popular toy store during the holidays versus a slow bookstore.",
                        realWorldExample: "Target's same-store sales grew 3% last quarter, meaning their existing stores sold 3% more than the same period last year. Their inventory turns over 6 times per year, which means they sell and replace their entire stock every 2 months - that's pretty fast for retail!",
                        keyTakeaways: [
                            "Same-store sales = growth in existing stores (not new ones)",
                            "Higher inventory turnover usually means better efficiency",
                            "Seasonal patterns affect most retail businesses"
                        ]
                    },
                    intermediate: {
                        explanation: "Retail metrics provide critical insights into operational efficiency and growth momentum. Same-store sales (comp sales) isolate organic growth by excluding new store openings, while inventory turnover indicates how effectively companies manage working capital and respond to consumer demand.",
                        realWorldExample: "Walmart's same-store sales increased 2.4% in Q3, driven by grocery strength and e-commerce integration. Their inventory turnover of 8.7x demonstrates superior supply chain management compared to traditional retailers averaging 4-6x, enabling lower costs and fresher products.",
                        keyTakeaways: [
                            "Comp sales growth indicates brand health and market share gains",
                            "Inventory turnover improvements drive margin expansion",
                            "Seasonal adjustments are crucial for accurate trend analysis"
                        ]
                    },
                    pro: {
                        explanation: "Advanced retail analytics focus on cohort-based same-store sales trends, inventory velocity by category, and the relationship between working capital efficiency and ROIC. Leading indicators include traffic conversion rates, average transaction value decomposition, and inventory turnover variance across SKUs.",
                        realWorldExample: "Home Depot's 14-quarter streak of positive comp sales reflects strategic investments in Pro customer acquisition and omnichannel capabilities. Their inventory turns of 5.2x combined with gross margin expansion to 34.2% demonstrates pricing power and SKU optimization, particularly in high-velocity categories like lumber and seasonal goods.",
                        keyTakeaways: [
                            "Multi-year comp stack analysis reveals underlying business momentum",
                            "Category-level inventory metrics identify margin expansion opportunities",
                            "Working capital velocity directly correlates with returns on invested capital"
                        ]
                    }
                }
            },
            { 
                level: 2, 
                focusArea: "Consumer Business Models", 
                sampleTopics: ["Retail vs wholesale", "subscription models", "marketplace vs direct", "franchise systems"],
                interactiveContent: {
                    beginner: {
                        explanation: "Think of business models like different ways to run a lemonade stand. You could sell directly to customers (retail), sell in bulk to other stores (wholesale), let others sell lemonade and take a cut (marketplace like Amazon), or teach others your recipe and collect fees (franchise like McDonald's).",
                        realWorldExample: "Costco uses a wholesale model - they buy in huge quantities and sell to members at low prices. Netflix uses subscription - you pay monthly for unlimited access. Amazon is a marketplace - they let others sell products and take a percentage of each sale.",
                        keyTakeaways: [
                            "Retail = selling directly to end customers",
                            "Wholesale = selling in bulk to other businesses", 
                            "Subscription models create predictable recurring revenue"
                        ]
                    },
                    intermediate: {
                        explanation: "Consumer business models determine revenue streams, customer relationships, and competitive positioning. Direct-to-consumer brands bypass traditional retail markups, while marketplaces benefit from network effects and asset-light scaling. Subscription models provide predictable cash flows but require continuous value delivery.",
                        realWorldExample: "Nike's DTC strategy increased from 16% to 40% of revenue, improving margins by 400-600 basis points versus wholesale. Amazon's marketplace generates 20%+ take rates on $300B+ in third-party sales, while Prime's 200M+ subscribers provide $25B+ in recurring revenue.",
                        keyTakeaways: [
                            "DTC models improve margins but require customer acquisition capabilities",
                            "Marketplace models scale with minimal capital but depend on network effects",
                            "Subscription models enhance customer lifetime value and cash flow predictability"
                        ]
                    },
                    pro: {
                        explanation: "Business model selection impacts unit economics, capital requirements, and competitive moats. Hybrid approaches combining multiple models can optimize for different customer segments and lifecycle stages. Key considerations include customer acquisition cost dynamics, lifetime value optimization, and platform defensibility.",
                        realWorldExample: "Shopify exemplifies model diversification: SaaS subscriptions provide recurring revenue base, payment processing captures transaction volume, and merchant solutions scale with customer success. This results in 110%+ net revenue retention and expanding margins as merchants grow.",
                        keyTakeaways: [
                            "Multi-model approaches can optimize for different value creation mechanisms",
                            "Platform businesses benefit from positive feedback loops and switching costs",
                            "Model evolution should align with customer value creation and competitive dynamics"
                        ]
                    }
                }
            },
            { 
                level: 3, 
                focusArea: "Consumer Analysis", 
                sampleTopics: ["Comp store analysis", "market share", "pricing power", "supply chain", "digital transformation"],
                interactiveContent: {
                    beginner: {
                        explanation: "Analyzing consumer companies is like being a detective! We look at how well stores are doing (comp store sales), how much of the market they control (market share), and whether customers will still buy if prices go up (pricing power). Supply chain is how products get from factories to stores.",
                        realWorldExample: "Starbucks has strong pricing power - they can charge $5 for coffee that costs $0.50 to make because customers love the brand and experience. Their market share in premium coffee is huge, and they keep opening new stores that perform well.",
                        keyTakeaways: [
                            "Market share shows how much of the pie a company controls",
                            "Pricing power means customers will pay more without leaving",
                            "Good supply chains keep costs low and shelves stocked"
                        ]
                    },
                    intermediate: {
                        explanation: "Consumer analysis requires evaluating competitive positioning, operational efficiency, and secular growth drivers. Market share trends indicate competitive dynamics, while pricing power reflects brand strength and customer loyalty. Digital transformation capabilities increasingly determine long-term viability.",
                        realWorldExample: "Starbucks maintains 37% share in U.S. coffee shops through brand differentiation and store experience. Their 2-3% annual price increases stick due to customer loyalty, while mobile ordering and rewards program drive 50%+ of transactions, improving throughput and data collection.",
                        keyTakeaways: [
                            "Market share gains often require differentiated value propositions",
                            "Pricing power sustainability depends on brand moats and switching costs",
                            "Digital capabilities become essential for customer engagement and operational efficiency"
                        ]
                    },
                    pro: {
                        explanation: "Advanced consumer analysis focuses on cohort behavior, channel optimization, and competitive response modeling. Key frameworks include brand equity quantification, supply chain resilience assessment, and omnichannel integration effectiveness. Market share analysis should incorporate category growth dynamics and competitive intensity trends.",
                        realWorldExample: "Nike's brand strength enables 40%+ gross margins versus industry average of 25%, while DTC expansion improves margins by 400-600bp. Their supply chain diversification away from China and investment in automation provide competitive advantages, evidenced by inventory turns improvement from 4.0x to 4.5x.",
                        keyTakeaways: [
                            "Brand equity can be quantified through price premium analysis and customer lifetime value",
                            "Supply chain optimization drives both cost efficiency and competitive differentiation",
                            "Omnichannel integration creates data advantages and customer experience moats"
                        ]
                    }
                }
            },
            { 
                level: 4, 
                focusArea: "Consumer Investing Skills", 
                sampleTopics: ["Store-level modeling", "comp analysis", "channel checks", "consumer surveys"],
                interactiveContent: {
                    beginner: {
                        explanation: "Investing in consumer companies means doing homework like a really thorough shopper! We visit stores to see how busy they are (channel checks), compare similar companies (comp analysis), and sometimes ask customers what they think (surveys). We also calculate how much each store makes.",
                        realWorldExample: "Before investing in Target, you might visit 10 stores, see they're busy and well-stocked, compare their sales growth to Walmart's, and notice customers like their trendy clothes. If each store makes $50M in sales, you can estimate how valuable the whole company is.",
                        keyTakeaways: [
                            "Channel checks = visiting stores to see how business is doing",
                            "Comparing similar companies helps you find the best investment",
                            "Store-level math helps estimate total company value"
                        ]
                    },
                    intermediate: {
                        explanation: "Consumer investing requires bottoms-up analysis combining quantitative modeling with qualitative field research. Store-level modeling involves traffic, conversion, and basket size analysis. Comparable analysis examines valuation multiples across similar business models, while primary research validates investment theses.",
                        realWorldExample: "Analyzing Chipotle requires modeling unit economics: average unit volumes of $2.2M, 4-wall margins of 25%, and new store returns of 20%+. Comp analysis versus QSR peers on EV/Sales and P/E multiples, plus field checks on service speed and food quality, inform investment decisions.",
                        keyTakeaways: [
                            "Unit-level modeling provides foundation for enterprise valuation",
                            "Peer comparison analysis reveals relative value opportunities",
                            "Primary research validates or challenges investment assumptions"
                        ]
                    },
                    pro: {
                        explanation: "Advanced consumer investing employs sophisticated modeling techniques including cohort analysis, scenario planning, and options-based valuation for growth companies. Investment frameworks should incorporate competitive dynamics, regulatory risks, and secular trend analysis. Channel checks require systematic sampling and statistical significance testing.",
                        realWorldExample: "Analyzing Amazon requires DCF modeling across multiple segments (AWS, advertising, retail), with scenario analysis for different cloud growth rates and margin expansion paths. Channel checks involve e-commerce market share analysis, Prime member surveys, and third-party seller interviews to validate growth assumptions.",
                        keyTakeaways: [
                            "Multi-scenario modeling captures uncertainty in growth trajectories",
                            "Systematic primary research improves forecast accuracy and conviction",
                            "Segment-level analysis enables sum-of-the-parts valuation approaches"
                        ]
                    }
                }
            },
            { 
                level: 5, 
                focusArea: "Consumer in Practice", 
                sampleTopics: ["Notable brands", "retail disruption", "private equity deals", "turnaround stories"],
                interactiveContent: {
                    beginner: {
                        explanation: "Real consumer stories teach us the most! Some companies like Amazon disrupted traditional retail by making online shopping super convenient. Others like Toys'R'Us struggled and went out of business. Private equity firms sometimes buy struggling retailers to try to fix them.",
                        realWorldExample: "Amazon started selling books online and grew to sell everything, hurting traditional stores like Borders (which closed). Meanwhile, Target successfully competed by offering stylish products at reasonable prices, showing that good strategy can win against tough competition.",
                        keyTakeaways: [
                            "Online shopping changed how we buy almost everything",
                            "Some traditional retailers adapted and thrived, others didn't",
                            "Good brand strategy helps companies survive disruption"
                        ]
                    },
                    intermediate: {
                        explanation: "Consumer industry case studies reveal key success factors and failure modes. Digital disruption forced traditional retailers to develop omnichannel capabilities or face obsolescence. Private equity involvement often focuses on operational improvements and debt optimization, with mixed results depending on execution and market conditions.",
                        realWorldExample: "Best Buy's successful transformation involved price-matching Amazon, leveraging stores for fulfillment, and focusing on services like Geek Squad. Conversely, Toys'R'Us failed due to excessive debt from LBO, inability to compete on price or convenience, and delayed e-commerce investment.",
                        keyTakeaways: [
                            "Successful transformation requires both digital capabilities and physical asset optimization",
                            "Debt levels significantly impact ability to invest in necessary changes",
                            "Customer experience differentiation becomes crucial in competitive markets"
                        ]
                    },
                    pro: {
                        explanation: "Consumer industry evolution demonstrates the importance of strategic flexibility, capital allocation discipline, and competitive moat development. Successful companies invest countercyclically in capabilities while maintaining operational efficiency. Failed cases often involve strategic rigidity, capital structure constraints, or misunderstanding of customer value propositions.",
                        realWorldExample: "Nike's DTC transformation required significant investment in digital capabilities, supply chain restructuring, and brand portfolio optimization. Their willingness to reduce wholesale partnerships while building direct relationships enabled margin expansion and better customer data, contrasting with brands that relied too heavily on traditional retail partners.",
                        keyTakeaways: [
                            "Strategic transformation requires long-term investment and short-term sacrifice",
                            "Customer data and direct relationships become increasingly valuable competitive assets",
                            "Successful companies balance growth investment with profitability maintenance"
                        ]
                    }
                }
            },
            { 
                level: 6, 
                focusArea: "Consumer & Economic Cycles", 
                sampleTopics: ["Discretionary vs staples", "inflation impact", "consumer confidence", "demographic trends"],
                interactiveContent: {
                    beginner: {
                        explanation: "Consumer companies are affected by the economy like people's spending habits! When times are good, people buy luxury items (discretionary). When money is tight, they focus on necessities like food (staples). Inflation makes everything more expensive, and demographic changes (like aging population) change what people buy.",
                        realWorldExample: "During COVID, people bought lots of groceries and home improvement supplies (staples/necessities) but stopped buying clothes and eating out (discretionary). Companies like Walmart did well, while restaurant chains struggled until things reopened.",
                        keyTakeaways: [
                            "Staples (necessities) are more stable during tough times",
                            "Discretionary (luxury) spending goes up and down with the economy",
                            "Inflation can hurt companies if they can't raise prices"
                        ]
                    },
                    intermediate: {
                        explanation: "Consumer spending patterns correlate strongly with economic cycles, employment levels, and real wage growth. Staples companies provide defensive characteristics but limited upside, while discretionary companies offer higher growth potential with increased volatility. Inflation impacts vary by pricing power and cost structure flexibility.",
                        realWorldExample: "During 2008 recession, Walmart's sales grew while Target struggled due to discretionary mix. Conversely, in 2021-2022 inflation, companies with strong brands like Coca-Cola maintained margins through pricing, while private label-heavy retailers faced pressure.",
                        keyTakeaways: [
                            "Portfolio balance between defensive and cyclical exposure depends on economic outlook",
                            "Pricing power becomes crucial during inflationary periods",
                            "Employment and wage trends drive consumer spending capacity"
                        ]
                    },
                    pro: {
                        explanation: "Consumer sector performance requires analysis of multiple economic indicators including real disposable income, savings rates, and credit availability. Leading indicators such as consumer confidence, employment trends, and housing activity help predict spending shifts. Demographic analysis should focus on generational spending patterns and lifecycle stage transitions.",
                        realWorldExample: "Current demographic shifts include millennials entering peak earning years, driving housing and family-related spending, while Gen Z prioritizes experiences and sustainability. This creates opportunities for companies like Lululemon and Patagonia while challenging traditional mass retailers.",
                        keyTakeaways: [
                            "Demographic transitions create long-term secular growth opportunities",
                            "Credit cycle analysis helps predict discretionary spending volatility",
                            "Real wage growth, not nominal, determines sustainable spending capacity"
                        ]
                    }
                }
            },
            { 
                level: 7, 
                focusArea: "Consumer Careers", 
                sampleTopics: ["Analyst roles", "retail field work", "brand case studies", "industry conferences"],
                interactiveContent: {
                    beginner: {
                        explanation: "Consumer industry careers are exciting because you get to analyze brands everyone knows! Analysts visit stores, study shopping trends, and make investment recommendations. You might spend time in malls, talk to store managers, and attend big retail conferences to learn about new trends.",
                        realWorldExample: "A consumer analyst might spend Monday visiting Target stores, Tuesday analyzing their earnings report, Wednesday calling suppliers to understand inventory trends, and Thursday writing a report recommending whether investors should buy the stock.",
                        keyTakeaways: [
                            "Consumer analysts do lots of 'field work' visiting actual stores",
                            "You analyze brands and companies people use every day",
                            "Careers combine financial analysis with understanding consumer behavior"
                        ]
                    },
                    intermediate: {
                        explanation: "Consumer sector careers require combining financial analysis with consumer psychology and retail operations knowledge. Success depends on developing industry contacts, understanding supply chain dynamics, and identifying emerging trends before they become mainstream. Field research and primary data collection are essential skills.",
                        realWorldExample: "Top consumer analysts develop relationships with management teams, suppliers, and industry consultants. They attend conferences like NRF and Shoptalk, conduct channel checks across multiple geographies, and build proprietary data sets on traffic, pricing, and market share trends.",
                        keyTakeaways: [
                            "Industry relationships and networks provide competitive advantages",
                            "Combining quantitative analysis with qualitative insights drives superior performance",
                            "Understanding consumer behavior evolution is crucial for long-term success"
                        ]
                    },
                    pro: {
                        explanation: "Senior consumer sector roles require deep expertise in specific subsectors, ability to identify paradigm shifts, and skill in communicating complex investment theses. Career advancement depends on developing unique analytical frameworks, building institutional credibility, and generating superior risk-adjusted returns through cycle management.",
                        realWorldExample: "Leading consumer investors like Bill Ackman (Target, JCP) and David Einhorn (Amazon short) demonstrate the importance of contrarian thinking and rigorous analysis. Success requires understanding when market consensus is wrong and having conviction to act on differentiated views.",
                        keyTakeaways: [
                            "Developing specialized expertise in subsectors creates competitive differentiation",
                            "Contrarian thinking and independent analysis drive superior investment outcomes",
                            "Communication skills are essential for building institutional relationships and raising capital"
                        ]
                    }
                }
            }
        ]
    },
    {
        id: "healthcare",
        name: "Healthcare & Biotechnology",
        icon: <Heart />,
        description: "Healthcare encompasses pharmaceutical companies, medical device manufacturers, hospitals, and biotech firms developing new treatments and medical technologies.",
        overview: "The healthcare sector is driven by aging demographics, technological innovation, and regulatory approval processes. It includes drug discovery, medical devices, healthcare services, and digital health solutions.",
        howItWorks: "Revenue comes from drug sales, medical procedures, device sales, and healthcare services. Success depends on R&D innovation, regulatory approvals, patent protection, and reimbursement from insurance providers.",
        futureOutlook: "AI will accelerate drug discovery and enable personalized medicine based on genetic profiles. Telemedicine and remote monitoring will become standard care delivery methods. Gene therapy and precision medicine will transform treatment approaches, while digital therapeutics will emerge as new treatment modalities.",
        levels: [
            { 
                level: 1, 
                focusArea: "Healthcare Finance Basics", 
                sampleTopics: ["Drug development", "clinical trials", "FDA approval", "reimbursement", "healthcare REITs"],
                interactiveContent: {
                    beginner: {
                        explanation: "Drug development is like a very long, expensive science project! Scientists discover new medicines, test them in labs, then test on people in three phases. The FDA (like a tough teacher) decides if the drug is safe and works. If approved, insurance companies decide if they'll pay for it.",
                        realWorldExample: "COVID vaccines took about 10 months to develop and get approved (super fast!), but normally it takes 10-15 years and costs over $1 billion. Pfizer's vaccine made $37 billion in 2021 because governments and insurance paid for it worldwide.",
                        keyTakeaways: [
                            "Drug development has three phases: lab tests, small human trials, large human trials",
                            "FDA approval is required before selling any medicine in the US",
                            "Insurance coverage determines how much money drugs can make"
                        ]
                    },
                    intermediate: {
                        explanation: "Healthcare finance centers on risk-adjusted NPV calculations for drug development programs. Clinical trial success rates vary by phase (63% Phase I, 31% Phase II, 58% Phase III), requiring probability-weighted modeling. Regulatory pathways and reimbursement dynamics significantly impact commercial potential.",
                        realWorldExample: "Moderna's mRNA platform reduced COVID vaccine development time from typical 10+ years to 11 months. Their $18.5B in 2021 COVID vaccine revenue demonstrates the commercial potential of successful drug development, though most biotech companies have multiple failures before success.",
                        keyTakeaways: [
                            "Drug development requires risk-adjusted financial modeling due to high failure rates",
                            "Regulatory approval timelines significantly impact NPV calculations",
                            "Reimbursement coverage and pricing directly determine commercial success"
                        ]
                    },
                    pro: {
                        explanation: "Advanced healthcare finance requires Monte Carlo simulation modeling for pipeline valuation, incorporating regulatory risk, competitive dynamics, and peak sales probability distributions. Key considerations include patent life optimization, biosimilar competition timing, and payer negotiation strategies across different therapeutic areas.",
                        realWorldExample: "Gilead's Sovaldi hepatitis C treatment achieved $46B in cumulative sales despite initial $1,000/pill pricing controversy. The drug's 95%+ cure rate and reduced long-term healthcare costs justified premium pricing, demonstrating how health economic value drives reimbursement decisions.",
                        keyTakeaways: [
                            "Pipeline valuation requires sophisticated probability modeling across multiple risk factors",
                            "Health economic outcomes increasingly drive payer coverage and pricing decisions",
                            "Patent strategy and exclusivity periods are critical for maximizing commercial returns"
                        ]
                    }
                }
            },
            { 
                level: 2, 
                focusArea: "Healthcare Business Models", 
                sampleTopics: ["Pharma vs biotech", "medical devices", "hospitals", "insurance", "PBMs"],
                interactiveContent: {
                    beginner: {
                        explanation: "Healthcare has different types of businesses like a big medical mall! Big pharma companies (like Johnson & Johnson) make lots of different medicines. Biotech companies (like Moderna) focus on new, cutting-edge treatments. Medical device companies make equipment like heart monitors. Hospitals provide care, and insurance companies pay the bills.",
                        realWorldExample: "Pfizer (big pharma) makes hundreds of different medicines from Advil to vaccines. Moderna (biotech) focuses mainly on mRNA technology. Medtronic makes medical devices like pacemakers. Kaiser Permanente runs hospitals and insurance together.",
                        keyTakeaways: [
                            "Big pharma = large companies with many different drugs",
                            "Biotech = smaller companies focused on new technology",
                            "Each part of healthcare makes money differently"
                        ]
                    },
                    intermediate: {
                        explanation: "Healthcare business models vary significantly in risk profiles, capital requirements, and revenue recognition. Pharmaceutical companies benefit from patent protection and global markets, while biotech focuses on novel mechanisms with higher risk/reward. Medical devices often have recurring revenue through replacement cycles and consumables.",
                        realWorldExample: "Abbott's diversified model includes pharmaceuticals, medical devices, diagnostics, and nutrition, providing stability through different end markets. In contrast, biotech companies like Biogen concentrate on specific therapeutic areas like neurology, creating higher risk but potential for breakthrough innovations.",
                        keyTakeaways: [
                            "Diversified healthcare models provide stability but may limit upside potential",
                            "Specialized models offer higher returns but increase concentration risk",
                            "Revenue recognition varies significantly across healthcare subsectors"
                        ]
                    },
                    pro: {
                        explanation: "Healthcare business model analysis requires understanding value-based care transitions, biosimilar competition dynamics, and regulatory pathway optimization. Platform approaches that leverage common technologies across multiple indications provide optimal risk-adjusted returns. Vertical integration strategies can capture more value chain economics.",
                        realWorldExample: "Danaher's life sciences platform leverages common technologies across drug discovery, development, and manufacturing tools, enabling cross-selling and recurring revenue. Their 2019 acquisition of GE Biopharma for $21B created synergies through combined customer relationships and technological capabilities.",
                        keyTakeaways: [
                            "Platform businesses in healthcare can leverage technology across multiple applications",
                            "Vertical integration captures additional value chain economics",
                            "Recurring revenue models provide more predictable cash flows than one-time product sales"
                        ]
                    }
                }
            },
            { 
                level: 3, 
                focusArea: "Healthcare Analysis", 
                sampleTopics: ["Pipeline valuation", "patent cliffs", "regulatory risks", "competitive dynamics"],
                interactiveContent: {
                    beginner: {
                        explanation: "Analyzing healthcare companies is like being a medical detective! We look at what new medicines they're developing (pipeline), when their existing drug patents expire (patent cliff - like when generic versions can compete), and what risks they face from regulators and competitors.",
                        realWorldExample: "When Pfizer's Lipitor patent expired in 2011, generic versions entered the market and Pfizer's sales dropped from $13 billion to $2 billion in just two years. That's why companies always need new drugs in development to replace the old ones.",
                        keyTakeaways: [
                            "Pipeline = new drugs in development that could make future money",
                            "Patent expiration lets generic competitors enter and cut profits",
                            "Companies need constant innovation to stay successful"
                        ]
                    },
                    intermediate: {
                        explanation: "Healthcare analysis requires assessing clinical trial probability of success, competitive positioning, and patent protection strength. Pipeline valuation uses risk-adjusted NPV models, while patent cliff analysis examines revenue decline timing and management mitigation strategies. Regulatory environment changes can significantly impact entire therapeutic areas.",
                        realWorldExample: "Biogen's Alzheimer's drug Aduhelm received controversial FDA approval in 2021 despite mixed clinical data, leading to Medicare coverage restrictions and commercial disappointment. This demonstrates how regulatory and reimbursement risks can derail even approved products.",
                        keyTakeaways: [
                            "Clinical trial success rates vary significantly by therapeutic area and development phase",
                            "Patent cliff timing and magnitude can be modeled but competitive response varies",
                            "Regulatory approval doesn't guarantee commercial success without payer coverage"
                        ]
                    },
                    pro: {
                        explanation: "Advanced healthcare analysis employs competitive intelligence, physician surveys, and real-world evidence analysis to assess commercial potential. Key considerations include treatment paradigm shifts, biosimilar erosion patterns, and health economic value propositions. Pipeline analysis should incorporate platform potential and lifecycle management strategies.",
                        realWorldExample: "Keytruda's success demonstrates platform potential - Merck's PD-1 inhibitor expanded from melanoma to 30+ indications, reaching $17B+ in annual sales. Their early investment in combination studies and biomarker development created competitive advantages versus Bristol Myers Squibb's Opdivo.",
                        keyTakeaways: [
                            "Platform technologies can create multiple revenue streams from single innovations",
                            "Early competitive positioning in emerging therapeutic areas drives long-term market share",
                            "Real-world evidence and health economics increasingly influence adoption and pricing"
                        ]
                    }
                }
            },
            { 
                level: 4, 
                focusArea: "Healthcare Investing Skills", 
                sampleTopics: ["DCF for pharma", "probability-adjusted models", "comp analysis", "ESG factors"],
                interactiveContent: {
                    beginner: {
                        explanation: "Investing in healthcare companies requires special math because drug development is risky! We calculate what drugs might be worth IF they succeed, then multiply by the chance they'll actually work. We also compare similar companies and consider if they're doing good things for society (ESG).",
                        realWorldExample: "If a new cancer drug has a 30% chance of FDA approval and could make $1 billion per year if successful, we might value it at $300 million (30% × $1 billion). We'd compare this to similar cancer drug companies to see if the stock price makes sense.",
                        keyTakeaways: [
                            "Healthcare investing requires probability math because most drugs fail",
                            "Compare companies with similar diseases or drug types",
                            "Consider if companies help patients and society, not just profits"
                        ]
                    },
                    intermediate: {
                        explanation: "Healthcare DCF modeling requires risk-adjusting cash flows for clinical, regulatory, and commercial risks. Probability-weighted models incorporate different scenarios for clinical trial outcomes, competitive dynamics, and pricing pressures. Comparable analysis should focus on companies with similar development stages, therapeutic focus, and commercial characteristics.",
                        realWorldExample: "Valuing Moderna in 2020 required modeling multiple mRNA programs with different risk profiles. Their COVID vaccine success validated the platform, but other programs like CMV vaccine carry different probability assumptions and market potential, requiring separate risk-adjusted valuations.",
                        keyTakeaways: [
                            "Risk-adjusted DCF models are essential for biotech and pipeline-heavy pharma companies",
                            "Multiple scenario analysis helps capture uncertainty in clinical and commercial outcomes",
                            "Platform technologies require modeling synergies across multiple development programs"
                        ]
                    },
                    pro: {
                        explanation: "Advanced healthcare investing requires sophisticated option-based valuation methods for early-stage assets, Monte Carlo simulation for portfolio companies, and deep understanding of regulatory precedents. ESG considerations include drug pricing sustainability, access programs, and R&D allocation to neglected diseases.",
                        realWorldExample: "Investing in Vertex during cystic fibrosis drug development required understanding rare disease economics, regulatory pathways, and patient advocacy dynamics. Their success with Kalydeco, Orkambi, and Trikafta demonstrates how specialized expertise in rare diseases can create sustainable competitive advantages.",
                        keyTakeaways: [
                            "Specialized therapeutic expertise creates competitive advantages in healthcare investing",
                            "Real options valuation methods better capture value of early-stage development programs",
                            "ESG factors increasingly impact healthcare investment returns through pricing and regulatory pressure"
                        ]
                    }
                }
            },
            { 
                level: 5, 
                focusArea: "Healthcare in Practice", 
                sampleTopics: ["Notable deals", "breakthrough drugs", "digital health", "policy impacts"],
                interactiveContent: {
                    beginner: {
                        explanation: "Real healthcare stories show us how the industry works! COVID vaccines were developed super fast and made huge profits. Digital health apps became popular during the pandemic. Big companies buy smaller ones to get new technologies. Government policies can help or hurt healthcare companies.",
                        realWorldExample: "Pfizer partnered with BioNTech to make COVID vaccines, earning $37 billion in 2021. Teladoc (virtual doctor visits) grew rapidly during lockdowns. Bristol Myers Squibb bought Celgene for $74 billion to get cancer drugs. Medicare drug price negotiations worry pharmaceutical companies.",
                        keyTakeaways: [
                            "Partnerships can help companies develop drugs faster",
                            "Health crises create opportunities for some companies",
                            "Government policies significantly impact healthcare profits"
                        ]
                    },
                    intermediate: {
                        explanation: "Healthcare case studies reveal strategic decision-making, risk management, and value creation principles. Breakthrough drug development often requires patient capital and specialized expertise. Digital health adoption accelerated due to COVID but faces reimbursement and regulatory challenges. M&A activity focuses on pipeline enhancement and capability acquisition.",
                        realWorldExample: "Gilead's $21B acquisition of Immunomedics in 2020 for Trodelvy demonstrated willingness to pay premium multiples for late-stage oncology assets. The deal provided immediate revenue diversification and complemented Gilead's existing oncology portfolio development.",
                        keyTakeaways: [
                            "Healthcare M&A often focuses on pipeline enhancement rather than cost synergies",
                            "Digital health requires different business models and reimbursement strategies than traditional healthcare",
                            "Breakthrough drug development success requires long-term commitment and specialized capabilities"
                        ]
                    },
                    pro: {
                        explanation: "Healthcare industry evolution demonstrates the importance of technological platform development, strategic partnerships, and regulatory relationship management. Successful companies balance innovation investment with commercial execution, while failed cases often involve overestimation of market size or underestimation of competitive response.",
                        realWorldExample: "CAR-T therapy development by Novartis (Kymriah) and Gilead (Yescarta) required investments exceeding $10B combined, with manufacturing complexity and patient access challenges limiting initial commercial success despite breakthrough designation and premium pricing above $400K per treatment.",
                        keyTakeaways: [
                            "Breakthrough technologies often require ecosystem development beyond individual company capabilities",
                            "Regulatory strategy and relationship management become competitive advantages",
                            "Commercial execution challenges can limit returns even for breakthrough innovations"
                        ]
                    }
                }
            },
            { 
                level: 6, 
                focusArea: "Healthcare & Macro Trends", 
                sampleTopics: ["Aging demographics", "healthcare spending", "global health", "innovation cycles"],
                interactiveContent: {
                    beginner: {
                        explanation: "Big picture trends shape healthcare! As people get older, they need more medical care, which is good for healthcare companies. Healthcare spending keeps growing faster than the economy. Global health problems affect everyone. New innovations come in waves - like how computers changed everything, now AI is changing healthcare.",
                        realWorldExample: "Baby boomers (people born 1946-1964) are getting older and need more healthcare, driving demand for everything from joint replacements to Alzheimer's treatments. Healthcare now accounts for about 18% of US economy, up from 5% in 1960.",
                        keyTakeaways: [
                            "Aging population creates long-term growth for healthcare",
                            "Healthcare spending grows faster than the overall economy",
                            "New technologies create waves of opportunity"
                        ]
                    },
                    intermediate: {
                        explanation: "Healthcare macro trends create secular growth opportunities and investment themes. Demographic shifts drive demand for age-related therapeutics and medical devices. Healthcare spending sustainability concerns drive value-based care adoption and cost containment efforts. Innovation cycles create opportunities for platform technologies and breakthrough treatments.",
                        realWorldExample: "The 65+ population will double from 46M to 95M by 2060, driving demand for Alzheimer's treatments, orthopedic devices, and chronic disease management. This demographic shift supports long-term growth for companies like Intuitive Surgical (robotic surgery) and Dexcom (diabetes monitoring).",
                        keyTakeaways: [
                            "Demographic trends provide predictable long-term growth drivers for specific healthcare segments",
                            "Healthcare cost containment efforts create opportunities for efficiency-enhancing technologies",
                            "Innovation cycles often span decades from initial research to widespread adoption"
                        ]
                    },
                    pro: {
                        explanation: "Healthcare macro analysis requires understanding healthcare economics, regulatory cycles, and technological disruption patterns. Key considerations include healthcare affordability sustainability, global health security implications, and the intersection of demographics with technological capability. Investment implications vary significantly across subsectors and geographies.",
                        realWorldExample: "China's aging population and rising healthcare spending create opportunities for multinational healthcare companies, but regulatory complexity and local competition require careful market entry strategies. Companies like Eli Lilly and AstraZeneca have invested billions in local partnerships and manufacturing capabilities.",
                        keyTakeaways: [
                            "Global demographic and economic trends create differentiated regional opportunities",
                            "Healthcare policy cycles significantly impact sector returns and require political risk assessment",
                            "Technological disruption patterns in healthcare often follow S-curves with long development periods followed by rapid adoption"
                        ]
                    }
                }
            },
            { 
                level: 7, 
                focusArea: "Healthcare Careers", 
                sampleTopics: ["Analyst roles", "case studies", "industry networking", "specialized knowledge"],
                interactiveContent: {
                    beginner: {
                        explanation: "Healthcare careers combine science and business! Analysts need to understand both medicine and money. You might read medical journals, talk to doctors, visit hospitals, and analyze financial reports. Many people specialize in specific areas like cancer drugs or medical devices because there's so much to learn.",
                        realWorldExample: "A biotech analyst might spend Monday reading about a new Alzheimer's drug trial, Tuesday talking to doctors about how they treat patients, Wednesday analyzing the company's finances, and Thursday writing a report about whether investors should buy the stock.",
                        keyTakeaways: [
                            "Healthcare careers require both scientific and financial knowledge",
                            "Talking to doctors and patients helps understand the real world",
                            "Most people specialize in specific areas of healthcare"
                        ]
                    },
                    intermediate: {
                        explanation: "Healthcare sector careers require developing clinical knowledge, regulatory expertise, and financial modeling skills. Success depends on building relationships with key opinion leaders, understanding treatment paradigms, and staying current with scientific literature. Specialization in specific therapeutic areas becomes essential for career advancement.",
                        realWorldExample: "Top healthcare analysts develop expertise in specific areas like oncology, neurology, or rare diseases. They attend medical conferences, maintain relationships with physician investigators, and build proprietary databases on clinical trial outcomes and competitive dynamics.",
                        keyTakeaways: [
                            "Clinical knowledge development distinguishes successful healthcare investors from generalists",
                            "Industry relationships with physicians and researchers provide competitive advantages",
                            "Therapeutic area specialization becomes essential for generating differentiated insights"
                        ]
                    },
                    pro: {
                        explanation: "Senior healthcare roles require deep therapeutic area expertise, ability to identify paradigm shifts, and skill in evaluating management teams and scientific advisory boards. Career advancement depends on developing unique analytical frameworks, building institutional credibility, and generating superior risk-adjusted returns through cycle management and stock selection.",
                        realWorldExample: "Leading healthcare investors like Behrad Aghazadeh (Venrock) and OrbiMed partners combine scientific training with investment expertise. Their success stems from early identification of breakthrough technologies, strategic thinking about healthcare system evolution, and ability to evaluate management teams in highly technical contexts.",
                        keyTakeaways: [
                            "Scientific training provides foundational advantages in healthcare investing careers",
                            "Understanding healthcare system evolution helps identify long-term investment themes",
                            "Management team evaluation requires assessment of both business and scientific capabilities"
                        ]
                    }
                }
            }
        ]
    },
    {
        id: "technology",
        name: "Technology & Software",
        icon: <Smartphone />,
        description: "Technology companies develop software, hardware, cloud services, and digital platforms that power modern business and consumer applications.",
        overview: "The tech sector drives digital transformation across all industries. It includes software companies, hardware manufacturers, cloud providers, cybersecurity firms, and platform businesses.",
        howItWorks: "Revenue models include software licensing, subscription services, hardware sales, advertising, and platform commissions. Success depends on innovation, user adoption, network effects, and scalability.",
        futureOutlook: "Quantum computing will solve complex problems beyond current capabilities. Edge computing will enable real-time processing for IoT devices. Augmented reality will merge digital and physical worlds, while blockchain technology will create new decentralized business models and digital economies.",
        levels: [
            { 
                level: 1, 
                focusArea: "Tech Finance Basics", 
                sampleTopics: ["SaaS metrics", "user acquisition", "churn rate", "platform effects", "cloud computing"],
                interactiveContent: {
                    beginner: {
                        explanation: "Tech companies make money differently than traditional businesses! SaaS (Software as a Service) companies like Netflix or Spotify charge monthly fees. They care about getting new users (acquisition) and keeping them (low churn rate). Platform companies like Facebook get more valuable as more people use them (network effects).",
                        realWorldExample: "Netflix spends billions on new shows to attract subscribers (user acquisition) and keep existing ones happy (reduce churn). Each new subscriber makes the service more valuable because they can spread content costs across more people.",
                        keyTakeaways: [
                            "SaaS = Software as a Service, usually paid monthly/yearly",
                            "Churn rate = how many customers leave each month",
                            "Network effects = service gets better with more users"
                        ]
                    },
                    intermediate: {
                        explanation: "Technology financial metrics focus on recurring revenue quality, customer lifetime value, and scalability. SaaS businesses emphasize ARR growth, net revenue retention, and payback periods. Platform businesses benefit from network effects, creating winner-take-all dynamics and high margins at scale.",
                        realWorldExample: "Salesforce's 105%+ net revenue retention demonstrates customer expansion within existing accounts. Their $26B ARR growing 20%+ annually shows the power of recurring revenue models. Platform effects helped Facebook reach 40%+ operating margins through advertising scale.",
                        keyTakeaways: [
                            "Recurring revenue provides predictable cash flows and higher valuations",
                            "Customer expansion metrics indicate product stickiness and market opportunity",
                            "Platform businesses achieve superior margins through network effects and scale"
                        ]
                    },
                    pro: {
                        explanation: "Advanced tech finance requires cohort analysis, unit economics modeling, and platform ecosystem valuation. Key considerations include customer acquisition cost trends, lifetime value expansion potential, and competitive moat sustainability. Cloud migration and digital transformation drive secular growth across enterprise software categories.",
                        realWorldExample: "Microsoft's transformation to cloud-first strategy increased enterprise value from $300B to $2T+ through Office 365 and Azure growth. Their ability to expand from productivity software to comprehensive cloud platform demonstrates the power of ecosystem strategy and customer relationship leverage.",
                        keyTakeaways: [
                            "Cohort analysis reveals true unit economics and customer behavior patterns",
                            "Platform ecosystem strategies create multiple revenue streams and defensive moats",
                            "Cloud transformation enables software companies to achieve higher margins and valuations"
                        ]
                    }
                }
            },
            { 
                level: 2, 
                focusArea: "Tech Business Models", 
                sampleTopics: ["Subscription vs licensing", "freemium models", "platform businesses", "hardware vs software"],
                interactiveContent: {
                    beginner: {
                        explanation: "Tech companies have different ways to make money, like different types of lemonade stands! Subscription is like a monthly club (Netflix). Licensing is selling the recipe once (Microsoft Office old way). Freemium gives basic stuff free, charges for premium (Spotify). Platforms let others sell and take a cut (App Store).",
                        realWorldExample: "Spotify uses freemium - free with ads, or pay $10/month for no ads. Apple's App Store is a platform - they take 30% of what other companies sell. Adobe switched from selling software once to monthly subscriptions, making much more money.",
                        keyTakeaways: [
                            "Subscription = pay monthly/yearly for ongoing access",
                            "Freemium = basic free, advanced features cost money", 
                            "Platform = take a percentage of others' transactions"
                        ]
                    },
                    intermediate: {
                        explanation: "Technology business models optimize for different customer acquisition strategies, revenue predictability, and competitive positioning. Subscription models provide recurring revenue but require continuous value delivery. Freemium models optimize conversion funnels from free to paid users. Platform models benefit from network effects and marketplace dynamics.",
                        realWorldExample: "Zoom's freemium model converted millions of free users to paid during COVID. Their subscription revenue grew from $623M to $4B+ in two years. Conversely, Shopify's platform model takes percentage of merchant sales, aligning their success with customer success.",
                        keyTakeaways: [
                            "Subscription models require ongoing customer value creation and retention focus",
                            "Freemium conversion optimization drives customer acquisition efficiency",
                            "Platform models create alignment between company success and customer success"
                        ]
                    },
                    pro: {
                        explanation: "Technology business model selection impacts unit economics, scalability, and competitive dynamics. Hybrid approaches combining multiple models can optimize for different customer segments and use cases. Key considerations include pricing power sustainability, switching costs, and ecosystem development potential.",
                        realWorldExample: "Amazon Web Services combines multiple models: infrastructure-as-a-service (usage-based), platform services (transaction-based), and marketplace (commission-based). This diversification creates multiple expansion opportunities and reduces reliance on any single revenue stream.",
                        keyTakeaways: [
                            "Hybrid business models can optimize for different customer segments and use cases",
                            "Model evolution should align with customer value creation and market maturity",
                            "Ecosystem development strategies create long-term competitive advantages"
                        ]
                    }
                }
            },
            { 
                level: 3, 
                focusArea: "Tech Analysis", 
                sampleTopics: ["Growth metrics", "unit economics", "competitive moats", "disruption risks"],
                interactiveContent: {
                    beginner: {
                        explanation: "Analyzing tech companies is like being a detective for the digital world! We look at how fast they're growing, whether they make money on each customer (unit economics), what protects them from competition (moats), and what new technologies might hurt them (disruption risks).",
                        realWorldExample: "Google has strong moats because everyone uses their search engine, making it better with more data. But AI chatbots like ChatGPT could disrupt search. Apple makes lots of money per iPhone sold (good unit economics) and has loyal customers who won't switch easily.",
                        keyTakeaways: [
                            "Growth metrics show if a tech company is gaining users/revenue",
                            "Unit economics = profit per customer or transaction",
                            "Moats protect companies from competitors"
                        ]
                    },
                    intermediate: {
                        explanation: "Technology analysis requires evaluating growth sustainability, competitive positioning, and disruption vulnerability. Key metrics include customer acquisition costs, lifetime value ratios, and market share trends. Competitive moats in tech often derive from network effects, switching costs, or data advantages.",
                        realWorldExample: "Tesla's competitive moats include supercharger network (switching costs), manufacturing scale (cost advantages), and autonomous driving data (data network effects). However, traditional automakers and new EV entrants create competitive pressure requiring continuous innovation.",
                        keyTakeaways: [
                            "Sustainable growth requires favorable unit economics and expanding market opportunities",
                            "Technology moats often derive from network effects and data advantages",
                            "Disruption risk assessment requires understanding technology evolution cycles"
                        ]
                    },
                    pro: {
                        explanation: "Advanced technology analysis employs ecosystem mapping, platform strategy assessment, and technology lifecycle modeling. Key frameworks include S-curve analysis for technology adoption, competitive response modeling, and strategic optionality valuation. Market leadership positions create winner-take-all dynamics in many technology categories.",
                        realWorldExample: "NVIDIA's GPU leadership in AI training created ecosystem advantages through CUDA software platform, developer relationships, and hardware-software optimization. Their ability to expand from gaming to data center applications demonstrates platform strategy execution and technology leverage.",
                        keyTakeaways: [
                            "Technology leadership often creates ecosystem advantages and platform opportunities",
                            "Winner-take-all dynamics in technology markets reward scale and network effects",
                            "Strategic optionality in technology platforms can create multiple expansion paths"
                        ]
                    }
                }
            },
            { 
                level: 4, 
                focusArea: "Tech Investing Skills", 
                sampleTopics: ["Revenue forecasting", "TAM analysis", "cohort analysis", "valuation multiples"],
                interactiveContent: {
                    beginner: {
                        explanation: "Investing in tech companies requires special skills because they grow differently! We predict future sales (revenue forecasting), estimate how big the market could be (TAM), track how groups of customers behave over time (cohort analysis), and compare prices to similar companies (valuation multiples).",
                        realWorldExample: "When Zoom went public, investors had to estimate how many people might use video calls (TAM), predict how fast they'd grow, and compare their price to other software companies. COVID made their market much bigger than expected!",
                        keyTakeaways: [
                            "Revenue forecasting = predicting future sales growth",
                            "TAM = Total Addressable Market, how big the opportunity is",
                            "Compare tech companies to similar ones for fair pricing"
                        ]
                    },
                    intermediate: {
                        explanation: "Technology investing requires sophisticated modeling of adoption curves, competitive dynamics, and market expansion potential. TAM analysis should consider market creation versus market share capture. Cohort analysis reveals customer behavior patterns and lifetime value trends critical for SaaS valuation.",
                        realWorldExample: "Evaluating Snowflake required modeling cloud data warehouse market growth, competitive positioning versus Amazon Redshift, and customer consumption patterns. Their consumption-based model created different forecasting challenges than traditional SaaS subscription models.",
                        keyTakeaways: [
                            "Technology markets often expand beyond initial TAM estimates through innovation",
                            "Consumption-based models require different forecasting approaches than subscription models",
                            "Competitive positioning analysis must consider both direct and indirect competition"
                        ]
                    },
                    pro: {
                        explanation: "Advanced technology investing employs real options valuation, scenario analysis, and ecosystem effect modeling. Key considerations include technology platform potential, switching cost sustainability, and network effect defensibility. Valuation approaches should incorporate both growth and optionality components.",
                        realWorldExample: "Investing in Amazon in early 2000s required recognizing e-commerce platform potential beyond book sales, cloud computing optionality through AWS, and advertising platform development. Multi-decade investment horizon and scenario planning were essential for capturing full value creation.",
                        keyTakeaways: [
                            "Technology platform investments often create multiple optionality paths",
                            "Long-term scenario planning captures value creation beyond base case projections",
                            "Ecosystem effects can create value multipliers significantly exceeding sum-of-parts analysis"
                        ]
                    }
                }
            },
            { 
                level: 5, 
                focusArea: "Tech in Practice", 
                sampleTopics: ["IPO case studies", "M&A activity", "venture capital", "startup ecosystems"],
                interactiveContent: {
                    beginner: {
                        explanation: "Real tech stories teach us the most! Some companies go public (IPO) and become huge successes or failures. Big companies buy smaller ones to get new technology (M&A). Venture capital firms invest in startups hoping to find the next Google. Silicon Valley became famous for creating tech companies.",
                        realWorldExample: "Facebook bought Instagram for $1 billion in 2012 (seemed expensive then!), now it's worth much more. Google went public in 2004 at $85/share, now over $2,500/share. Many startups fail, but successes like Uber and Airbnb made early investors very rich.",
                        keyTakeaways: [
                            "IPOs let private companies sell shares to public investors",
                            "M&A helps big companies acquire new technology and talent",
                            "Most startups fail, but winners create enormous value"
                        ]
                    },
                    intermediate: {
                        explanation: "Technology industry case studies reveal strategic decision-making patterns, valuation methodology evolution, and competitive dynamics. IPO timing often depends on market conditions and growth trajectory sustainability. M&A activity focuses on talent acquisition, technology integration, and market expansion strategies.",
                        realWorldExample: "Microsoft's $26B LinkedIn acquisition in 2016 demonstrated strategic thinking about professional networks and productivity software integration. The deal's success through Teams integration and advertising growth validated the thesis of ecosystem expansion beyond pure financial metrics.",
                        keyTakeaways: [
                            "Strategic acquisitions often focus on capability and ecosystem expansion rather than pure financial returns",
                            "IPO success depends on growth story credibility and market timing",
                            "Technology M&A integration success requires cultural and technical compatibility"
                        ]
                    },
                    pro: {
                        explanation: "Technology industry evolution demonstrates the importance of platform thinking, ecosystem development, and strategic patience. Successful companies often reinvent themselves multiple times, while failures typically result from inability to adapt to platform shifts or competitive response inadequacy.",
                        realWorldExample: "Apple's transformation from computer company to mobile platform to services ecosystem required multiple strategic pivots and massive R&D investment. Their ability to integrate hardware, software, and services created competitive advantages that enabled premium pricing and customer loyalty.",
                        keyTakeaways: [
                            "Technology leaders must continuously reinvent their business models to maintain relevance",
                            "Platform strategies create multiple revenue streams and competitive moats",
                            "Ecosystem integration capabilities become crucial competitive advantages"
                        ]
                    }
                }
            },
            { 
                level: 6, 
                focusArea: "Tech & Innovation Cycles", 
                sampleTopics: ["Adoption curves", "platform shifts", "regulatory challenges", "global competition"],
                interactiveContent: {
                    beginner: {
                        explanation: "Technology changes in big waves! New technologies start slow, then grow super fast, then slow down again (adoption curves). Sometimes whole platforms change - like when smartphones replaced computers for many things. Governments make rules that affect tech companies, and countries compete to have the best tech industries.",
                        realWorldExample: "Smartphones followed this pattern: first few people had them (early 2000s), then everyone bought them quickly (2007-2015), now growth is slower because most people already have one. AI is probably in the early fast-growth part now.",
                        keyTakeaways: [
                            "Technology adoption follows predictable S-curve patterns",
                            "Platform shifts create new winners and losers",
                            "Government regulation significantly impacts tech companies"
                        ]
                    },
                    intermediate: {
                        explanation: "Technology innovation cycles create investment opportunities through timing of adoption curves and platform transitions. Early identification of inflection points provides superior returns, while late-cycle investments face saturation and competitive pressure. Regulatory responses often follow innovation with significant lag, creating policy uncertainty.",
                        realWorldExample: "Cloud computing adoption accelerated during COVID, benefiting companies like Zoom, Slack, and cloud infrastructure providers. However, regulatory scrutiny of big tech platforms increased simultaneously, creating headwinds for companies like Facebook and Google through antitrust investigations.",
                        keyTakeaways: [
                            "Innovation cycle timing significantly impacts investment returns and competitive positioning",
                            "Platform transitions create opportunities for new entrants and risks for incumbents",
                            "Regulatory cycles often lag innovation cycles, creating period of uncertainty"
                        ]
                    },
                    pro: {
                        explanation: "Technology cycle analysis requires understanding adoption diffusion models, competitive response patterns, and regulatory intervention probabilities. Key considerations include network effect sustainability, platform shift vulnerability, and global technology competition dynamics. Investment strategies should account for multiple overlapping cycles.",
                        realWorldExample: "China's technology development strategy through companies like ByteDance (TikTok) and semiconductor investments demonstrates how geopolitical competition affects technology markets. US response through export controls and investment restrictions creates new risk factors for technology companies and investors.",
                        keyTakeaways: [
                            "Technology competition increasingly occurs at national and geopolitical levels",
                            "Multiple innovation cycles often overlap, creating complex strategic environments",
                            "Regulatory intervention probability increases with technology platform market power"
                        ]
                    }
                }
            },
            { 
                level: 7, 
                focusArea: "Tech Careers", 
                sampleTopics: ["Analyst roles", "technical due diligence", "growth investing", "venture capital"],
                interactiveContent: {
                    beginner: {
                        explanation: "Tech careers combine understanding technology with business skills! Analysts need to understand how technology works AND whether companies can make money from it. Some focus on public companies (growth investing), others on startups (venture capital). You might evaluate new apps, AI companies, or cloud services.",
                        realWorldExample: "A tech analyst might spend time learning about artificial intelligence, then analyze which AI companies are best investments. Venture capitalists meet with startup founders, understand their technology, and decide which ones to fund. Both need to understand technology trends and business models.",
                        keyTakeaways: [
                            "Tech careers require both technical and business knowledge",
                            "Public market analysts focus on established tech companies",
                            "Venture capital focuses on early-stage startups"
                        ]
                    },
                    intermediate: {
                        explanation: "Technology sector careers require developing technical competency, understanding competitive dynamics, and building industry networks. Success depends on identifying emerging trends early, evaluating management teams' execution capabilities, and understanding technology adoption patterns across different customer segments.",
                        realWorldExample: "Top technology investors like Mary Meeker and Marc Andreessen combine technical understanding with market timing and pattern recognition. Their success stems from early identification of internet, mobile, and cloud computing trends, plus ability to evaluate management teams in rapidly evolving markets.",
                        keyTakeaways: [
                            "Technology investing success requires early trend identification and pattern recognition",
                            "Technical competency development distinguishes successful technology investors",
                            "Management team evaluation must assess both technical and commercial execution capabilities"
                        ]
                    },
                    pro: {
                        explanation: "Senior technology roles require deep sector expertise, ability to identify paradigm shifts, and skill in evaluating complex technical and competitive landscapes. Career advancement depends on developing unique analytical frameworks, building relationships with entrepreneurs and technical talent, and generating superior returns through innovation cycle management.",
                        realWorldExample: "Leading technology investors like Sequoia Capital and Andreessen Horowitz built their success through pattern recognition across multiple technology cycles, relationships with entrepreneur networks, and ability to provide strategic value beyond capital. Their portfolio construction reflects understanding of technology platform evolution and market timing.",
                        keyTakeaways: [
                            "Technology investing success requires pattern recognition across multiple innovation cycles",
                            "Value-add capabilities beyond capital become increasingly important in competitive markets",
                            "Portfolio construction must balance growth potential with technology and market risks"
                        ]
                    }
                }
            }
        ]
    },
    {
        id: "artificial-intelligence",
        name: "Artificial Intelligence",
        icon: <BrainCircuit />,
        description: "AI companies develop machine learning algorithms, neural networks, and intelligent systems that can perform tasks traditionally requiring human intelligence.",
        overview: "The AI sector includes companies building foundational AI models, AI-powered applications, autonomous systems, and AI infrastructure. It spans across multiple industries from healthcare to finance to transportation.",
        howItWorks: "Revenue comes from AI software licensing, cloud-based AI services, data analytics platforms, and AI-enhanced products. Success depends on data quality, computing power, talent acquisition, and practical applications.",
        futureOutlook: "Artificial General Intelligence (AGI) will emerge within the next decade, potentially revolutionizing every industry. AI will become embedded in all software applications as a standard feature. Autonomous systems will transform transportation, manufacturing, and service industries, while AI governance and ethics will become critical business considerations.",
        levels: [
            { 
                level: 1, 
                focusArea: "AI Finance Basics", 
                sampleTopics: ["Machine learning", "neural networks", "data monetization", "compute costs", "AI infrastructure"],
                interactiveContent: {
                    beginner: {
                        explanation: "AI is like teaching computers to think and learn! Machine learning means computers get better at tasks by practicing with lots of examples, like how you get better at video games. Neural networks are inspired by how brains work. Companies make money by selling AI services or using AI to make their products better.",
                        realWorldExample: "ChatGPT learned by reading millions of books and websites, then got better at writing by practicing. OpenAI charges people to use it. Netflix uses AI to recommend movies you might like, keeping you subscribed longer.",
                        keyTakeaways: [
                            "Machine learning = computers learning from examples to get better",
                            "AI companies make money by selling AI services or improving products",
                            "Good AI needs lots of data and computing power"
                        ]
                    },
                    intermediate: {
                        explanation: "AI business models center on data network effects, computational scale advantages, and application-specific value creation. Revenue streams include AI-as-a-Service platforms, data analytics subscriptions, and AI-enhanced product licensing. Success requires substantial upfront investment in model development, data acquisition, and computational infrastructure.",
                        realWorldExample: "OpenAI's ChatGPT required estimated $100M+ in training costs but generated $1.6B+ annualized revenue within a year of launch. Their API platform enables other companies to integrate AI capabilities, creating ecosystem effects and recurring revenue streams.",
                        keyTakeaways: [
                            "AI development requires significant upfront investment in training and infrastructure",
                            "Data network effects create competitive advantages as models improve with more usage",
                            "API platforms enable ecosystem development and recurring revenue generation"
                        ]
                    },
                    pro: {
                        explanation: "AI finance requires understanding computational economics, data acquisition costs, and model scaling dynamics. Key considerations include training versus inference cost structures, model performance improvement curves, and competitive moat sustainability through data advantages or algorithmic innovation.",
                        realWorldExample: "NVIDIA's AI infrastructure dominance through GPU architecture and CUDA software platform created 80%+ market share in AI training. Their gross margins exceeding 70% reflect the value of computational bottlenecks and ecosystem lock-in effects in AI development workflows.",
                        keyTakeaways: [
                            "AI infrastructure bottlenecks create significant value capture opportunities",
                            "Model scaling economics favor companies with computational and data advantages",
                            "AI competitive moats derive from data quality, algorithmic innovation, and ecosystem effects"
                        ]
                    }
                }
            },
            { 
                level: 2, 
                focusArea: "AI Business Models", 
                sampleTopics: ["AI-as-a-Service", "model licensing", "data platforms", "AI-enhanced products"],
                interactiveContent: {
                    beginner: {
                        explanation: "AI companies make money in different ways! AI-as-a-Service is like renting AI tools instead of buying them (like Netflix for AI). Model licensing means selling the 'brain' to other companies. Data platforms sell access to information. AI-enhanced products are regular products made smarter with AI.",
                        realWorldExample: "Google Cloud offers AI services you can rent by the hour. OpenAI licenses their GPT models to companies like Microsoft. Palantir sells data analysis platforms to governments. Tesla sells cars with AI-powered self-driving features.",
                        keyTakeaways: [
                            "AI-as-a-Service = renting AI capabilities instead of building them",
                            "Model licensing = selling AI 'brains' to other companies",
                            "AI enhances existing products to make them smarter"
                        ]
                    },
                    intermediate: {
                        explanation: "AI business models optimize for different customer acquisition strategies, usage patterns, and value capture mechanisms. SaaS models provide predictable revenue but require continuous model improvement. Licensing models enable rapid scaling but depend on partner success. Embedded AI models create product differentiation and pricing power.",
                        realWorldExample: "Snowflake's AI/ML platform generates revenue through data processing consumption, aligning pricing with customer value creation. Their Snowpark ML enables data scientists to build models directly on customer data, creating switching costs and usage expansion opportunities.",
                        keyTakeaways: [
                            "Consumption-based AI pricing models align costs with customer value creation",
                            "Platform approaches enable customer self-service and scaling efficiency",
                            "Embedded AI capabilities create product differentiation and pricing power"
                        ]
                    },
                    pro: {
                        explanation: "AI business model selection impacts competitive positioning, scalability, and value capture potential. Hybrid approaches combining multiple models can optimize for different customer segments and use cases. Key considerations include model portability, data ownership, and platform ecosystem development strategies.",
                        realWorldExample: "Microsoft's AI strategy combines multiple models: Azure AI services (consumption-based), Copilot integration (subscription enhancement), and OpenAI partnership (strategic investment). This diversification creates multiple revenue streams while building competitive moats through ecosystem integration.",
                        keyTakeaways: [
                            "AI platform strategies create multiple revenue streams and competitive advantages",
                            "Model integration capabilities become crucial for enterprise AI adoption",
                            "Data ownership and portability considerations significantly impact customer relationships"
                        ]
                    }
                }
            },
            { 
                level: 3, 
                focusArea: "AI Analysis", 
                sampleTopics: ["Model performance", "data quality", "competitive advantages", "regulatory risks"],
                interactiveContent: {
                    beginner: {
                        explanation: "Analyzing AI companies is like grading their robots! We look at how well their AI works (model performance), how good their training data is, what makes them special versus competitors, and what rules might hurt them. Good AI needs good data, like how good cooking needs good ingredients.",
                        realWorldExample: "ChatGPT performs better than older chatbots at writing, but Google's Bard has access to newer information. Both companies worry about new rules for AI safety. Tesla's self-driving data gets better as more people drive their cars.",
                        keyTakeaways: [
                            "Model performance = how well the AI actually works",
                            "Data quality is crucial - garbage in, garbage out",
                            "AI companies face increasing government regulation"
                        ]
                    },
                    intermediate: {
                        explanation: "AI analysis requires evaluating model capabilities, data moats, talent retention, and regulatory compliance costs. Performance metrics include accuracy, latency, and scalability across different use cases. Competitive advantages often derive from proprietary datasets, algorithmic innovation, or computational efficiency.",
                        realWorldExample: "DeepMind's AlphaFold protein prediction achieved breakthrough scientific impact, demonstrating model capability superiority. However, commercial applications require different performance metrics including inference speed, deployment costs, and integration complexity for enterprise customers.",
                        keyTakeaways: [
                            "AI performance evaluation must align with specific commercial applications and use cases",
                            "Proprietary datasets and algorithmic innovations create sustainable competitive advantages",
                            "Regulatory compliance costs increasingly impact AI business model economics"
                        ]
                    },
                    pro: {
                        explanation: "Advanced AI analysis employs technical due diligence frameworks, competitive landscape mapping, and regulatory scenario planning. Key considerations include model interpretability requirements, data privacy compliance, and algorithmic bias mitigation strategies. Competitive moat assessment requires understanding network effects, switching costs, and ecosystem dependencies.",
                        realWorldExample: "Anthropic's constitutional AI approach addresses regulatory concerns about AI safety and alignment, potentially creating competitive advantages as regulations tighten. Their focus on interpretability and safety could command premium pricing in regulated industries like healthcare and finance.",
                        keyTakeaways: [
                            "AI safety and interpretability capabilities may become key competitive differentiators",
                            "Regulatory compliance strategies significantly impact go-to-market approaches and costs",
                            "Technical due diligence requires deep understanding of AI architecture and capabilities"
                        ]
                    }
                }
            },
            { 
                level: 4, 
                focusArea: "AI Investing Skills", 
                sampleTopics: ["Technology assessment", "market sizing", "competitive positioning", "talent evaluation"],
                interactiveContent: {
                    beginner: {
                        explanation: "Investing in AI companies requires understanding both the technology and the business! We evaluate how good their AI is, estimate how big the market could be, figure out their competitive position, and assess if they have smart people. It's like judging a science fair project that could become a huge business.",
                        realWorldExample: "When evaluating an AI healthcare startup, we'd look at how accurate their diagnosis AI is, estimate how many hospitals might buy it, see what competitors exist, and check if their team includes both AI experts and doctors who understand the problem.",
                        keyTakeaways: [
                            "Technology assessment = understanding if the AI actually works well",
                            "Market sizing = estimating how many customers might buy this",
                            "Team quality is crucial in rapidly evolving AI field"
                        ]
                    },
                    intermediate: {
                        explanation: "AI investing requires technical competency to evaluate model architectures, data advantages, and scalability potential. Market sizing must account for AI-enabled market expansion beyond traditional boundaries. Competitive positioning analysis should consider both direct AI competitors and alternative solutions.",
                        realWorldExample: "Evaluating UiPath required understanding robotic process automation technology, assessing total addressable market expansion through AI enhancement, and analyzing competitive threats from both RPA specialists and cloud platform providers adding automation capabilities.",
                        keyTakeaways: [
                            "AI market sizing often involves new market creation rather than replacement of existing solutions",
                            "Technical evaluation requires understanding AI architecture and competitive differentiation",
                            "Talent assessment must evaluate both AI technical capabilities and domain expertise"
                        ]
                    },
                    pro: {
                        explanation: "Advanced AI investing employs sophisticated technical due diligence, scenario-based valuation modeling, and ecosystem impact analysis. Key considerations include platform potential, data network effects sustainability, and competitive response timing. Investment frameworks should incorporate both direct business metrics and strategic optionality.",
                        realWorldExample: "Investing in OpenAI required recognizing transformer architecture breakthrough potential, modeling various monetization scenarios across different applications, and understanding competitive dynamics versus Google, Microsoft, and other AI research organizations.",
                        keyTakeaways: [
                            "AI breakthrough technologies often create platform opportunities across multiple applications",
                            "Scenario-based modeling captures uncertainty in AI market development and competitive dynamics",
                            "Strategic partnerships and ecosystem relationships significantly impact AI company value creation"
                        ]
                    }
                }
            },
            { 
                level: 5, 
                focusArea: "AI in Practice", 
                sampleTopics: ["Breakthrough applications", "acquisition targets", "partnership strategies", "ethical considerations"],
                interactiveContent: {
                    beginner: {
                        explanation: "Real AI stories show us what works and what doesn't! Some AI applications become huge successes (like recommendation engines), others fail. Big companies buy AI startups to get their technology. Companies also partner together because AI is hard to build alone. Ethics matter because AI affects people's lives.",
                        realWorldExample: "Google bought DeepMind for $500M to get AI talent and technology. Microsoft partnered with OpenAI instead of building everything themselves. Both companies now worry about AI bias and safety as governments create new rules.",
                        keyTakeaways: [
                            "Successful AI applications solve real problems people will pay for",
                            "Big companies often buy AI startups for talent and technology",
                            "AI ethics and safety are becoming business requirements"
                        ]
                    },
                    intermediate: {
                        explanation: "AI industry case studies reveal patterns in successful application development, strategic partnerships, and market entry strategies. Breakthrough applications often combine AI capabilities with domain expertise and user experience design. M&A activity focuses on talent acquisition, technology integration, and market access acceleration.",
                        realWorldExample: "Salesforce's acquisition of Einstein AI capabilities through multiple acquisitions (MetaMind, PredictionIO) demonstrated systematic AI integration strategy. Their success required combining AI technology with CRM domain expertise and existing customer relationships.",
                        keyTakeaways: [
                            "AI application success requires domain expertise integration beyond pure technology development",
                            "Strategic partnerships often provide faster market access than organic development",
                            "AI talent acquisition through M&A accelerates capability development timelines"
                        ]
                    },
                    pro: {
                        explanation: "AI industry evolution demonstrates the importance of ethical AI development, regulatory relationship management, and ecosystem strategy execution. Successful companies balance rapid innovation with responsible deployment, while building sustainable competitive advantages through data, talent, and platform effects.",
                        realWorldExample: "Google's AI Principles framework, developed after employee concerns about military applications, now influences product development and partnership decisions. This ethical framework approach has become a competitive advantage in enterprise sales and regulatory discussions.",
                        keyTakeaways: [
                            "Ethical AI frameworks become competitive advantages in regulated industries and enterprise sales",
                            "Responsible AI development requires balancing innovation speed with safety considerations",
                            "Ecosystem strategy execution determines long-term competitive positioning in AI markets"
                        ]
                    }
                }
            },
            { 
                level: 6, 
                focusArea: "AI & Future Trends", 
                sampleTopics: ["AGI timeline", "job displacement", "regulation", "societal impact"],
                interactiveContent: {
                    beginner: {
                        explanation: "AI's future impact will be massive! AGI (Artificial General Intelligence) means AI that's as smart as humans at everything - experts disagree when this will happen. AI will change many jobs, some disappearing and new ones being created. Governments are making rules about AI use. Society will need to adapt to AI being everywhere.",
                        realWorldExample: "Some experts think AGI could happen in 10-20 years, others say 50+ years. AI already helps radiologists read X-rays and helps lawyers write contracts. Countries like the EU are creating AI laws. Schools are figuring out how to handle students using ChatGPT.",
                        keyTakeaways: [
                            "AGI = AI that matches human intelligence across all tasks",
                            "AI will change job markets, creating and destroying different roles",
                            "Society and governments are still figuring out AI rules"
                        ]
                    },
                    intermediate: {
                        explanation: "AI future trends require analysis of technological development trajectories, labor market impacts, and regulatory response patterns. AGI development timelines remain highly uncertain but would fundamentally alter economic structures. Job displacement and creation patterns vary significantly across industries and skill levels.",
                        realWorldExample: "McKinsey estimates AI could automate 50% of current work activities by 2055, but historically technology has created more jobs than it destroys. The EU's AI Act represents first comprehensive AI regulation framework, potentially influencing global standards similar to GDPR's impact on privacy.",
                        keyTakeaways: [
                            "AI impact timelines vary significantly across different industries and applications",
                            "Regulatory frameworks emerging in major markets will shape global AI development",
                            "Labor market transitions require policy responses for workforce adaptation"
                        ]
                    },
                    pro: {
                        explanation: "AI future analysis requires understanding exponential technology development, geopolitical competition dynamics, and systemic risk implications. Investment strategies must account for scenario planning across different AGI development timelines and regulatory response possibilities. Societal adaptation requirements may constrain AI deployment pace regardless of technical capabilities.",
                        realWorldExample: "China's national AI strategy targeting 2030 leadership versus US export controls on AI chips demonstrates how geopolitical competition affects AI development. These dynamics create investment opportunities and risks that extend beyond individual company fundamentals.",
                        keyTakeaways: [
                            "Geopolitical competition significantly impacts AI development trajectories and investment opportunities",
                            "Societal adaptation constraints may limit AI deployment pace despite technical advancement",
                            "Systemic risk considerations require portfolio-level thinking about AI impact scenarios"
                        ]
                    }
                }
            },
            { 
                level: 7, 
                focusArea: "AI Careers", 
                sampleTopics: ["Technical analysis", "AI investing", "due diligence", "industry expertise"],
                interactiveContent: {
                    beginner: {
                        explanation: "AI careers combine technical knowledge with business skills! You need to understand how AI works AND whether companies can make money from it. Some roles focus on evaluating AI investments, others on due diligence (deep research before investing). The field changes so fast that continuous learning is essential.",
                        realWorldExample: "An AI investor might evaluate a computer vision startup by understanding how their technology works, visiting customer sites to see it in action, analyzing the competitive landscape, and modeling potential returns. They need both technical and business expertise.",
                        keyTakeaways: [
                            "AI careers require both technical understanding and business acumen",
                            "Due diligence involves deep research into technology and markets",
                            "Continuous learning is essential due to rapid AI advancement"
                        ]
                    },
                    intermediate: {
                        explanation: "AI sector careers require developing technical competency across multiple AI domains, understanding commercial applications, and building networks within the AI research and business communities. Success depends on combining technical evaluation skills with market timing and business model assessment capabilities.",
                        realWorldExample: "Top AI investors like Reid Hoffman (Greylock) and Mamoon Hamid (Kleiner Perkins) combine technical understanding with pattern recognition across AI application areas. Their success stems from early identification of AI trends and ability to evaluate both technical feasibility and commercial potential.",
                        keyTakeaways: [
                            "AI investing success requires technical competency across multiple AI domains and applications",
                            "Pattern recognition across AI development cycles becomes crucial for timing and selection",
                            "Network effects within AI research and business communities provide competitive advantages"
                        ]
                    },
                    pro: {
                        explanation: "Senior AI sector roles require deep technical expertise, ability to identify breakthrough technologies early, and skill in evaluating AI talent and research capabilities. Career advancement depends on developing unique analytical frameworks for AI evaluation, building relationships within AI research communities, and generating superior returns through technology cycle management.",
                        realWorldExample: "Leading AI investors like Andreessen Horowitz's AI fund combine technical advisory capabilities with investment expertise. Their success requires understanding both fundamental AI research developments and commercial application potential across different industries and use cases.",
                        keyTakeaways: [
                            "AI investing expertise requires deep technical knowledge combined with commercial application assessment",
                            "Relationships within AI research communities provide early insights into breakthrough developments",
                            "Multi-disciplinary expertise across AI applications creates competitive differentiation in investment selection"
                        ]
                    }
                }
            }
        ]
    },
    {
        id: "automotive",
        name: "Automotive & Transportation",
        icon: <Car />,
        description: "The automotive sector includes traditional car manufacturers, electric vehicle companies, autonomous driving technology, and transportation services.",
        overview: "This industry is undergoing massive transformation with the shift to electric vehicles, development of autonomous driving, and new mobility services. It includes manufacturers, suppliers, and technology companies.",
        howItWorks: "Revenue comes from vehicle sales, parts and services, software subscriptions, and mobility services. Success depends on manufacturing efficiency, brand strength, technology integration, and adaptation to changing consumer preferences.",
        futureOutlook: "Fully autonomous vehicles will transform transportation and urban planning. Electric vehicles will achieve cost parity with gasoline cars, accelerating adoption. Mobility-as-a-Service will reduce private car ownership in urban areas, while flying cars and hyperloop technology will emerge for specialized transportation needs.",
        levels: [
            { level: 1, focusArea: "Automotive Finance Basics", sampleTopics: ["Vehicle sales", "manufacturing metrics", "supply chain", "dealership models"] },
            { level: 2, focusArea: "Auto Business Models", sampleTopics: ["OEM vs suppliers", "EV transition", "software services", "mobility platforms"] },
            { level: 3, focusArea: "Auto Analysis", sampleTopics: ["Production capacity", "technology adoption", "regulatory compliance", "market share"] },
            { level: 4, focusArea: "Auto Investing Skills", sampleTopics: ["Cycle analysis", "technology valuation", "disruption assessment", "ESG factors"] },
            { level: 5, focusArea: "Auto in Practice", sampleTopics: ["EV leaders", "autonomous driving", "battery technology", "charging infrastructure"] },
            { level: 6, focusArea: "Auto & Transportation Trends", sampleTopics: ["Electrification timeline", "autonomous adoption", "mobility services", "regulatory changes"] },
            { level: 7, focusArea: "Auto Careers", sampleTopics: ["Industry analysis", "technology assessment", "investment research", "sustainability focus"] },
        ]
    },
    {
        id: "energy",
        name: "Energy & Renewables",
        icon: <Zap />,
        description: "The energy sector includes traditional oil and gas companies, renewable energy providers, utilities, and clean technology companies developing sustainable energy solutions.",
        overview: "Energy companies provide the power that drives the global economy. The sector is transitioning from fossil fuels to renewable sources like solar, wind, and hydroelectric power, driven by climate concerns and cost advantages.",
        howItWorks: "Revenue comes from energy production, distribution, and sales. Traditional energy relies on commodity prices, while renewables benefit from long-term contracts and government incentives. Success depends on operational efficiency, regulatory compliance, and technological advancement.",
        futureOutlook: "Renewable energy will become the dominant power source globally within two decades. Energy storage technology will solve intermittency issues, enabling 24/7 renewable power. Smart grids will optimize energy distribution, while hydrogen fuel will power heavy industry and transportation. Carbon capture technology will help offset remaining emissions.",
        levels: [
            { level: 1, focusArea: "Energy Finance Basics", sampleTopics: ["Oil prices", "renewable costs", "utility rates", "grid infrastructure"] },
            { level: 2, focusArea: "Energy Business Models", sampleTopics: ["Upstream vs downstream", "renewable development", "utility operations", "energy trading"] },
            { level: 3, focusArea: "Energy Analysis", sampleTopics: ["Commodity cycles", "capacity factors", "regulatory environment", "ESG metrics"] },
            { level: 4, focusArea: "Energy Investing Skills", sampleTopics: ["Reserve valuation", "project economics", "policy analysis", "technology assessment"] },
            { level: 5, focusArea: "Energy in Practice", sampleTopics: ["Energy transition", "climate policies", "breakthrough technologies", "geopolitical factors"] },
            { level: 6, focusArea: "Energy & Climate Trends", sampleTopics: ["Decarbonization", "energy security", "storage solutions", "hydrogen economy"] },
            { level: 7, focusArea: "Energy Careers", sampleTopics: ["Sector analysis", "project finance", "ESG investing", "policy research"] },
        ]
    },
    {
        id: "investment-banking",
        name: "Investment Banking",
        icon: <Landmark />,
        description: "Investment banking involves helping companies raise capital through debt and equity offerings, facilitating mergers and acquisitions, and providing strategic financial advisory services.",
        overview: "Investment banks serve as intermediaries between corporations and investors, structuring complex financial transactions. They help companies go public, acquire other businesses, and access capital markets.",
        howItWorks: "Revenue comes from advisory fees, underwriting commissions, and trading profits. Success depends on client relationships, market expertise, execution capabilities, and risk management.",
        futureOutlook: "AI will automate routine tasks like financial modeling and due diligence, allowing bankers to focus on strategic advisory. Digital platforms will streamline deal processes and improve client communication. Fintech disruption will create new competition, while ESG considerations will become central to all transactions.",
        levels: [
            { level: 1, focusArea: "Basic Terms", sampleTopics: ["Stock", "IPO", "M&A", "Equity", "Debt", "Leverage"] },
            { level: 2, focusArea: "Banking Process", sampleTopics: ["Deal Flow", "Pitching", "Valuation", "Due Diligence"] },
            { level: 3, focusArea: "Day-to-Day Life", sampleTopics: ["Schedule", "Teams", "Culture", "Etiquette"] },
            { level: 4, focusArea: "Key Skills", sampleTopics: ["Excel", "Modeling", "Communication", "Organization"] },
            { level: 5, focusArea: "Banking in the Real World", sampleTopics: ["Role in Economy", "Clients", "Case Studies", "Trends"] },
            { level: 6, focusArea: "Macroeconomics & Banking", sampleTopics: ["Interest Rates", "Recession Impact", "Regulation"] },
            { level: 7, focusArea: "Careers & Interviews", sampleTopics: ["Recruiting", "Interview Prep", "Networking"] },
        ]
    },
    {
        id: "private-equity",
        name: "Private Equity",
        icon: <Briefcase />,
        description: "Private equity involves investing in private companies or buying out public companies to take them private, with the goal of improving operations and selling for a profit.",
        overview: "PE firms use investor capital and leverage to acquire companies, then work to increase their value through operational improvements, strategic initiatives, and financial engineering.",
        howItWorks: "Revenue comes from management fees and carried interest from successful exits. Success depends on deal sourcing, due diligence, operational improvements, and exit timing.",
        futureOutlook: "Technology will enhance deal sourcing and due diligence processes through data analytics. ESG factors will become critical investment criteria. Continuation funds will provide more flexible exit options, while direct lending will grow as banks retreat from certain lending activities.",
        levels: [
            { level: 1, focusArea: "Basic PE Terms", sampleTopics: ["Private equity", "buyout", "LBO", "portfolio company", "carried interest"] },
            { level: 2, focusArea: "PE Fund Structure", sampleTopics: ["Limited partners", "general partners", "fund life cycle", "capital calls"] },
            { level: 3, focusArea: "Deal Process", sampleTopics: ["Sourcing deals", "diligence", "bidding", "closing"] },
            { level: 4, focusArea: "PE Investment Skills", sampleTopics: ["Financial modeling", "LBO modeling", "industry analysis"] },
            { level: 5, focusArea: "PE in the Real World", sampleTopics: ["Exits (IPO, sale)", "case studies", "mega-funds", "private vs public"] },
            { level: 6, focusArea: "Macroeconomics & PE", sampleTopics: ["Interest rates", "market cycles", "fundraising environment"] },
            { level: 7, focusArea: "PE Careers & Interviews", sampleTopics: ["Recruiting", "case studies", "fit interviews", "networking"] },
        ]
    }
];
