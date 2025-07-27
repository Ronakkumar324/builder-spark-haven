import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight, Users, Package, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to simplify your sourcing?
        </h2>

        <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">
          Join hundreds of vendors and suppliers who are already streamlining
          their business with StreetSupply.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register/vendor"
            className="group bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Get Started as Vendor
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/register/supplier"
            className="group bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            List Your Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Contact Button */}
        <div className="mt-8">
          <ScrollLink
            to="contact"
            smooth={true}
            duration={800}
            className="group inline-flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="border-b border-orange-200 hover:border-white transition-colors duration-200">
              Questions? Contact Us
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}
