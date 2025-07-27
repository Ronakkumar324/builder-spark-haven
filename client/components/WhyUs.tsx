import { MapPin, MessageCircle, Smartphone, Clock } from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      icon: MapPin,
      title: "Hyperlocal Supplier Discovery",
      description:
        "Find suppliers in your immediate area for faster delivery and fresher products",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Fallback Ordering",
      description:
        "Can't complete online? Switch to WhatsApp ordering seamlessly for convenience",
    },
    {
      icon: Smartphone,
      title: "No App Required",
      description:
        "Access everything through your web browser - no downloads or installations needed",
    },
    {
      icon: Clock,
      title: "Real-time Listings",
      description:
        "Get up-to-date product availability and pricing information instantly",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose StreetSupply?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We've built the platform with street food vendors in mind, focusing
            on simplicity and local connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
