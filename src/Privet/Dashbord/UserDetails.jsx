import React from "react";
import { FaCog } from "react-icons/fa";
import Notification from "../Notification";
import userMange from "./userMange";

const UserDetails = () => {
  const [userData] = userMange();

  return (
    <div className="w-full border-b border-gray-200 px-4 py-4 lg:px-10 lg:py-6 bg-white shadow-sm rounded-md">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* Left: Profile Info */}
        <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-1/2">
          <img
            src={userData?.photo || "https://via.placeholder.com/80"}
            alt="User Avatar"
            className="h-10 w-10 lg:h-20 lg:w-20 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="text-left">
            <h3 className="text-sm lg:text-2xl font-semibold text-gray-800">
              {userData?.userName || "Guest User"}
            </h3>
            <p className="text-[10px] lg:text-base font-medium text-gray-500">
              {userData?.email || "Not Provided"}
            </p>
            <p className="text-[10px] lg:text-sm font-semibold text-amber-600 mt-1">
              💰 Coins: {userData?.coins ?? 0}
            </p>
          </div>
        </div>

        {/* Right: Role + Notifications */}
        <div className="flex items-center gap-3 lg:gap-5 w-full lg:w-auto justify-end">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-indigo-50 transition">
            <span className="text-[10px] lg:text-sm font-medium text-gray-700 capitalize">
              {userData?.role || "User"}
            </span>
            <FaCog className="text-indigo-600 text-xs lg:text-base" />
          </div>
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
