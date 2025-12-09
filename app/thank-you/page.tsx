import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
        <p className="text-gray-500 mb-8">
          You have successfully signed out. We hope to see you again soon.
        </p>
        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            Sign In Again
          </Link>
          <Link
            href="/"
            className="block w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
