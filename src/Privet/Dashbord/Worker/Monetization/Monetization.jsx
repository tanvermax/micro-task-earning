import React, { useState } from "react";

export default function Monetization() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    paymentMethod: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Submitted for review!");
    // Add API call here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-100 via-white to-amber-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Monetization Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Select a method</option>
              <option value="Bkash">Bkash</option>
              <option value="Nagad">Nagad</option>
              <option value="Bank">Bank Transfer</option>
              <option value="Paypal">PayPal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Verification Document</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              required
              className="mt-1 w-full text-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Submit Monetization Request
          </button>
        </form>

        <hr className="my-6" />

        <div className="text-gray-700 space-y-3">
          <h3 className="text-xl font-semibold text-indigo-600">Other Monetization Options</h3>
          <ul className="list-disc list-inside">
            <li>📈 View Earnings Dashboard</li>
            <li>💸 Request Withdrawal</li>
            <li>🔒 Set up 2FA for secure payouts</li>
            <li>🧾 View Transaction History</li>
            <li>📝 Tax Form Submission</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
