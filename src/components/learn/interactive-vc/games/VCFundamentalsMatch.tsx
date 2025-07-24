import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { getVCTermsByLevel } from "@/data/venture-capital-terms";

interface VCFundamentalsMatchProps {
  onComplete: (score: number) => void;
}

interface MatchPair {
  id: string;
  term: string;
  definition: string;
  matched: boolean;
}

const VCFundamentalsMatch: React.FC<VCFundamentalsMatchProps> = ({ onComplete }) => {
  const [pairs, setPairs] = useState<MatchPair[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const level1Terms = getVCTermsByLevel(1);
    const gamePairs = level1Terms.slice(0, 5).map(term => ({
      id: term.term.toLowerCase().replace(/\s+/g, '-'),
      term: term.term,
      definition: term.definition,
      matched: false
    }));
    
    setPairs(gamePairs);
    setMatches({});
    setScore(0);
    setAttempts(0);
    setGameCompleted(false);
    setFeedback("");
    setSelectedTerm(null);
    setSelectedDefinition(null);
  };

  const handleTermClick = (termId: string) => {
    if (matches[termId] || gameCompleted) return;
    
    setSelectedTerm(selectedTerm === termId ? null : termId);
    setSelectedDefinition(null);
  };

  const handleDefinitionClick = (definitionId: string) => {
    if (Object.values(matches).includes(definitionId) || gameCompleted) return;
    
    if (selectedTerm && selectedTerm !== definitionId) {
      setAttempts(prev => prev + 1);
      
      // Check if it's a correct match
      const termPair = pairs.find(p => p.id === selectedTerm);
      const definitionPair = pairs.find(p => p.id === definitionId);
      
      if (termPair && definitionPair && termPair.id === definitionPair.id) {
        // Correct match
        const newMatches = { ...matches, [selectedTerm]: definitionId };
        setMatches(newMatches);
        setScore(prev => prev + 1);
        setFeedback("Correct! Great job matching that term.");
        
        // Check if game is completed
        if (Object.keys(newMatches).length === pairs.length) {
          setGameCompleted(true);
          const finalScore = Math.max(0, 100 - (attempts - Object.keys(newMatches).length) * 10);
          setTimeout(() => onComplete(finalScore), 1500);
        }
      } else {
        setFeedback("Not quite right. Try again!");
      }
      
      setSelectedTerm(null);
      setSelectedDefinition(null);
      
      // Clear feedback after 2 seconds
      setTimeout(() => setFeedback(""), 2000);
    } else {
      setSelectedDefinition(selectedDefinition === definitionId ? null : definitionId);
      setSelectedTerm(null);
    }
  };

  const getTermButtonClass = (termId: string) => {
    if (matches[termId]) return "bg-green-100 border-green-300 text-green-800 cursor-not-allowed";
    if (selectedTerm === termId) return "bg-blue-100 border-blue-300 text-blue-800";
    return "bg-white border-gray-300 hover:bg-gray-50 text-gray-800 cursor-pointer";
  };

  const getDefinitionButtonClass = (definitionId: string) => {
    if (Object.values(matches).includes(definitionId)) return "bg-green-100 border-green-300 text-green-800 cursor-not-allowed";
    if (selectedDefinition === definitionId) return "bg-blue-100 border-blue-300 text-blue-800";
    return "bg-white border-gray-300 hover:bg-gray-50 text-gray-800 cursor-pointer";
  };

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledTerms = shuffleArray(pairs);
  const shuffledDefinitions = shuffleArray(pairs);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>VC Fundamentals Matching Game</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">Score: {score}/{pairs.length}</Badge>
            <Badge variant="outline">Attempts: {attempts}</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Match each venture capital term with its correct definition. Click a term, then click its matching definition.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {feedback && (
          <div className={`p-3 rounded-lg text-center ${
            feedback.includes("Correct") ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}>
            {feedback}
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Terms Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg border-b pb-2">Terms</h3>
            {shuffledTerms.map((pair) => (
              <Button
                key={`term-${pair.id}`}
                variant="outline"
                className={`w-full text-left p-4 h-auto ${getTermButtonClass(pair.id)}`}
                onClick={() => handleTermClick(pair.id)}
                disabled={gameCompleted}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{pair.term}</span>
                  {matches[pair.id] && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
              </Button>
            ))}
          </div>
          
          {/* Definitions Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg border-b pb-2">Definitions</h3>
            {shuffledDefinitions.map((pair) => (
              <Button
                key={`def-${pair.id}`}
                variant="outline"
                className={`w-full text-left p-4 h-auto ${getDefinitionButtonClass(pair.id)}`}
                onClick={() => handleDefinitionClick(pair.id)}
                disabled={gameCompleted}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm leading-relaxed">{pair.definition}</span>
                  {Object.values(matches).includes(pair.id) && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
              </Button>
            ))}
          </div>
        </div>
        
        {gameCompleted && (
          <div className="text-center space-y-4 p-6 bg-green-50 rounded-lg">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-lg font-semibold text-green-800">Congratulations!</h3>
            <p className="text-green-700">
              You've successfully matched all VC fundamentals terms! 
              Final score: {Math.max(0, 100 - (attempts - pairs.length) * 10)}%
            </p>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button onClick={initializeGame} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Play Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VCFundamentalsMatch;