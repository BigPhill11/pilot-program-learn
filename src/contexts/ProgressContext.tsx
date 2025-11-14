import React, { createContext, useContext } from 'react';

interface ProgressContextType {
  getModuleProgress: (moduleId: string) => number;
  getTotalCompletedModules: () => number;
  getOverallProgress: () => number;
  updateModuleProgress: (moduleId: string, progress: number) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getModuleProgress = () => 0;
  const getTotalCompletedModules = () => 0;
  const getOverallProgress = () => 0;
  const updateModuleProgress = async () => {};

  return (
    <ProgressContext.Provider
      value={{
        getModuleProgress,
        getTotalCompletedModules,
        getOverallProgress,
        updateModuleProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgressContext must be used within ProgressProvider');
  }
  return context;
};
