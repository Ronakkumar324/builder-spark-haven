import { Link } from "react-router-dom";
import { ArrowRight, Users, Truck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connecting Vendors and Suppliers for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Street Food Supply
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            StreetSupply simplifies local sourcing for food vendors. Discover
            suppliers in your area, browse products, and streamline your supply
            chain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register/vendor"
              className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              I'm a Vendor
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/register/supplier"
              className="group bg-white text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-orange-500 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
            >
              <Truck className="w-5 h-5" />
              I'm a Supplier
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Active Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Trusted Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-gray-600">Products Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
