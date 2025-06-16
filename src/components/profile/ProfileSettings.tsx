
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, AlertTriangle, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ProfileSettings = () => {
  const { user, profile } = useAuth();
  const [selectedVersion, setSelectedVersion] = useState(profile?.app_version || 'beginner');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const versionInfo = {
    beginner: {
      label: 'Beginner Phil',
      description: 'Perfect for those just starting their financial journey. Simple concepts and guided learning.',
      color: 'bg-green-500 hover:bg-green-600'
    },
    intermediate: {
      label: 'Intermediate Phil',
      description: 'For users with some financial knowledge. More detailed analysis and advanced topics.',
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    advanced: {
      label: 'Pro Phil',
      description: 'Advanced features for experienced investors. Complex strategies and detailed market analysis.',
      color: 'bg-red-500 hover:bg-red-600'
    }
  };

  const handleVersionChange = () => {
    if (selectedVersion !== profile?.app_version) {
      setShowConfirmDialog(true);
    }
  };

  const confirmVersionChange = async () => {
    if (!user) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          app_version: selectedVersion,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success(`Successfully switched to ${versionInfo[selectedVersion as keyof typeof versionInfo].label}!`);
      setIsOpen(false);
      setShowConfirmDialog(false);
      
      // Refresh the page to apply new version settings
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error updating app version:', error);
      toast.error('Failed to update app version');
    } finally {
      setUpdating(false);
    }
  };

  if (!profile) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </DialogTitle>
            <DialogDescription>
              Choose your Phil Finance experience level. This affects the complexity of content and features available to you.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Current Version</Label>
              <Badge className={`${versionInfo[profile.app_version as keyof typeof versionInfo].color} text-white px-3 py-1`}>
                {versionInfo[profile.app_version as keyof typeof versionInfo].label}
              </Badge>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Select New Version</Label>
              <RadioGroup value={selectedVersion} onValueChange={setSelectedVersion}>
                {Object.entries(versionInfo).map(([version, info]) => (
                  <div key={version} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                    <RadioGroupItem value={version} id={version} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={version} className="cursor-pointer">
                        <div className="font-medium">{info.label}</div>
                        <div className="text-sm text-muted-foreground mt-1">{info.description}</div>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {selectedVersion !== profile.app_version && (
              <div className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Caution:</strong> Changing your version will affect the complexity of content, available features, and your learning experience. Make sure you're comfortable with the new level.
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleVersionChange}
              disabled={selectedVersion === profile.app_version || updating}
              className="w-full"
            >
              {updating ? 'Updating...' : 'Update Version'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span>Confirm Version Change</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change from <strong>{versionInfo[profile.app_version as keyof typeof versionInfo].label}</strong> to <strong>{versionInfo[selectedVersion as keyof typeof versionInfo].label}</strong>?
              
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <div className="text-sm">
                  <strong>This will:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Change the complexity of learning content</li>
                    <li>Adjust available features and tools</li>
                    <li>Modify your dashboard and recommendations</li>
                    <li>Require a page refresh to apply changes</li>
                  </ul>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmVersionChange} disabled={updating}>
              {updating ? 'Updating...' : 'Yes, Change Version'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileSettings;
