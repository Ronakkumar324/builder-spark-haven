import { Link, useNavigate } from "react-router-dom";
import { Users, Truck, ArrowRight, LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleCardClick = (path: string, event: React.MouseEvent) => {
    // Prevent navigation if clicking on login button
    if ((event.target as HTMLElement).closest(".login-button")) {
      return;
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Role
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select whether you're a vendor looking to source products or a
              supplier wanting to list your products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vendor Card */}
            <div
              onClick={(e) => handleCardClick("/register/vendor", e)}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-orange-200 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Users className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  I'm a Vendor
                </h2>

                <p className="text-gray-600 mb-6">
                  Looking to source ingredients and supplies for your street
                  food business. Browse local suppliers and place orders easily.
                </p>

                <ul className="text-left text-gray-600 space-y-2 mb-8">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Browse supplier catalogs
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Add products to cart
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Track your orders
                  </li>
                </ul>

                <div className="space-y-4">
                  <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Get Started as Vendor
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      to="/login/vendor"
                      className="login-button flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LogIn className="w-4 h-4" />
                      Already have an account? Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Supplier Card */}
            <div
              onClick={(e) => handleCardClick("/register/supplier", e)}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-orange-200 cursor-pointer"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Truck className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  I'm a Supplier
                </h2>

                <p className="text-gray-600 mb-6">
                  Provide ingredients and supplies to street food vendors in
                  your area. List your products and manage orders.
                </p>

                <ul className="text-left text-gray-600 space-y-2 mb-8">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    List your products
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Manage inventory
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Process vendor orders
                  </li>
                </ul>

                <div className="space-y-4">
                  <div className="flex items-center justify-center text-orange-600 font-semibold group-hover:text-orange-700">
                    Get Started as Supplier
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      to="/login/supplier"
                      className="login-button flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LogIn className="w-4 h-4" />
                      Already have an account? Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
