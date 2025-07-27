import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const emails = ["ronakbhambu@gmail.com", "bhargavbarewar18@gmail.com"];

  const phones = ["7041591447", "9673511080"];

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
              We're happy to connect. Reach out to us anytime.
            </p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Emails Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-600">
                  📧 Email Us
                </h3>
              </div>

              <div className="space-y-3">
                {emails.map((email, index) => (
                  <div key={index}>
                    <a
                      href={`mailto:${email}`}
                      className="text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 block"
                    >
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Numbers Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-600">
                  📞 Call Us
                </h3>
              </div>

              <div className="space-y-3">
                {phones.map((phone, index) => (
                  <div key={index}>
                    <a
                      href={`tel:${phone}`}
                      className="text-lg text-gray-700 hover:text-green-600 transition-colors duration-200 block"
                    >
                      +91 {phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Whether you have questions about our platform, need technical
              support, or want to discuss business partnerships, we're here to
              help. Get in touch and let's build the future of street food
              supply together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
