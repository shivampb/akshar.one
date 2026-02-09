import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, Mail, Users, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Residential", path: "/properties" },
  { name: "Commercial & Retail", path: "/properties" },
  { name: "Clubs", path: "/about" },
  { name: "Insights", path: "/blogs" },
];

const connectOptions = [
  {
    icon: Phone,
    title: "Request a Call Back",
    subtitle: "We will get back to you",
    action: "callback"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Send us your queries on +91 6359977405",
    action: "whatsapp",
    link: "https://wa.me/916359977405"
  },
  {
    icon: Phone,
    title: "Toll-Free",
    subtitle: "1800 108 0009",
    action: "phone",
    link: "tel:18001080009"
  },
  {
    icon: Mail,
    title: "Share with us",
    subtitle: "share@estateluxe.com",
    action: "email",
    link: "mailto:share@estateluxe.com"
  },
  {
    icon: Users,
    title: "Partner with Us",
    subtitle: "partner@estateluxe.com",
    action: "email",
    link: "mailto:partner@estateluxe.com"
  }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if we are on the home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsConnectOpen(false);
  }, [location]);

  // Determine navbar styles based on scroll and page
  // If not home page, always use scrolled style (white bg, black text)
  const useScrolledStyle = isScrolled || !isHomePage;

  const navbarClasses = useScrolledStyle
    ? "bg-white shadow-md py-4"
    : "bg-transparent py-4";

  const textClasses = useScrolledStyle
    ? "text-black hover:text-blue-600"
    : "text-white hover:text-white/80";

  const logoTextClasses = useScrolledStyle
    ? "text-black"
    : "text-white";

  const logoSubTextClasses = useScrolledStyle
    ? "text-gray-600"
    : "text-white/80";

  const toggleButtonClasses = useScrolledStyle
    ? "text-black hover:bg-gray-100"
    : "text-white hover:bg-white/10";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClasses}`}>
      <nav className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded transition-colors ${toggleButtonClasses}`}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className={`text-xl md:text-2xl font-light ${logoTextClasses}`}>
              Estate<span className={logoSubTextClasses}> | Luxe</span>
            </span>
          </Link>
        </div>

        {/* Right: Desktop Navigation + CTA */}
        <div className="flex items-center gap-8">
          {/* Businesses Link - Hidden on mobile */}
          <Link
            to="/about"
            className={`hidden lg:block text-base font-medium transition-colors ${textClasses}`}
          >
            Businesses
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors ${textClasses}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Connect Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsConnectOpen(!isConnectOpen)}
                className={`text-base font-medium transition-colors flex items-center gap-1 ${textClasses}`}
              >
                Connect
                <ChevronDown className={`w-4 h-4 transition-transform ${isConnectOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isConnectOpen && (
                  <>
                    {/* Backdrop for closing */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsConnectOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl overflow-hidden z-20"
                    >
                      {connectOptions.map((option, index) => (
                        <div key={index}>
                          {option.link ? (
                            <a
                              href={option.link}
                              target={option.action === "whatsapp" ? "_blank" : undefined}
                              rel={option.action === "whatsapp" ? "noopener noreferrer" : undefined}
                              className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsConnectOpen(false)}
                            >
                              <option.icon className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-gray-900 text-sm">{option.title}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{option.subtitle}</p>
                              </div>
                            </a>
                          ) : (
                            <Link
                              to="/contact"
                              className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsConnectOpen(false)}
                            >
                              <option.icon className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-gray-900 text-sm">{option.title}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{option.subtitle}</p>
                              </div>
                            </Link>
                          )}
                          {index < connectOptions.length - 1 && (
                            <div className="border-b border-gray-100" />
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Enquire Now Button */}
          <Link
            to="/contact"
            className="bg-white text-black text-xs md:text-sm font-medium px-4 md:px-6 py-2 md:py-2.5 rounded hover:bg-white/90 transition-colors"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile Sidebar Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl overflow-y-auto"
              >
                <div className="p-6">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mb-8 p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Logo */}
                  <Link to="/" className="block mb-8">
                    <span className="text-foreground text-xl font-light">
                      Estate<span className="text-muted-foreground"> | Luxe</span>
                    </span>
                  </Link>

                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-4">
                    <Link to="/" className="text-foreground hover:text-gold transition-colors py-2">
                      Home
                    </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="text-foreground hover:text-gold transition-colors py-2"
                      >
                        {link.name}
                      </Link>
                    ))}

                    {/* Mobile Connect Section */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect With Us</h3>
                      {connectOptions.map((option, index) => (
                        <div key={index}>
                          {option.link ? (
                            <a
                              href={option.link}
                              target={option.action === "whatsapp" ? "_blank" : undefined}
                              rel={option.action === "whatsapp" ? "noopener noreferrer" : undefined}
                              className="flex items-start gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
                            >
                              <option.icon className="w-4 h-4 text-gray-700 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{option.title}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{option.subtitle}</p>
                              </div>
                            </a>
                          ) : (
                            <Link
                              to="/contact"
                              className="flex items-start gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
                            >
                              <option.icon className="w-4 h-4 text-gray-700 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{option.title}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{option.subtitle}</p>
                              </div>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>

                    <Link to="/about" className="text-foreground hover:text-gold transition-colors py-2 mt-4">
                      Businesses
                    </Link>
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
