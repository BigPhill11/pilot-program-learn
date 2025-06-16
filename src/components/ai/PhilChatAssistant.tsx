
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Lightbulb, TrendingUp, DollarSign } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'phil';
  timestamp: Date;
  suggestions?: string[];
}

const PhilChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Phil, your friendly finance panda! 🐼 I'm here to help you learn about investing, budgeting, and all things money. What would you like to know?",
      sender: 'phil',
      timestamp: new Date(),
      suggestions: [
        "What's a stock?",
        "How do I start investing?",
        "Explain compound interest",
        "What's a 401k?"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generatePhilResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('stock')) {
      return "Great question! 🐼 A stock is like owning a tiny piece of a company. Think of it like this: if a company were a pizza, buying stock would be like buying a slice of that pizza. The more slices (stocks) you own, the bigger your piece of the company! Companies sell stocks to raise money, and if the company does well, your 'pizza slice' becomes more valuable. Pretty cool, right?";
    }
    
    if (lowerMessage.includes('invest')) {
      return "Starting to invest is exciting! 🎯 Here's Phil's simple guide: 1) Start with an emergency fund (3-6 months of expenses), 2) Pay off high-interest debt, 3) Consider opening a retirement account like a 401k or IRA, 4) Start with broad market index funds - they're like buying a little bit of many companies at once. Remember: time is your best friend in investing, so start early even with small amounts!";
    }
    
    if (lowerMessage.includes('compound')) {
      return "Compound interest is AMAZING! 🚀 It's like magic money that grows on money. Imagine you plant a money tree that gives you $10. Then that $10 grows its own little money trees, and those grow more trees... that's compound interest! Your money makes money, and then that money makes even more money. Einstein supposedly called it the 8th wonder of the world!";
    }
    
    if (lowerMessage.includes('401k')) {
      return "A 401k is like a special piggy bank for retirement! 🐷 Your employer helps you save money for when you're older by taking some from your paycheck (before taxes!) and putting it in this special account. Many employers even match what you put in - that's FREE MONEY! You can't touch it until you're around 59½, but by then it will have grown a lot thanks to compound interest!";
    }
    
    if (lowerMessage.includes('budget')) {
      return "Budgeting is like being the boss of your money! 💰 Phil's easy formula: Track where your money goes for a month, then use the 50/30/20 rule - 50% for needs (rent, food), 30% for wants (fun stuff), and 20% for savings and debt payments. Remember, a budget isn't about restriction, it's about giving your money a job so you can reach your dreams!";
    }
    
    return "That's a thoughtful question! 🤔 While I'd love to help with everything, I'm best at explaining finance basics in simple terms. Could you ask me about stocks, investing, budgeting, or other money topics? I promise to explain them in the most panda-friendly way possible! 🐼";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const philResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generatePhilResponse(inputMessage),
        sender: 'phil',
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this",
          "What should I do next?",
          "Give me an example",
          "How does this apply to me?"
        ]
      };

      setMessages(prev => [...prev, philResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            Ask Phil - Your Finance Buddy
            <Badge variant="secondary" className="ml-auto">AI Assistant</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'order-1 ml-2' : 'order-2 mr-2'}`}>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex-shrink-0 flex gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Phil anything about finance..."
              className="flex-1 resize-none border rounded-lg px-3 py-2 min-h-[44px] max-h-32"
              rows={1}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSuggestionClick("How do I start budgeting?")}>
          <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Budgeting Basics</p>
        </Card>
        
        <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSuggestionClick("What are the best investment strategies?")}>
          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Investment Tips</p>
        </Card>
        
        <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSuggestionClick("Explain financial terms simply")}>
          <Lightbulb className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Finance Terms</p>
        </Card>
      </div>
    </div>
  );
};

export default PhilChatAssistant;
