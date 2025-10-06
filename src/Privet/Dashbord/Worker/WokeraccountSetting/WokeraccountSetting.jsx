import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../Provider/useAuth';
import { toast } from 'react-toastify';
import useProfile from '../../../../Provider/userProfile';

export default function WorkerAccountSetting() {
  const { user } = useAuth();
  const { userData, loading, error } = useProfile(); // Destructure properly

  console.log("User Data:", userData);
  console.log("Loading:", loading);
  console.log("Error:", error);

  const [formData, setFormData] = useState({
    categories: [],
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://micro-task-server-plum.vercel.app/task`)
      .then((response) => {
        setData(response.data); // Fixed: response.data should be the array, not spreading into prev
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      categories: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const payload = { categories: formData.categories };
      const response = await axios.patch(`https://micro-task-server-plum.vercel.app/users/${user.email}/categories`, payload);

      if (response.status === 200) {
        toast(`${formData.categories.join(', ')} added successfully!`);
      }
    } catch (error) {
      console.error('Failed to update categories:', error);
      alert('Failed to update categories.');
    }
  };

  // Get unique categories - add null check
  const uniqueCategories = data && data.length > 0 
    ? [...new Set(data.map((item) => item.taskCategory))] 
    : [];

  // Show loading state
  if (loading) {
    return <div className="text-center py-8">Loading user profile...</div>;
  }

  // Show error state
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }
  // console.log("userData.categories.length",userData)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Worker Account Settings</h2>
      
      {/* Display user data if available */}
      {userData && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Profile:</h3>
          <p>Email: {userData.email}</p>
          <p>Categories: {userData.categories?.join(', ') || 'None'}</p>
        </div>
      )}

      {/* Show Available Categories */}
      <h3 className="font-bold mb-2">Available Categories</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {uniqueCategories.map((category, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Multiple Select Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <div>
          {userData?.categories?.length > 0 ? "" : (
            <div className="mb-4 p-4 bg-red-100 rounded">
              <h3 className="font-bold mb-2">Please selete category to work</h3>
              {/* <p>{userData.categories.join(', ')}</p> */}
            </div>
          )}
          <label className="block font-medium text-gray-700 mb-2">
            Skills / Work Categories
          </label>
          <select
            name="categories"
            multiple
            value={formData.categories}
            onChange={handleCategoryChange}
            className="w-full border px-4 py-2 rounded-md h-40"
            required
          >
            {uniqueCategories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Hold <strong>Ctrl</strong> (Windows) or <strong>Cmd</strong> (Mac) to select multiple.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}