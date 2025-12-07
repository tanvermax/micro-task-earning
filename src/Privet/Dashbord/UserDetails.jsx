import { useState, useRef, useEffect } from "react";
import { FaCog, FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import Notification from "../Notification";
import useAuth from "../../Provider/useAuth";
import useProfile from "../../Provider/userProfile";

const UserDetails = () => {
  const { user, handlelogout } = useAuth();
  const {userData} = useProfile()
  // const { handlelogout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    handlelogout()
      .then(() => window.location.reload())
      .catch(() => {});
  };

  // console.log("userData",userData)
  return (
    <div className="w-full border-b border-gray-200 px-4 py-6 lg:px-10 bg-gradient-to-r from-indigo-50 to-white shadow-lg rounded-xl transition-all duration-500 hover:shadow-2xl">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        
        {/* Left: Profile Info */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 w-full lg:w-1/2">
          <div className="relative group">
            <img
              src={userData?.photo || "https://via.placeholder.com/80"}
              alt="User Avatar"
              className="h-12 w-12 lg:h-20 lg:w-20 rounded-full object-cover border-4 border-indigo-300 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white px-2 py-0.5 text-xs rounded-full shadow-md animate-pulse">
              💰 <span className="font-bold">{userData?.coins ?? 0}</span>
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-lg lg:text-2xl font-bold text-gray-800">
              {userData?.userName || "Guest User"}
            </h3>
            <p className="text-[10px] lg:text-sm text-gray-500">{userData?.email || "Not Provided"}</p>

            {/* Categories */}
            {userData?.categories?.length > 0 && (
              <div className="mt-3">
                <h4 className="text-xs lg:text-sm font-semibold text-gray-600 mb-1">
                  Work Categories:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userData.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs lg:text-sm font-medium shadow-sm hover:scale-105 transition-transform duration-300"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Role Dropdown + Notifications */}
        <div className="flex items-center gap-3 lg:gap-5 w-full lg:w-auto justify-end">
          
          {/* Role Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full hover:bg-indigo-50 hover:shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-[10px] lg:text-sm font-medium text-gray-700 capitalize">
                {userData?.role || "User"}
              </span>
              <FaCog className="text-indigo-600 text-xs lg:text-base" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 animate-fadeIn">
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
                >
                  <FaUserCircle /> My Profile
                </button>
                {/* <button
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200"
                >
                  <FaUser /> Account Settings
                </button> */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm hover:bg-red-100 hover:text-red-600 text-red-600 transition-all duration-200"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
