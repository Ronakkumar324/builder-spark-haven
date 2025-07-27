import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink?: string;
  backLinkText?: string;
}

export default function PlaceholderPage({
  title,
  description,
  backLink = "/",
  backLinkText = "Back to Home",
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 flex items-center justify-center py-20">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
            <Construction className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

          <p className="text-gray-600 mb-8">{description}</p>

          <Link
            to={backLink}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLinkText}
          </Link>

          <p className="text-sm text-gray-500 mt-6">
            Continue prompting to fill in this page content if needed.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
