import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface AdminModeContextType {
  isAdminModeActive: boolean;
  toggleAdminMode: () => void;
  canAccessLevel: (moduleId: string, levelId: number) => boolean;
  jumpToLevel: (moduleId: string, levelId: number) => void;
  currentAdminPath: string | null;
  setCurrentAdminPath: (path: string | null) => void;
  isPreviewMode: boolean;
  setPreviewMode: (preview: boolean) => void;
}

const AdminModeContext = createContext<AdminModeContextType | undefined>(undefined);

export const useAdminMode = () => {
  const context = useContext(AdminModeContext);
  if (!context) {
    throw new Error('useAdminMode must be used within an AdminModeProvider');
  }
  return context;
};

interface AdminModeProviderProps {
  children: React.ReactNode;
}

export const AdminModeProvider: React.FC<AdminModeProviderProps> = ({ children }) => {
  const { isAdmin } = useAdminAuth();
  const [isAdminModeActive, setIsAdminModeActive] = useState(false);
  const [currentAdminPath, setCurrentAdminPath] = useState<string | null>(null);
  const [isPreviewMode, setPreviewMode] = useState(false);

  // Auto-disable admin mode if user loses admin privileges
  useEffect(() => {
    if (!isAdmin && isAdminModeActive) {
      setIsAdminModeActive(false);
      setCurrentAdminPath(null);
      setPreviewMode(false);
    }
  }, [isAdmin, isAdminModeActive]);

  const toggleAdminMode = () => {
    if (!isAdmin) return;
    setIsAdminModeActive(!isAdminModeActive);
    if (isAdminModeActive) {
      setCurrentAdminPath(null);
      setPreviewMode(false);
    }
  };

  const canAccessLevel = (moduleId: string, levelId: number) => {
    return isAdminModeActive && isAdmin;
  };

  const jumpToLevel = (moduleId: string, levelId: number) => {
    if (!canAccessLevel(moduleId, levelId)) return;
    
    setCurrentAdminPath(`${moduleId}-${levelId}`);
    setPreviewMode(true);
  };

  const value: AdminModeContextType = {
    isAdminModeActive,
    toggleAdminMode,
    canAccessLevel,
    jumpToLevel,
    currentAdminPath,
    setCurrentAdminPath,
    isPreviewMode,
    setPreviewMode
  };

  return (
    <AdminModeContext.Provider value={value}>
      {children}
    </AdminModeContext.Provider>
  );
};