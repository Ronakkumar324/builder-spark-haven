import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const aboutLinks = [
    { name: "About", path: "/about" },
  ];

  const contactLinks = [
    { name: "Contact", path: "/contact", isScroll: true },
  ];

  const termsLinks = [
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const privacyLinks = [
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
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

          {/* About Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
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

          {/* Terms & Conditions Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Terms & Conditions
            </h3>
            <ul className="space-y-2">
              {termsLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy Policy Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Privacy Policy
            </h3>
            <ul className="space-y-2">
              {privacyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Message */}
        <p className="text-sm text-gray-500 text-center mt-4">
          We're not on social media (yet). Stay tuned for updates!
        </p>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} StreetSupply. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
