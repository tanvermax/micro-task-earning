import React from 'react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';

const UserProfile = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Profile</h2>

      {/* Profile Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">Musharof Chowdhury</h3>
              <p className="text-sm text-gray-500">Team Manager | Arizona, United States</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full border text-gray-600 hover:bg-gray-100">
              <FaFacebookF />
            </button>
            <button className="p-2 rounded-full border text-gray-600 hover:bg-gray-100">
              <FaXTwitter />
            </button>
            <button className="p-2 rounded-full border text-gray-600 hover:bg-gray-100">
              <FaLinkedinIn />
            </button>
            <button className="p-2 rounded-full border text-gray-600 hover:bg-gray-100">
              <FaInstagram />
            </button>
            <button className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-gray-100 text-sm">
              <FiEdit />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-lg">Personal Information</h4>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-gray-100 text-sm">
            <FiEdit />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-xs text-gray-400">First Name</p>
            <p>Musharof</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Last Name</p>
            <p>Chowdhury</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Email Address</p>
            <p>randomuser@pimjo.com</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p>+09 363 398 46</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-gray-400">Bio</p>
            <p>Team Manager</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-lg">Address</h4>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-full hover:bg-gray-100 text-sm">
            <FiEdit />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-xs text-gray-400">Country</p>
            <p>United States.</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">City/State</p>
            <p>Phoenix, Arizona, United States.</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Postal Code</p>
            <p>ERT 2489</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">TAX ID</p>
            <p>AS4568384</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
