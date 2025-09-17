import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Eye, EyeOff } from 'lucide-react';
import { useAdminMode } from '@/contexts/AdminModeContext';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminModeToggle: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const { isAdminModeActive, toggleAdminMode, isPreviewMode } = useAdminMode();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {isAdminModeActive && (
        <Badge variant={isPreviewMode ? 'default' : 'secondary'} className="animate-pulse">
          {isPreviewMode ? (
            <>
              <Eye className="h-3 w-3 mr-1" />
              Preview Mode
            </>
          ) : (
            'Admin Mode Active'
          )}
        </Badge>
      )}
      
      <Button
        onClick={toggleAdminMode}
        variant={isAdminModeActive ? 'default' : 'outline'}
        size="sm"
        className={`
          shadow-lg transition-all duration-200 
          ${isAdminModeActive 
            ? 'bg-orange-600 hover:bg-orange-700 text-white' 
            : 'bg-white hover:bg-gray-50 border-gray-300'
          }
        `}
      >
        <Settings className="h-4 w-4 mr-2" />
        {isAdminModeActive ? 'Exit Admin' : 'Admin Mode'}
      </Button>
    </div>
  );
};

export default AdminModeToggle;