
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import MinimalLayout from "@/components/layout/MinimalLayout";
import LearnPage from "./pages/LearnPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <ProtectedRoute>
                <MinimalLayout>
                  <Routes>
                    <Route path="/" element={<LearnPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </MinimalLayout>
              </ProtectedRoute>
            </BrowserRouter>
          </TooltipProvider>
          </ProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
