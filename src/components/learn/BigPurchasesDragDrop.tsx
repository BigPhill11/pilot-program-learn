
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { DragDropActivity } from '@/data/big-purchases-journey-data';

interface BigPurchasesDragDropProps {
  activity: DragDropActivity;
  onComplete: (isCorrect: boolean) => void;
}

const BigPurchasesDragDrop: React.FC<BigPurchasesDragDropProps> = ({ activity, onComplete }) => {
  const [draggedItems, setDraggedItems] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    setDraggedItems(prev => ({ ...prev, [itemId]: categoryId }));
  };

  const checkAnswers = () => {
    let correct = 0;
    activity.items.forEach(item => {
      if (draggedItems[item.id] === item.category) {
        correct++;
      }
    });
    
    const isCorrect = correct === activity.items.length;
    setShowResults(true);
    setIsCompleted(true);
    onComplete(isCorrect);
  };

  const getItemsInCategory = (categoryId: string) => {
    return Object.entries(draggedItems)
      .filter(([_, catId]) => catId === categoryId)
      .map(([itemId]) => activity.items.find(item => item.id === itemId))
      .filter(Boolean);
  };

  const getUnplacedItems = () => {
    return activity.items.filter(item => !draggedItems[item.id]);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="font-semibold text-lg mb-2">Interactive Activity</h4>
        <p className="text-muted-foreground">{activity.instruction}</p>
      </div>

      {/* Unplaced Items */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm">Items to Sort</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {getUnplacedItems().map(item => (
              <div
                key={item?.id}
                draggable={!isCompleted}
                onDragStart={(e) => handleDragStart(e, item?.id || '')}
                className="bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2 cursor-move text-sm hover:bg-purple-500/20 transition-colors"
              >
                {item?.text}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activity.categories.map(category => {
          const itemsInCategory = getItemsInCategory(category.id);
          return (
            <Card
              key={category.id}
              className="border-2 border-dashed border-gray-300 hover:border-purple-500/50 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-sm text-center">{category.name}</CardTitle>
              </CardHeader>
              <CardContent
                className="min-h-24 space-y-2"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category.id)}
              >
                {itemsInCategory.map(item => {
                  const isCorrect = showResults && item?.category === category.id;
                  const isIncorrect = showResults && item?.category !== category.id;
                  
                  return (
                    <div
                      key={item?.id}
                      className={`flex items-center justify-between p-2 rounded border text-sm ${
                        isCorrect ? 'bg-green-100 border-green-300' :
                        isIncorrect ? 'bg-red-100 border-red-300' :
                        'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span>{item?.text}</span>
                      {showResults && (
                        <>
                          {isCorrect && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                          {isIncorrect && <XCircle className="h-4 w-4 text-red-600" />}
                        </>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!isCompleted && Object.keys(draggedItems).length === activity.items.length && (
        <div className="text-center">
          <Button onClick={checkAnswers} className="w-full">
            Check My Answers
          </Button>
        </div>
      )}

      {showResults && (
        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="text-sm">
            {Object.values(draggedItems).filter((catId, index) => {
              const item = activity.items[index];
              return catId === item?.category;
            }).length === activity.items.length 
              ? "🎉 Perfect! You got them all right!" 
              : "Good try! Review the correct answers above."}
          </p>
        </div>
      )}
    </div>
  );
};

export default BigPurchasesDragDrop;
