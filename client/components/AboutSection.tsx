import { Package, RefreshCw, CheckCircle, BarChart3 } from "lucide-react";

export default function AboutSection() {
  const benefits = [
    {
      icon: BarChart3,
      title: "Better Inventory Control",
      description:
        "Real-time updates help suppliers keep track of stock and vendors avoid shortages.",
    },
    {
      icon: Package,
      title: "Higher Product Quality",
      description:
        "Suppliers can showcase item details, freshness, and pricing upfront.",
    },
    {
      icon: CheckCircle,
      title: "Transparent Transactions",
      description:
        "Both sides see order histories and delivery details clearly — no confusion.",
    },
    {
      icon: RefreshCw,
      title: "Simplified Sourcing",
      description:
        "Vendors can place orders in seconds, even from multiple suppliers.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About StreetSupply
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Who We Are */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                Who We Are
              </h3>

              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p className="mb-4">
                  StreetSupply is a modern B2B web platform built to solve the
                  messy, informal supply chain of the street food industry.
                </p>
                <p className="mb-4">
                  We help{" "}
                  <span className="font-semibold text-blue-600">vendors</span>{" "}
                  and{" "}
                  <span className="font-semibold text-orange-600">
                    suppliers
                  </span>{" "}
                  connect digitally — eliminating paperwork, middlemen, and
                  guesswork.
                </p>
                <p>
                  Whether you're selling ingredients or sourcing them,
                  StreetSupply is built to streamline your business.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Key Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              Key Benefits
            </h3>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Registered Vendors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                200+
              </div>
              <div className="text-gray-600">Active Suppliers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600">Products Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
