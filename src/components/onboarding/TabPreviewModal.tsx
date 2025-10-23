import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabPreviewModalProps {
  open: boolean;
  onClose: () => void;
  onMarkComplete: () => void;
  title: string;
  icon: string;
  children: React.ReactNode;
}

const TabPreviewModal: React.FC<TabPreviewModalProps> = ({
  open,
  onClose,
  onMarkComplete,
  title,
  icon,
  children
}) => {
  const handleComplete = () => {
    onMarkComplete();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-3xl">{icon}</span>
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 py-4"
        >
          {children}
        </motion.div>

        <div className="flex justify-center pt-4 border-t">
          <Button
            onClick={handleComplete}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            size="lg"
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TabPreviewModal;
