
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import LearnPage from "./pages/LearnPage";
import SoftSkillsPage from "./pages/SoftSkillsPage";
import PaperTradingPage from "./pages/PaperTradingPage";
import AskPhilPage from "./pages/AskPhilPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <div className="min-h-screen bg-background text-foreground">
                <ProtectedRoute>
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/learn" element={<LearnPage />} />
                      <Route path="/soft-skills" element={<SoftSkillsPage />} />
                      <Route path="/paper-trading" element={<PaperTradingPage />} />
                      <Route path="/ask-phil" element={<AskPhilPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </ProtectedRoute>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
