
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface DragDropItem {
  id: string;
  text: string;
}

interface DragDropCategory {
  id: string;
  title: string;
  correctItems: string[];
}

interface EarningMoneyDragDropProps {
  title: string;
  instruction: string;
  items: DragDropItem[];
  categories: DragDropCategory[];
  onComplete: () => void;
}

const EarningMoneyDragDrop: React.FC<EarningMoneyDragDropProps> = ({
  title,
  instruction,
  items,
  categories,
  onComplete
}) => {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleDrop = (itemId: string, categoryId: string) => {
    setAssignments(prev => ({
      ...prev,
      [itemId]: categoryId
    }));
  };

  const checkAnswers = () => {
    setShowResults(true);
    
    let allCorrect = true;
    categories.forEach(category => {
      category.correctItems.forEach(itemId => {
        if (assignments[itemId] !== category.id) {
          allCorrect = false;
        }
      });
    });

    if (allCorrect) {
      setTimeout(onComplete, 1500);
    }
  };

  const getItemStatus = (itemId: string) => {
    if (!showResults) return 'neutral';
    
    const assignedCategory = assignments[itemId];
    const correctCategory = categories.find(cat => 
      cat.correctItems.includes(itemId)
    )?.id;

    return assignedCategory === correctCategory ? 'correct' : 'incorrect';
  };

  const unassignedItems = items.filter(item => !assignments[item.id]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{instruction}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Available Items */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Available Items:</h4>
          <div className="flex flex-wrap gap-2">
            {unassignedItems.map(item => (
              <div
                key={item.id}
                className="px-3 py-2 bg-green-100 border border-green-300 rounded-lg cursor-move text-sm hover:bg-green-200 transition-colors"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Drop Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-32"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const itemId = e.dataTransfer.getData('text/plain');
                handleDrop(itemId, category.id);
              }}
            >
              <h4 className="font-semibold mb-2">{category.title}</h4>
              <div className="space-y-2">
                {items
                  .filter(item => assignments[item.id] === category.id)
                  .map(item => {
                    const status = getItemStatus(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`px-3 py-2 rounded-lg text-sm border cursor-pointer ${
                          status === 'correct' 
                            ? 'bg-green-100 border-green-500 text-green-700' 
                            : status === 'incorrect'
                            ? 'bg-red-100 border-red-500 text-red-700'
                            : 'bg-green-100 border-green-300'
                        }`}
                        onClick={() => {
                          if (!showResults) {
                            setAssignments(prev => {
                              const newAssignments = { ...prev };
                              delete newAssignments[item.id];
                              return newAssignments;
                            });
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.text}</span>
                          {showResults && status === 'correct' && <CheckCircle2 className="h-4 w-4" />}
                          {showResults && status === 'incorrect' && <XCircle className="h-4 w-4" />}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(assignments).length === items.length && !showResults && (
          <Button onClick={checkAnswers} className="w-full bg-green-500 hover:bg-green-600">
            Check My Answers
          </Button>
        )}

        {showResults && (
          <div className="text-center">
            {categories.every(category => 
              category.correctItems.every(itemId => assignments[itemId] === category.id)
            ) ? (
              <div className="text-green-600 font-semibold">
                <CheckCircle2 className="h-6 w-6 inline mr-2" />
                Perfect! You've mastered this concept!
              </div>
            ) : (
              <div className="text-orange-600 font-semibold">
                <XCircle className="h-6 w-6 inline mr-2" />
                Good try! Review the correct answers above.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EarningMoneyDragDrop;
