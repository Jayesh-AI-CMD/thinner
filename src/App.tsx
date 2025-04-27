import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import UserProfilePage from "./pages/UserProfilePage";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminProductsPage from "./pages/admin/ProductsPage";
import OrdersPage from "./pages/admin/OrdersPage";
import CustomersPage from "./pages/admin/CustomersPage";
import ProductDetailPageLatest from './pages/ProductDetailPageLatest';
import UserOrdersPage from './pages/UserOrdersPage';
import Coupon from './pages/Coupon';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionPage from './pages/TermsConditionPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/products/id/:id" element={<ProductDetailPageLatest />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order/confirmation" element={<OrderConfirmationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/orders" element={<UserOrdersPage />} />
                <Route path="/account" element={<UserProfilePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-conditions" element={<TermsConditionPage />} />
                <Route path="/refund-policy" element={<RefundPolicyPage />} />
                <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                
                
                {/* Admin Routes */}
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/admin/orders" element={<OrdersPage />} />
                <Route path="/admin/customers" element={<CustomersPage />} />
                <Route path="/admin/coupon" element={<Coupon />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
