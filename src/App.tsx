import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CityProvider } from "@/contexts/CityContext";
import { AuthProvider } from "@/hooks/useAuth";
import CitySelector from "./pages/CitySelector";
import CityHome from "./pages/CityHome";
import Admin from "./pages/Admin";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import Regulations from "./pages/Regulations";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ConsumerDefense from "./pages/ConsumerDefense";
import BlogPost from "./pages/BlogPost";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CityProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<CitySelector />} />
            <Route path="/termos-de-uso" element={<TermsOfService />} />
            <Route path="/regulamento" element={<Regulations />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="/codigo-de-defesa" element={<ConsumerDefense />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/planos" element={<Plans />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/:citySlug" element={<CityHome />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </CityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
