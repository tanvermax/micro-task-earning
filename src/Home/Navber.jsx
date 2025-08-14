import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaCoins,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  MdOutlineDeveloperMode,
  MdOutlineNightlightRound,
  MdSpaceDashboard,
} from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
import { RiHome9Line } from "react-icons/ri";

import useAuth from "../Provider/useAuth";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useTheme } from "../Mainlayout/ThemeProvider";
import UserDropDown from "./UserDropDown/UserDropDown";

const Navbar = () => {
  const { user, handlelogout } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { theme, toggleTheme } = useTheme();

  const [userData, setUserData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem("access-token");

  useEffect(() => {
    if (user?.email && token) {
      axiosSecure(`/users?email=${user.email}`).then((res) =>
        setUserData(res.data)
      );
    }
  }, [user?.email, token]);

  const logout = () => {
    handlelogout().then(() => window.location.reload()).catch();
  };

  const renderRoleMenu = () => {
    if (!userData.role) return null;

    const roleRoutes = {
      worker: "/dashbord/workerhome",
      admin: "/dashbord/adminhome",
      buyer: "/dashbord/buyerhome",
    };

    return (
      <>
        <li className="btn   border-none ml-2">
          <Link to={roleRoutes[userData.role]} className="flex items-center gap-2">
            <FaUserCircle />
            {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} Dashboard
          </Link>
        </li>
        <li className="btn   border-none ml-2">
          <span className="flex items-center gap-2">
            <FaCoins />
            Coins: {userData.coins || 0}
          </span>
        </li>
      </>
    );
  };

  const navItems = (
    <>
      <Link to="/" className="btn   border-none ml-2">
        Home <RiHome9Line />
      </Link>
      <a
        href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tanvermax"
        className="btn   border-none ml-2"
      >
        Join as Developer <MdOutlineDeveloperMode />
      </a>
      {user && renderRoleMenu()}
      <Link to="/aboutus" className="btn   border-none ml-2">
        About Us
      </Link>
    </>
  );

  return (
    <div className="sticky top-0 z-10 backdrop-blur-[2px] bg-white/1">
      <div className="navbar max-w-screen-2xl mx-auto text-slate-800 lg:py-5">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn btn-ghost text-slate-800"
            >
              {isDropdownOpen ? <FaTimes /> : <FaBars />}
            </button>
            {isDropdownOpen && (
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 z-10 text-slate-800">
                {navItems}
              </ul>
            )}
          </div>
          <Link to="/" className="lg:text-2xl font-bold text-white">
            Earnly
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <>
          
            <UserDropDown user={user} logout={logout}/>
              
            </>
          ) : (
            <>
              <Link to="/login" className="btn bg-blue-500 border-0 rounded-md text-white btn-xs lg:btn-md">
                Log In
              </Link>
              <Link to="/register" className="btn bg-blue-500 border-0 rounded-md text-white btn-xs lg:btn-md">
                Register
              </Link>
            </>
          )}
          <button onClick={toggleTheme} className=" text-white rotate-6 ">
            {theme === "light" ? <MdOutlineNightlightRound className="-rotate-45 text-2xl" /> : <WiDaySunny className="-rotate-45 text-2xl" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
