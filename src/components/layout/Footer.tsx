import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  properties: [
    { name: "All Properties", path: "/properties" },
    { name: "Apartments", path: "/properties?type=Apartment" },
    { name: "Villas", path: "/properties?type=Villa" },
    { name: "Commercial", path: "/properties?type=Commercial" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-900 border-t border-gray-200">
      <div className="container-luxury py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h2 className="font-serif text-2xl font-semibold">
                <span className="text-gray-900">Akshar</span>
                <span className="text-blue-600">One</span>
              </h2>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Curating exceptional properties for discerning clients. Experience
              luxury real estate at its finest.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition-colors text-gray-500"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition-colors text-gray-500"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition-colors text-gray-500"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Properties Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-gray-900">Properties</h3>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-gray-900">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-gray-900">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 Luxury Avenue, Suite 500
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <a
                  href="mailto:hello@aksharone.com"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  hello@aksharone.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Akshar One. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Designed with excellence in mind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
