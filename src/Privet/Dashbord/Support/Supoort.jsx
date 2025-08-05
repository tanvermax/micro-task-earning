import React from "react";
import { FaEnvelope, FaPhoneAlt, FaHeadset } from "react-icons/fa";

export default function Support() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">Need Help? Contact Support</h1>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <FaEnvelope className="text-4xl mx-auto mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold mb-2">Email Us</h2>
          <p className="text-sm text-gray-600">support@example.com</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <FaPhoneAlt className="text-4xl mx-auto mb-4 text-green-500" />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-sm text-gray-600">+880 1234 567 890</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <FaHeadset className="text-4xl mx-auto mb-4 text-purple-500" />
          <h2 className="text-xl font-semibold mb-2">Live Chat</h2>
          <p className="text-sm text-gray-600">Available 9AM - 6PM (BDT)</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-700">
          We usually respond within 24 hours. For urgent issues, please call or
          use live chat.
        </p>
      </div>
    </div>
  );
}
