import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, Lock, LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

export default function VendorLogin() {
  const navigate = useNavigate();
  const { vendors, loginUser } = useApp();

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

    // Find vendor by phone or email
    const vendor = vendors.find(
      (v) => v.phone === formData.identifier || v.email === formData.identifier,
    );

    if (vendor) {
      // In a real app, you'd verify the password hash
      console.log("Vendor login successful:", vendor);
      loginUser(vendor.id, "vendor");
      navigate("/suppliers");
    } else {
      setError("Invalid phone/email or password. Please try again.");
    }

    setIsSubmitting(false);
  };

  const isFormValid = formData.identifier && formData.password;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Vendor Login
              </h1>
              <p className="text-gray-600">
                Welcome back! Sign in to your vendor account
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
                    className="block w-full pl-16 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                {isSubmitting ? "Signing In..." : "Sign In as Vendor"}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register/vendor"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>

            {/* Back Link */}
            <div className="mt-4 text-center">
              <Link
                to="/role-select"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
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
