import React from "react";

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>

      <section className="space-y-6 text-justify">
        <p>
          Welcome to our platform. By accessing or using our services, you agree
          to be bound by the following terms and conditions. Please read them
          carefully.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-2">1. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. You agree to accept responsibility for all
            activities that occur under your account.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
          <p>
            You may use our platform only for lawful purposes. You must not use
            it in any way that breaches local, national, or international law.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Submissions & Content</h2>
          <p>
            By submitting any file, information, or content, you grant us the
            right to use, modify, and distribute it as necessary for providing
            services, in accordance with our privacy policy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Monetization & Earnings</h2>
          <p>
            Users participating in monetization must provide accurate credentials
            and banking information. Earnings will be disbursed only after
            verification. Fraudulent activity may lead to permanent account
            suspension.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account at any
            time, without prior notice, if you breach these terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            platform after changes implies your acceptance of the updated terms.
          </p>
        </div>

        <p className="text-sm text-gray-600 mt-6">
          Last updated: August 5, 2025
        </p>
      </section>

      {/* Contact Section */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-xl font-bold mb-4 text-center">Contact Us</h2>

        <div className="flex justify-center gap-6">
          {/* Call Button */}
          <a
            href="tel:01701866120"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            📞 Call Us
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/8801701866120"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            💬 WhatsApp Chat
          </a>
        </div>
      </div>
    </div>
  );
}
