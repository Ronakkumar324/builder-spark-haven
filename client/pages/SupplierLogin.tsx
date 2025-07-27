import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Truck, Phone, Mail, Lock, LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

export default function SupplierLogin() {
  const navigate = useNavigate();
  const { suppliers, loginUser } = useApp();

  const [formData, setFormData] = useState({
    identifier: "", // Phone or Email
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find supplier by phone or email
    const supplier = suppliers.find(
      (s) => s.phone === formData.identifier || s.email === formData.identifier,
    );

    if (supplier) {
      // In a real app, you'd verify the password hash
      console.log("Supplier login successful:", supplier);
      loginUser(supplier.id, "supplier");
      navigate("/supplier-dashboard");
    } else {
      setError("Invalid phone/email or password. Please try again.");
    }

    setIsSubmitting(false);
  };

  const isFormValid = formData.identifier && formData.password;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-br from-orange-50 to-red-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Supplier Login
              </h1>
              <p className="text-gray-600">
                Welcome back! Sign in to your supplier account
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone/Email */}
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number or Email *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-1" />
                    <span className="text-gray-400">/</span>
                    <Mail className="h-5 w-5 text-gray-400 ml-1" />
                  </div>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    required
                    value={formData.identifier}
                    onChange={handleChange}
                    className="block w-full pl-16 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter phone number or email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                {isSubmitting ? "Signing In..." : "Sign In as Supplier"}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register/supplier"
                  className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                  Register here
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
