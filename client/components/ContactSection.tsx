import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const teamContacts = [
    { email: "ronakbhambu@gmail.com", phone: "+91 7041591447" },
    { email: "bhargavbarewar18@gmail.com", phone: "+91 98230 49560" },
    { email: "balanseamit@gmail.com", phone: "+91 96735 11080" },
    { email: "adishinde62020@gmail.com", phone: "+91 88308 99840" },
    { email: "dhirajjadhav027@gmail.com", phone: "+91 91564 80790" },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600">
              We're happy to connect. Reach out to any of our team members.
            </p>
          </div>

          {/* Team Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg space-y-2 mb-6"
              >
                <p className="text-gray-800 text-sm">
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {contact.email}
                  </a>
                </p>
                <p className="text-gray-800 text-sm">
                  <strong>Phone:</strong>{" "}
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {contact.phone}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
