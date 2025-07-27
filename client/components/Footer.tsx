import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact", isScroll: true },
    { name: "Terms", path: "/terms" },
    { name: "Privacy", path: "/privacy" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">StreetSupply</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Connecting vendors and suppliers for street food supply.
              Simplifying local sourcing for food vendors across the region.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  {link.isScroll && isHomePage ? (
                    <ScrollLink
                      to="contact"
                      smooth={true}
                      duration={500}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                    >
                      {link.name}
                    </ScrollLink>
                  ) : link.isScroll && !isHomePage ? (
                    <Link
                      to="/#contact"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} StreetSupply. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
