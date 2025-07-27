import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useApp();
  const location = useLocation();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isHomePage = location.pathname === "/";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact", isScroll: true },
    { name: "Login / Register", path: "/role-select" },
    { name: "Browse", path: "/suppliers" },
    { name: "Cart", path: "/cart", icon: ShoppingCart },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                StreetSupply
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) =>
                item.isScroll && isHomePage ? (
                  <ScrollLink
                    key={item.name}
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 relative cursor-pointer"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </ScrollLink>
                ) : item.isScroll && !isHomePage ? (
                  <Link
                    key={item.name}
                    to="/#contact"
                    className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 relative"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 relative"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                    {item.name === "Cart" && totalCartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalCartItems}
                      </span>
                    )}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-gray-100 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navItems.map((item) =>
              item.isScroll && isHomePage ? (
                <ScrollLink
                  key={item.name}
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="text-gray-600 hover:text-orange-600 block px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2 relative cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </ScrollLink>
              ) : item.isScroll && !isHomePage ? (
                <Link
                  key={item.name}
                  to="/#contact"
                  className="text-gray-600 hover:text-orange-600 block px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2 relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-orange-600 block px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2 relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                  {item.name === "Cart" && totalCartItems > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
