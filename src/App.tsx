
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import MinimalLayout from "@/components/layout/MinimalLayout";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import LearnPage from "./pages/LearnPage";
import SoftSkillsPage from "./pages/SoftSkillsPage";
import PaperTradingPage from "./pages/PaperTradingPage";
import PhilsFriendsPage from "./pages/PhilsFriendsPage";
import AskPhilPage from "./pages/AskPhilPage";

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
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/learn" element={<LearnPage />} />
                    <Route path="/soft-skills" element={<SoftSkillsPage />} />
                    <Route path="/paper-trading" element={<PaperTradingPage />} />
                    <Route path="/phils-friends" element={<PhilsFriendsPage />} />
                    <Route path="/ask-phil" element={<AskPhilPage />} />
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
