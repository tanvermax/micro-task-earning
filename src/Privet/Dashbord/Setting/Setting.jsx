import React, { useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth"; // If you have auth context
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [formData, setFormData] = useState({
    notifications: true,
    darkMode: false,
  });

  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth(); // your auth context
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure? This cannot be undone!");

    if (!confirmed) return;

    try {
      const res = await axiosSecure.delete(`/user/delete/${user.email}`);

      if (res.data.message) {
        alert("Account deleted successfully");

        // Logout user
        await logOut();

        navigate("/"); // redirect to homepage
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting account!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">

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
