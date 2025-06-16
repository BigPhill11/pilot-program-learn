
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Separator } from '@/components/ui/separator';
import { Settings, AlertTriangle, User, Linkedin, ExternalLink, Check, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ProfileSettings = () => {
  const { user, profile } = useAuth();
  const [selectedVersion, setSelectedVersion] = useState(profile?.app_version || 'beginner');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedin_url || '');
  const [updatingLinkedin, setUpdatingLinkedin] = useState(false);

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

  const handleLinkedinUpdate = async () => {
    if (!user) return;

    // Basic LinkedIn URL validation
    const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/;
    if (linkedinUrl && !linkedinPattern.test(linkedinUrl)) {
      toast.error('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)');
      return;
    }

    setUpdatingLinkedin(true);
    try {
      const updateData: any = {
        linkedin_url: linkedinUrl || null,
        updated_at: new Date().toISOString()
      };

      if (linkedinUrl) {
        updateData.linkedin_connected_at = new Date().toISOString();
      } else {
        updateData.linkedin_connected_at = null;
        updateData.linkedin_verified = false;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      toast.success(linkedinUrl ? 'LinkedIn profile connected successfully!' : 'LinkedIn profile removed');
      
      // Refresh to update the profile data
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Error updating LinkedIn:', error);
      toast.error('Failed to update LinkedIn profile');
    } finally {
      setUpdatingLinkedin(false);
    }
  };

  const disconnectLinkedin = async () => {
    setLinkedinUrl('');
    await handleLinkedinUpdate();
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
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </DialogTitle>
            <DialogDescription>
              Manage your Phil Finance profile settings and preferences.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* App Version Section */}
            <div>
              <h3 className="text-sm font-semibold mb-3">App Version</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Current Version</Label>
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
                      <strong>Caution:</strong> Changing your version will affect the complexity of content, available features, and your learning experience.
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleVersionChange}
                  disabled={selectedVersion === profile.app_version || updating}
                  className="w-full"
                >
                  {updating ? 'Updating...' : 'Update Version'}
                </Button>
              </div>
            </div>

            <Separator />

            {/* LinkedIn Connection Section */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
                <Linkedin className="h-4 w-4 text-blue-600" />
                <span>LinkedIn Profile</span>
              </h3>
              
              <div className="space-y-4">
                {profile.linkedin_url ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800 dark:text-green-200">LinkedIn Connected</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(profile.linkedin_url, '_blank')}
                        className="flex items-center space-x-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>View</span>
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={disconnectLinkedin}
                      disabled={updatingLinkedin}
                      className="w-full flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>{updatingLinkedin ? 'Disconnecting...' : 'Disconnect LinkedIn'}</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      Connect your LinkedIn profile to network with other Phil Finance users and showcase your professional growth.
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedin-url" className="text-sm font-medium">
                        LinkedIn Profile URL
                      </Label>
                      <Input
                        id="linkedin-url"
                        type="url"
                        placeholder="https://linkedin.com/in/yourname"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <Button
                      onClick={handleLinkedinUpdate}
                      disabled={!linkedinUrl || updatingLinkedin}
                      className="w-full flex items-center space-x-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>{updatingLinkedin ? 'Connecting...' : 'Connect LinkedIn'}</span>
                    </Button>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  <strong>Privacy Note:</strong> Your LinkedIn profile will be visible to other Phil Finance users for networking purposes only.
                </div>
              </div>
            </div>
          </div>
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
