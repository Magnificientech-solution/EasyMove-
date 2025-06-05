import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import Toaster from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import DriverRegistration from "./pages/DriverRegistration";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TermsAndConditions from "./pages/TermsAndConditions";
// Removed Calculator page (Price Quote page) to avoid confusion
import BookingTracker from "./pages/BookingTracker";
import Checkout from "./pages/Checkout";
import DetailedQuote from "./pages/DetailedQuote";
import EmbeddedStripeCheckout from "./pages/EmbeddedStripeCheckout";
import PayPalCheckout from "./pages/PayPalCheckout";
import PaymentTester from "./pages/PaymentTester";
import StripeCheckout from "./pages/StripeCheckout";
import TestDetailedQuotes from "./pages/TestDetailedQuotes";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MobileMenu from "./components/layout/MobileMenu";
import { QuoteProvider } from "./contexts/QuoteContext";
import BookingConfirmation from "./pages/BookingConfirmation";
import CalculatorPage from "./pages/Calculator";
import DistanceCalculator from "./pages/DistanceCalculator";
import StripeConfig from "./pages/StripeConfig";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/driver-registration" component={DriverRegistration} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/booking-confirmation" component={BookingConfirmation} />
      <Route path="/stripe-config" component={StripeConfig} />
      <Route path="/paypal-checkout" component={PayPalCheckout} />
      <Route path="/stripe-checkout" component={StripeCheckout} />
      <Route path="/embedded-checkout" component={EmbeddedStripeCheckout} />
      <Route path="/distance-calculator" component={DistanceCalculator} />
      <Route path="/calculator" component={CalculatorPage} />
      <Route path="/payment-test" component={PaymentTester} />
      <Route path="/quote" component={DetailedQuote} />
      <Route path="/test-detailed-quotes" component={TestDetailedQuotes} />
      <Route path="/booking-tracker" component={BookingTracker} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/bookings" component={AdminBookings} />
      <Route component={NotFound} />
    </Switch>
  );
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // console.log("process.env++++++++++++++",process.env)
console.log(" import.meta.env++++++++++++++", import.meta.env)
  return (
    <QueryClientProvider client={queryClient}>
      <QuoteProvider>
        <TooltipProvider>
          <Elements stripe={stripePromise}>
          <div className="flex flex-col min-h-screen">
            <Header onMenuToggle={toggleMobileMenu} />
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
         </Elements>
        </TooltipProvider>
      </QuoteProvider>
    </QueryClientProvider>
  );
}

export default App;
