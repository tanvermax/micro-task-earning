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
    </div>
  );
}
