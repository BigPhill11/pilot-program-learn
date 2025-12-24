/**
 * CreditPanel Component
 * 
 * Displays credit card info, balance, score, and payment actions.
 */

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Unlock,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import { useCreditStore, initializeCreditStore } from '@/store/useCreditStore';
import { empireClasses } from '@/config/empireTheme';
import { CREDIT_CONFIG } from '@/engine/credit';
import { toast } from 'sonner';

const CreditPanel: React.FC = () => {
  const bamboo = useGameStore(state => state.bamboo);
  const xp = useGameStore(state => state.xp);
  const addBamboo = useGameStore(state => state.addBamboo);
  
  const creditState = useCreditStore();
  const [showCreditTutorial, setShowCreditTutorial] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  
  // Initialize credit store on mount
  useEffect(() => {
    initializeCreditStore();
  }, []);
  
  // Check due date periodically
  useEffect(() => {
    if (!creditState.enabled || creditState.balance <= 0) return;
    
    const checkInterval = setInterval(() => {
      const result = creditState.checkDueDate();
      if (result.wasMissed) {
        toast.error('Payment Missed!', {
          description: `Late fee: ${result.lateFee} bamboo. Credit score: ${result.scoreChange}`,
          duration: 5000,
        });
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(checkInterval);
  }, [creditState.enabled, creditState.balance]);
  
  const isUnlocked = creditState.isUnlocked(xp);
  const ratingInfo = creditState.getCreditRatingInfo();
  const timeUntilDue = creditState.getTimeUntilDue();
  const utilizationPercent = creditState.limit > 0 
    ? (creditState.balance / creditState.limit) * 100 
    : 0;
  
  const handleEnableCredit = () => {
    creditState.enableCreditCard();
    setShowCreditTutorial(true);
  };
  
  const handlePayMinimum = () => {
    if (bamboo < creditState.minPaymentDue) {
      toast.error('Not enough bamboo for minimum payment');
      return;
    }
    
    // Deduct bamboo first
    addBamboo(-creditState.minPaymentDue, 'credit_payment');
    
    const result = creditState.payMinimum();
    if (result.success) {
      if (result.scoreChange > 0) {
        toast.success(`Payment successful! Credit score +${result.scoreChange}`);
      } else {
        toast.success('Payment successful!');
      }
    }
  };
  
  const handlePayCustom = () => {
    const amount = parseInt(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Enter a valid payment amount');
      return;
    }
    
    if (bamboo < amount) {
      toast.error('Not enough bamboo');
      return;
    }
    
    // Deduct bamboo first
    addBamboo(-amount, 'credit_payment');
    
    const result = creditState.payBalance(amount);
    if (result.success) {
      setShowPaymentDialog(false);
      setPaymentAmount('');
      if (result.scoreChange > 0) {
        toast.success(`Payment successful! Credit score +${result.scoreChange}`);
      } else {
        toast.success('Payment successful!');
      }
    }
  };
  
  // Not unlocked yet
  if (!isUnlocked) {
    return (
      <Card className={cn(empireClasses.card, "opacity-75")}>
        <CardHeader className="pb-2">
          <CardTitle className={cn("text-lg flex items-center gap-2", empireClasses.textPrimary)}>
            <CreditCard className="h-5 w-5 text-[#7A8A7E]" />
            Credit Card
            <Badge className="ml-auto bg-[#7A8A7E]/20 text-[#5C6B60] border-[#7A8A7E]/30">
              Locked
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={cn("text-sm text-center py-4", empireClasses.textMuted)}>
            Reach {CREDIT_CONFIG.xpUnlockThreshold} XP to unlock credit purchases
          </p>
          <Progress value={(xp / CREDIT_CONFIG.xpUnlockThreshold) * 100} className="h-2 bg-[#E4EBE4]" />
          <p className={cn("text-xs text-center mt-2", empireClasses.textMuted)}>
            {Math.floor(xp)} / {CREDIT_CONFIG.xpUnlockThreshold} XP
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Unlocked but not enabled
  if (!creditState.enabled) {
    return (
      <Card className={cn(empireClasses.card)}>
        <CardHeader className="pb-2">
          <CardTitle className={cn("text-lg flex items-center gap-2", empireClasses.textPrimary)}>
            <CreditCard className="h-5 w-5 text-[#6B4E3D]" />
            Credit Card
            <Badge className="ml-auto bg-[#5A9B5E]/20 text-[#3D7040] border-[#5A9B5E]/30">
              Available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className={cn("text-sm", empireClasses.textSecondary)}>
            Buy upgrades now, pay later! Build your credit score with on-time payments.
          </p>
          <Button
            onClick={handleEnableCredit}
            className="w-full bg-[#6B4E3D] hover:bg-[#8B6B54] text-white gap-2"
          >
            <Unlock className="h-4 w-4" />
            Enable Credit Card
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Credit enabled - show full panel
  return (
    <>
      <Card className={cn(empireClasses.card)}>
        <CardHeader className="pb-2">
          <CardTitle className={cn("text-lg flex items-center gap-2", empireClasses.textPrimary)}>
            <CreditCard className="h-5 w-5 text-[#6B4E3D]" />
            Credit Card
            <button 
              onClick={() => setShowCreditTutorial(true)}
              className="ml-auto"
              title="Credit info"
            >
              <Info className="h-4 w-4 text-[#7A8A7E]" />
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Credit Score */}
          <div className={cn(
            "p-3 rounded-lg border flex items-center justify-between",
            empireClasses.bgSecondary,
            empireClasses.borderDefault
          )}>
            <div>
              <span className={cn("text-xs", empireClasses.textMuted)}>Credit Score</span>
              <div className="flex items-center gap-2">
                <span 
                  className="font-bold text-xl"
                  style={{ color: ratingInfo.color }}
                >
                  {creditState.score}
                </span>
                <Badge 
                  className="text-xs"
                  style={{ 
                    backgroundColor: `${ratingInfo.color}20`,
                    color: ratingInfo.color,
                    borderColor: `${ratingInfo.color}30`,
                  }}
                >
                  {ratingInfo.rating}
                </Badge>
              </div>
            </div>
            {creditState.missedPayments > 0 && (
              <Badge className="bg-[#B84C4C]/20 text-[#B84C4C] border-[#B84C4C]/30">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {creditState.missedPayments} missed
              </Badge>
            )}
          </div>
          
          {/* Balance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={cn("text-sm", empireClasses.textSecondary)}>Balance</span>
              <span className={cn("font-bold", empireClasses.textPrimary)}>
                {creditState.balance} / {creditState.limit} 🎋
              </span>
            </div>
            <Progress 
              value={utilizationPercent} 
              className={cn(
                "h-2",
                utilizationPercent >= 70 ? "bg-[#B84C4C]/20" : "bg-[#E4EBE4]"
              )}
            />
            {utilizationPercent >= 70 && (
              <p className="text-xs text-[#B84C4C]">
                High utilization may hurt your score
              </p>
            )}
          </div>
          
          {/* Payment Due */}
          {creditState.balance > 0 && (
            <div className={cn(
              "p-3 rounded-lg border",
              timeUntilDue === 'OVERDUE' 
                ? "bg-[#B84C4C]/10 border-[#B84C4C]/20"
                : "bg-[#B8873A]/10 border-[#B8873A]/20"
            )}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {timeUntilDue === 'OVERDUE' ? 'OVERDUE!' : `Due in: ${timeUntilDue}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={cn("text-xs", empireClasses.textMuted)}>
                  Minimum payment:
                </span>
                <span className="font-medium">{creditState.minPaymentDue} 🎋</span>
              </div>
            </div>
          )}
          
          {/* Payment Actions */}
          {creditState.balance > 0 && (
            <div className="space-y-2">
              <Button
                onClick={handlePayMinimum}
                disabled={bamboo < creditState.minPaymentDue}
                className={cn(
                  "w-full gap-2 transition-all duration-150",
                  bamboo >= creditState.minPaymentDue
                    ? "bg-[#7A9B7E] hover:bg-[#4F6F57] text-white"
                    : "bg-[#E4EBE4] text-[#7A8A7E] cursor-not-allowed"
                )}
              >
                <DollarSign className="h-4 w-4" />
                Pay Minimum ({creditState.minPaymentDue} 🎋)
              </Button>
              <Button
                onClick={() => setShowPaymentDialog(true)}
                variant="outline"
                className={cn(
                  "w-full gap-2",
                  empireClasses.borderDefault
                )}
              >
                Pay Custom Amount
              </Button>
            </div>
          )}
          
          {/* No balance message */}
          {creditState.balance === 0 && (
            <p className={cn("text-sm text-center py-2", empireClasses.textMuted)}>
              No balance. Use credit to buy Bamboo Farm upgrades!
            </p>
          )}
        </CardContent>
      </Card>
      
      {/* Credit Tutorial Dialog */}
      <Dialog open={showCreditTutorial} onOpenChange={setShowCreditTutorial}>
        <DialogContent className={empireClasses.bgPrimary}>
          <DialogHeader>
            <DialogTitle className={cn("flex items-center gap-2", empireClasses.textPrimary)}>
              <CreditCard className="h-5 w-5 text-[#6B4E3D]" />
              How Credit Works
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className={cn("p-3 rounded-lg border", empireClasses.bgSecondary, empireClasses.borderDefault)}>
              <h4 className="font-semibold mb-1 text-[#6B4E3D]">💳 Buy Now, Pay Later</h4>
              <p className={cn("text-sm", empireClasses.textSecondary)}>
                Use credit to buy Bamboo Farm upgrades when you don't have enough bamboo.
              </p>
            </div>
            <div className={cn("p-3 rounded-lg border", empireClasses.bgSecondary, empireClasses.borderDefault)}>
              <h4 className="font-semibold mb-1 text-[#B8873A]">⏰ Pay On Time</h4>
              <p className={cn("text-sm", empireClasses.textSecondary)}>
                Payments are due every 24 hours. Pay at least the minimum to avoid late fees!
              </p>
            </div>
            <div className={cn("p-3 rounded-lg border", empireClasses.bgSecondary, empireClasses.borderDefault)}>
              <h4 className="font-semibold mb-1 text-[#5A9B5E]">📈 Build Your Score</h4>
              <p className={cn("text-sm", empireClasses.textSecondary)}>
                On-time payments improve your credit score. Higher score = higher credit limit!
              </p>
            </div>
            <div className={cn("p-3 rounded-lg border", "bg-[#B84C4C]/10 border-[#B84C4C]/20")}>
              <h4 className="font-semibold mb-1 text-[#B84C4C]">⚠️ Watch Out</h4>
              <p className="text-sm text-[#8B3030]">
                Missing payments hurts your score (-40 to -80 points) and adds late fees!
                Interest also accrues on your balance daily.
              </p>
            </div>
            <Button 
              onClick={() => setShowCreditTutorial(false)}
              className="w-full bg-[#6B4E3D] hover:bg-[#8B6B54] text-white"
            >
              Got It!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Custom Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className={empireClasses.bgPrimary}>
          <DialogHeader>
            <DialogTitle className={empireClasses.textPrimary}>Make a Payment</DialogTitle>
            <DialogDescription className={empireClasses.textSecondary}>
              Current balance: {creditState.balance} 🎋 | You have: {Math.floor(bamboo)} 🎋
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={cn("text-sm font-medium", empireClasses.textSecondary)}>
                Payment Amount
              </label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder={`Min: ${creditState.minPaymentDue}`}
                className={cn(
                  "w-full mt-1 px-3 py-2 rounded-lg border",
                  empireClasses.bgSecondary,
                  empireClasses.borderDefault,
                  empireClasses.textPrimary
                )}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setPaymentAmount(creditState.minPaymentDue.toString())}
                variant="outline"
                size="sm"
                className={empireClasses.borderDefault}
              >
                Min ({creditState.minPaymentDue})
              </Button>
              <Button
                onClick={() => setPaymentAmount(creditState.balance.toString())}
                variant="outline"
                size="sm"
                className={empireClasses.borderDefault}
              >
                Full ({creditState.balance})
              </Button>
            </div>
            <Button 
              onClick={handlePayCustom}
              disabled={!paymentAmount || parseInt(paymentAmount) <= 0 || bamboo < parseInt(paymentAmount)}
              className="w-full bg-[#7A9B7E] hover:bg-[#4F6F57] text-white"
            >
              Pay {paymentAmount || '0'} 🎋
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreditPanel;

