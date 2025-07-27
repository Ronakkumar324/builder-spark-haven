import { Link } from "react-router-dom";
import {
  Package,
  CheckCircle,
  Search,
  BarChart3,
  Users,
  Truck,
  ArrowRight,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const benefits = [
    {
      icon: BarChart3,
      title: "Smart Inventory",
      description: "Suppliers manage stock with ease.",
    },
    {
      icon: Package,
      title: "Faster Sourcing",
      description: "Vendors order directly from nearby suppliers.",
    },
    {
      icon: Search,
      title: "Quality Assurance",
      description:
        "Product details, freshness, and ratings are visible up front.",
    },
    {
      icon: CheckCircle,
      title: "Transparent Deals",
      description: "Every transaction is visible and documented.",
    },
  ];

  const iconElements = [
    { icon: Package, color: "from-blue-500 to-blue-600" },
    { icon: CheckCircle, color: "from-green-500 to-green-600" },
    { icon: Search, color: "from-purple-500 to-purple-600" },
    { icon: BarChart3, color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About StreetSupply
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building transparency and efficiency in India's street food supply
              chain.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                  <p>
                    StreetSupply is a modern B2B web platform designed to
                    simplify sourcing and selling for the street food ecosystem.
                  </p>
                  <p>
                    We bring together suppliers and vendors under one digital
                    roof, eliminating paperwork, delays, and communication gaps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Helps Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How It Helps
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side - Benefits */}
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <benefit.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side - Illustrative Icons */}
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-8">
                  {iconElements.map((item, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-200"
                      style={{
                        background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                      }}
                    >
                      <div
                        className={`w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center`}
                      >
                        <item.icon className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
              <div className="absolute top-6 left-6 text-indigo-500">
                <Quote className="w-12 h-12" />
              </div>

              <blockquote className="text-center mt-8">
                <p className="text-xl md:text-2xl font-medium text-gray-900 italic leading-relaxed">
                  We empower chaiwalas, momo sellers, and local street food
                  heroes with technology that simplifies supply chains — while
                  keeping the taste of tradition alive.
                </p>
              </blockquote>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">
                    Team StreetSupply
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join StreetSupply?
            </h2>

            <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">
              Whether you're sourcing ingredients or supplying them, we're here
              to make your business easier.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register/vendor"
                className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Users className="w-5 h-5" />
                Start as Vendor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/register/supplier"
                className="group bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Truck className="w-5 h-5" />
                List as Supplier
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
