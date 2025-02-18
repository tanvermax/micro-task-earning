import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaCoins,
} from "react-icons/fa";
import useAuth from "../Provider/useAuth";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { MdOutlineDeveloperMode, MdOutlineNightlightRound, MdSpaceDashboard } from "react-icons/md";
import { useTheme } from "../Mainlayout/ThemeProvider";
import { WiDaySunny } from "react-icons/wi";
// import userMange from "../Privet/Dashbord/userMange";////

const Navber = () => {
  const { user, handlelogout } = useAuth();
  const [userData, setUserData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem("access-token");
  const axiosSecure = useAxiosSecure();
  // const [userDa] = userMange();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    if (user?.email && token) {
      axiosSecure(`/users?email=${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user?.email, token]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const logout = () => {
    handlelogout()
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navoption = (
    <>
      <Link to={"/"} className="btn ml-2 bg-[#b1804e] border-none text-white">
        Home
      </Link>
      <li className="btn ml-2 bg-[#b1804e] border-none text-white">
        <a href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tanvermax">
          Join as Developer
          <MdOutlineDeveloperMode />
        </a>
      </li>

      {user ? (
        <>
          {userData.role === "worker" && (
            <>
              <li className="btn ml-2 bg-[#b1804e]  border-none text-white">
                <Link
                  to={"/dashbord/workerhome"}
                  className="flex  items-center gap-2"
                >
                  <FaUserCircle />
                  Worker Dashboard
                </Link>
              </li>
              <li className="btn ml-2 bg-[#b1804e] border-none text-white">
                <span className="flex items-center gap-2 ">
                  <FaCoins />
                  Coins: {userData?.coins || 0}
                </span>
              </li>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <li className="btn ml-2 bg-[#b1804e] border-none text-white">
                <Link
                  to={"/dashbord/adminhome"}
                  className="flex items-center gap-2"
                >
                  <FaUserCircle />
                  Admin Dashboard
                </Link>
              </li>
              <li className="btn ml-2 bg-[#b1804e] border-none text-white">
                <span className="flex items-center gap-2 ">
                  <FaCoins />
                  Coins: {userData?.coins || 0}
                </span>
              </li>
            </>
          )}
          {userData.role === "buyer" && (
            <>
              <li className="btn ml-2 bg-[#b1804e] border-none text-white">
                <Link to={"/dashbord/buyerhome"}>
                  Dashboard
                  <MdSpaceDashboard />
                </Link>
              </li>

              <li className="btn ml-2 bg-[#b1804e] border-none text-white">
                <span className="flex items-center gap-2 ">
                  <FaCoins />
                  Coins: {userData?.coins || 0}
                </span>
              </li>
            </>
          )}
        </>
      ) : null}
      <Link
        to={"/aboutus"}
        className="btn ml-2 bg-[#b1804e] border-none text-white"
      >
        <span className="flex items-center gap-2 ">About us</span>
      </Link>
    </>
  );

  return (
    <div className=" backdrop-blur-xl sticky top-0 z-10">
      <div className="navbar max-w-screen-2xl text-[#b1804e] mx-auto lg:py-5">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              onClick={toggleDropdown}
              className="btn btn-ghost text-white lg:hidden"
            >
              {isDropdownOpen ? (
                <FaTimes className="h-6 w-6 text-[#b1804e]" />
              ) : (
                <FaBars className="h-6 w-6 text-[#b1804e]" />
              )}
            </button>
            {isDropdownOpen && (
              <ul className="menu menu-sm dropdown-content z-10  text-black rounded-box mt-3 w-52 p-2 shadow">
                {navoption}
              </ul>
            )}
          </div>
          <Link
            data-aos="zoom-in"
            to="/"
            className="lg:btn lg:btn-ghost lg:text-2xl font-bold text-[#b1804e]"
          >
            Earnly
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navoption}</ul>
        </div>
        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <>
              <div className="lg:flex gap-4 ">
                {user.photoURL ? (
                  <img
                    className="lg:h-10 h-6 w-6 lg:w-10 rounded-full"
                    src={user.photoURL}
                  ></img>
                ) : (
                  <FaUserCircle className="h-6 w-6" />
                )}
                <div>
                  <p className="lg:text-base text-[6px]">{user.email}</p>
                  <p className="lg:text-base text-[6px]">{user.displayName}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="btn btn-xs lg:btn-md bg-[#b1804e] border-none hover:bg-red-600 text-black"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm lg:btn-md text-black">
                Log In
              </Link>
              <Link to="/register" className="btn btn-sm lg:btn-md text-black">
                Register
              </Link>
            </>
          )}
        </div>
        <button onClick={toggleTheme} style={{ padding: "8px 16px" }}>
          {theme === "light" ? <MdOutlineNightlightRound /> : <WiDaySunny />}
        </button>
      </div>
    </div>
  );
};

export default Navber;
