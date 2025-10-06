import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../Provider/useAuth';
import { toast } from 'react-toastify';

export default function WokerAccountSetting() {

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    categories: [],
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://micro-task-server-plum.vercel.app/task`)
      .then((response) => {
          setData(prev=>[...prev,response.data])
        // setData(response.data);
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
  // console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
       // or however you identify the user
      //  console.log("user.email",user.email);
      const payload = { categories: formData.categories };

      const response = await axios.patch(`https://micro-task-server-plum.vercel.app/users/${user.email}/categories`, payload);

      if (response.status === 200) {
        // alert('Categories updated successfully!');
        toast(`${formData.categories} added successfully!`)
        // Optionally refetch user data or update local state here
      }
    } catch (error) {
      console.error('Failed to update categories:', error);
      alert('Failed to update categories.');
    }
  };

  // Get unique categories
  const uniqueCategories = [...new Set(data.map((category) => category.taskCategory))];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Worker Account Settings</h2>

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
