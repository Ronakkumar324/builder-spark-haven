import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import ScrollToTop from "@/components/ScrollToTop";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import RoleSelect from "./pages/RoleSelect";
import VendorRegister from "./pages/VendorRegister";
import VendorLogin from "./pages/VendorLogin";
import SupplierRegister from "./pages/SupplierRegister";
import SupplierLogin from "./pages/SupplierLogin";
import SupplierList from "./pages/SupplierList";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import SupplierDashboard from "./pages/SupplierDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/register/vendor" element={<VendorRegister />} />
            <Route path="/login/vendor" element={<VendorLogin />} />
            <Route path="/register/supplier" element={<SupplierRegister />} />
            <Route path="/login/supplier" element={<SupplierLogin />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
