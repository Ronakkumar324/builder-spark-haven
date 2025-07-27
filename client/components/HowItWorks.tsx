import { UserPlus, List, ShoppingCart, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description:
        "Register as a vendor or supplier to get started on the platform",
    },
    {
      icon: List,
      title: "List Products",
      description:
        "Suppliers add their products with prices and stock information",
    },
    {
      icon: ShoppingCart,
      title: "Browse & Order",
      description:
        "Vendors browse products, add to cart, and place orders easily",
    },
    {
      icon: Truck,
      title: "Get Delivered",
      description:
        "Orders are delivered directly to vendor addresses for convenience",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started with StreetSupply is simple. Follow these steps to
            streamline your supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-8"></div>
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
