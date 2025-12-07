import React, { useState } from "react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
import { toast } from "react-toastify";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [editData, setEditData] = useState(null);

  // Fetch user data
  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  console.log(editData)
  // Save updates
  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.patch(`/user/${user.email}`, editData);
      toast.success("Profile Updated Successfully!");
      console.log(res.data)
      setEditData(null);
      refetch();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Profile</h2>

      {/* Profile Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={userData.photoURL || "https://i.ibb.co/8zP9dV3/default.jpg"}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{userData.userName}</h3>
              <p className="text-sm text-gray-500">{userData.role || "User"}</p>
            </div>
          </div>

          <button
            onClick={() => setEditData(userData)}
            className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-gray-100 text-sm"
          >
            <FiEdit />
            Edit
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-lg">Personal Information</h4>

          <button
            onClick={() => setEditData(userData)}
            className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-gray-100 text-sm"
          >
            <FiEdit />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-xs text-gray-400">Name</p>
            <p>{userData.userName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Email Address</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p>{userData.phone || "Not added"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-gray-400">Bio</p>
            <p>{userData.bio || "No bio added"}</p>
          </div>
        </div>
      </div>

      {/* Address
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-lg">Address</h4>
          <button
            onClick={() => setEditData(userData)}
            className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-gray-100 text-sm"
          >
            <FiEdit />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-xs text-gray-400">Country</p>
            <p>{userData.country || "Not added"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">City/State</p>
            <p>{userData.city || "Not added"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Postal Code</p>
            <p>{userData.postalCode || "Not added"}</p>
          </div>
        </div>
      </div> */}

      {/* Update Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">Edit Profile</h2>

            <input
              className="border p-2 w-full"
              placeholder="Name"
              value={editData?.userName || ""}
              onChange={(e) =>
                setEditData({ ...editData, userName: e.target.value })
              }
            />

            {/* Phone */}
            <input
              className="border p-2 w-full"
              placeholder="Phone"
              value={editData?.phone || ""}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
            />

            {/* Bio */}
            <textarea
              className="border p-2 w-full"
              placeholder="Bio"
              value={editData?.bio || ""}
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
              }
            />

            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white py-2 px-4 rounded w-full"
            >
              Save
            </button>
            <button
              onClick={() => setEditData(null)}
              className="bg-gray-300 py-2 px-4 rounded w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
