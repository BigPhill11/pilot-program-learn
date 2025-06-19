
import React from 'react';
import { Brain } from 'lucide-react';
import type { IndustryJourneyData } from '../industry-journeys';

export const artificialIntelligenceJourney: IndustryJourneyData = {
  id: 'artificial-intelligence',
  name: 'Artificial Intelligence',
  icon: <Brain className="h-6 w-6" />,
  description: 'Artificial Intelligence encompasses companies developing machine learning, neural networks, and automated decision-making systems that augment or replace human cognitive tasks.',
  overview: 'Artificial Intelligence encompasses companies developing machine learning, neural networks, and automated decision-making systems that augment or replace human cognitive tasks.',
  howItWorks: 'AI companies generate revenue through software licensing, cloud services, data processing, and automation solutions, with success driven by data quality, algorithmic innovation, and practical application.',
  futureOutlook: 'Generative AI, large language models, and autonomous systems are creating trillion-dollar market opportunities while raising important questions about job displacement, ethics, and societal impact.',
  totalEstimatedTime: '90 min',
  difficulty: 'Advanced',
  levels: [
    {
      level: 1,
      title: 'AI Industry Fundamentals',
      focusArea: 'AI Finance Basics',
      description: 'Understanding artificial intelligence business models and metrics',
      estimatedTime: '30 min',
      objectives: [
        'Learn about machine learning basics',
        'Understand AI model training and data requirements',
        'Explore AI business models and revenue streams'
      ],
      sampleTopics: ['Machine learning basics', 'Neural networks', 'AI model training', 'Data requirements'],
      content: {
        beginner: 'AI is computer software that learns to do tasks by studying lots of examples, similar to how humans learn. The more good examples it sees, the better it gets at the task.',
        intermediate: 'AI system performance depends on data quality, model architecture, and training methodology. Different AI approaches suit different problem types, from computer vision to natural language processing.',
        pro: 'Advanced AI development involves transformer architectures, reinforcement learning, and multi-modal training. Model scaling laws predict performance improvements from increased parameters, data, and compute.'
      }
    },
    {
      level: 2,
      title: 'AI Business Models',
      focusArea: 'AI Business Models',
      description: 'Understanding how AI companies generate revenue and create value',
      estimatedTime: '20 min',
      objectives: [
        'Learn AI licensing strategies',
        'Understand AI consulting services',
        'Explore AI-as-a-Service models'
      ],
      sampleTopics: ['AI licensing', 'AI consulting', 'AI as a service', 'AI-driven products'],
      content: {
        beginner: 'AI companies make money by selling their smart software to other companies, helping them solve problems, or providing AI services that customers can use.',
        intermediate: 'AI business models include software licensing, consulting services, platform-as-a-service offerings, and AI-enhanced products with subscription or usage-based pricing.',
        pro: 'Advanced AI monetization involves API ecosystems, data marketplace strategies, and vertical-specific solutions with enterprise licensing and partnership revenue streams.'
      },
      flashcards: [
        {
          id: 'ai-licensing',
          term: 'AI Licensing',
          definition: 'Business model where companies license AI algorithms or models for use in their products or services'
        },
        {
          id: 'ai-consulting',
          term: 'AI Consulting',
          definition: 'Services provided by AI experts to help companies implement AI solutions'
        },
        {
          id: 'ai-as-a-service',
          term: 'AI as a Service',
          definition: 'Model where AI capabilities are provided as a subscription service to customers'
        },
        {
          id: 'ai-driven-products',
          term: 'AI-Driven Products',
          definition: 'Products that incorporate AI algorithms to automate tasks or improve user experience'
        }
      ],
      interactiveContent: {
        beginner: {
          explanation: 'AI companies generate revenue through licensing, consulting, and as a service. AI-driven products are becoming more common as AI capabilities become more accessible.',
          realWorldExample: 'Amazon\'s Alexa is an AI-driven product that uses machine learning to understand and respond to user queries.',
          keyTakeaways: [
            'AI licensing allows companies to use AI without building their own infrastructure',
            'AI consulting provides expertise to implement AI solutions',
            'AI as a service offers scalable AI capabilities to customers'
          ]
        },
        intermediate: {
          explanation: 'AI business models vary widely, from licensing and consulting to AI-driven products. Each model has its own advantages and challenges.',
          realWorldExample: 'OpenAI provides AI consulting services to companies like Tesla and Google, helping them implement AI solutions.',
          keyTakeaways: [
            'AI licensing models can be lucrative but require careful licensing agreements',
            'AI consulting services can be cost-effective but may not provide full ownership of the AI solution',
            'AI as a service offers flexibility but may not provide the same level of customization as AI-driven products'
          ]
        },
        pro: {
          explanation: 'Advanced AI business models incorporate AI-driven products, AI as a service, and AI licensing. Each model has its own advantages and challenges.',
          realWorldExample: 'Microsoft offers AI licensing, AI consulting, and AI as a service, as well as AI-driven products like Azure AI and Office 365.',
          keyTakeaways: [
            'AI-driven products offer the most flexibility and customization',
            'AI as a service offers scalability and cost-effectiveness',
            'AI licensing models can be lucrative but require careful licensing agreements'
          ]
        }
      },
      quiz: {
        question: 'What is the primary advantage of AI as a service?',
        options: [
          'It allows companies to use AI without building their own infrastructure',
          'It provides expertise to implement AI solutions',
          'It offers scalable AI capabilities to customers',
          'It allows companies to customize AI solutions to their specific needs'
        ],
        correct: 2,
        explanation: 'AI as a service offers scalable AI capabilities to customers, allowing them to use AI without building their own infrastructure.'
      }
    }
  ],
  game: {
    id: 'ai-research-lab',
    name: 'AI Research Lab',
    description: 'Run an AI research laboratory by making decisions about research focus, talent acquisition, computational resources, and product development.',
    instructions: 'You lead an AI research lab with $100M in funding. Choose research directions, hire talent, acquire datasets, and build products that demonstrate AI capabilities. Balance long-term research with commercial applications.',
    scenarios: [
      {
        id: 'research-focus',
        scenario: 'Your lab needs to choose a primary research focus. Which area offers the best commercial potential?',
        options: [
          'Large language models for text generation and understanding',
          'Computer vision for autonomous vehicles and robotics',
          'Drug discovery and molecular design applications',
          'Reinforcement learning for game AI and decision optimization'
        ],
        correct: 0,
        feedback: 'Large language models have proven commercial applications across industries and can be adapted to many use cases, offering the broadest market opportunity.',
        points: 100
      }
    ]
  }
};
