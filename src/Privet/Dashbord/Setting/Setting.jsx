import React, { useState } from "react";

export default function Settings() {
  const [formData, setFormData] = useState({
   
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated!");
  };

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      // Add actual deletion logic here
      alert("Account deleted!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Account Info */}
        <div>
         
        </div>

        {/* Preferences */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Website Preferences</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              Enable Email Notifications
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleChange}
              />
              Enable Dark Mode
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>

      {/* Danger Zone */}
      <div className="mt-10 border-t pt-8">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Danger Zone
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
