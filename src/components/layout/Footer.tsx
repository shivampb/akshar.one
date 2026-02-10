import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export const Footer = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => null);

  const footerLinks = {
    properties: settings?.data.properties_links?.length
      ? settings.data.properties_links.map((item: any) => ({
        name: item.label || "",
        path: prismic.isFilled.link(item.link) ? prismic.asLink(item.link) : "#"
      }))
      : [
        { name: "All Properties", path: "/properties" },
        { name: "Apartments", path: "/properties?type=Apartment" },
        { name: "Villas", path: "/properties?type=Villa" },
        { name: "Commercial", path: "/properties?type=Commercial" },
      ],
    company: settings?.data.company_links?.length
      ? settings.data.company_links.map((item: any) => ({
        name: item.label || "",
        path: prismic.isFilled.link(item.link) ? prismic.asLink(item.link) : "#"
      }))
      : [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
  };

  const socialLinks = [
    { icon: Instagram, link: settings?.data.instagram_link },
    { icon: Facebook, link: settings?.data.facebook_link },
    { icon: Linkedin, link: settings?.data.linkedin_link },
  ];

  return (
    <footer className="bg-gray-50 text-gray-900 border-t border-gray-200">
      <div className="container-luxury py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h2 className="font-serif text-2xl font-semibold">
                <span className="text-gray-900">Akshar</span>
                <span className="text-blue-600">One</span>
              </h2>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {settings?.data.footer_description || "Curating exceptional properties for discerning clients. Experience luxury real estate at its finest."}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const url = prismic.asLink(social.link);
                if (!url) return null;
                return (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition-colors text-gray-500"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Properties Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-gray-900">Properties</h3>
            <ul className="space-y-3">
              {footerLinks.properties.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.path}
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
              {footerLinks.company.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.path}
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
                <div className="text-sm text-gray-600 prose-sm">
                  {prismic.isFilled.richText(settings?.data.address) ? (
                    <PrismicRichText field={settings?.data.address} />
                  ) : (
                    <span>
                      123 Luxury Avenue, Suite 500
                      <br />
                      New York, NY 10001
                    </span>
                  )}
                </div>
              </li>
              {(settings?.data.phone || !settings) && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                  <a
                    href={`tel:${settings?.data.phone || "+1234567890"}`}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {settings?.data.phone || "+1 (234) 567-890"}
                  </a>
                </li>
              )}
              {(settings?.data.email || !settings) && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                  <a
                    href={`mailto:${settings?.data.email || "hello@aksharone.com"}`}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {settings?.data.email || "hello@aksharone.com"}
                  </a>
                </li>
              )}
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
