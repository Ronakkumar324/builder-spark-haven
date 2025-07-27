import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  User,
  Phone,
  Building,
  Mail,
  Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

export default function SupplierRegister() {
  const navigate = useNavigate();
  const { registerSupplier } = useApp();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    businessName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Register supplier (no products at this stage)
    registerSupplier(
      {
        fullName: formData.fullName,
        phone: formData.phone,
        businessName: formData.businessName,
        email: formData.email,
      },
      [], // Empty products array - products will be added later in dashboard
    );

    console.log("Supplier registered:", formData);

    // Navigate to login page
    navigate("/login/supplier");
  };

  const isFormValid =
    formData.fullName &&
    formData.phone &&
    formData.businessName &&
    formData.password;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-br from-orange-50 to-red-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Register as Supplier
              </h1>
              <p className="text-gray-600">
                Join StreetSupply to sell your products to local vendors
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Business Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Business Name */}
                  <div>
                    <label
                      htmlFor="businessName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Business Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your business name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password *
                    </label>
                    <div className="relative max-w-md">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Create a password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps Info */}
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <h3 className="font-semibold text-orange-900 mb-2">
                  What's Next?
                </h3>
                <p className="text-orange-800 text-sm">
                  After registration, you'll be able to log in and add your
                  products to your supplier catalog in your dashboard.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-200"
              >
                {isSubmitting ? "Creating Account..." : "Register as Supplier"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login/supplier"
                  className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                  Login here
                </Link>
              </p>
            </div>

            {/* Back Link */}
            <div className="mt-4 text-center">
              <Link
                to="/role-select"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Role Selection
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
