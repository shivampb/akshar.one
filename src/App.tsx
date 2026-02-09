import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

import { HelmetProvider, Helmet } from "react-helmet-async";

const App = () => (
  <HelmetProvider>
    <Helmet>
      <title>Akshar One | Luxury Real Estate Properties</title>
      <meta name="description" content="Discover exceptional luxury properties curated for discerning buyers. Premium villas, penthouses, and estates in prime locations worldwide. Experience real estate at its finest." />
      <meta name="keywords" content="luxury real estate, premium properties, luxury homes, villas, penthouses, estates, high-end properties" />
      <meta name="author" content="Akshar One" />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://aksharone.com/" />
      <meta property="og:title" content="Akshar One | Luxury Real Estate Properties" />
      <meta property="og:description" content="Discover exceptional luxury properties curated for discerning buyers. Premium villas, penthouses, and estates in prime locations worldwide." />
      <meta property="og:image" content="/og-image.jpg" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@AksharOne" />
      <meta name="twitter:title" content="Akshar One | Luxury Real Estate Properties" />
      <meta name="twitter:description" content="Discover exceptional luxury properties curated for discerning buyers. Premium villas, penthouses, and estates in prime locations worldwide." />
      <meta name="twitter:image" content="/og-image.jpg" />
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:category/:slug" element={<BlogDetails />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:slug" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
