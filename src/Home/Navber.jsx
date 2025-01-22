import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes, FaCoins } from "react-icons/fa";
import useAuth from "../Provider/useAuth";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { MdOutlineDeveloperMode, MdSpaceDashboard } from "react-icons/md";
// import userMange from "../Privet/Dashbord/userMange";////

const Navber = () => {
  const { user, handlelogout } = useAuth();
  const [userData, setUserData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem("access-token");
  const axiosSecure = useAxiosSecure();
  // const [userDa] = userMange();

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
       <li>
        <a href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tanvermax">
          Join as Developer<MdOutlineDeveloperMode />
        </a>
      </li>
     
      {user ? (
        <>
          {userData.role === "Worker" && (
            <li>
              <Link to={"/dashbord/workerhome"} className="flex items-center gap-2">
                <FaUserCircle />
                Worker Dashboard
              </Link>
            </li>
          )}
          {userData.role === "admin" && (
            <li>
              <Link to={"/dashbord/adminhome"} className="flex items-center gap-2">
                <FaUserCircle />
                Admin Dashboard
              </Link>
            </li>
          )}
           {userData.role === "Buyer" && (
            <li>
              <Link to={"/dashbord/buyerhome"}>Dashboard<MdSpaceDashboard /></Link>
            </li>
          )}
          <li>
            <span className="flex items-center gap-2 text-yellow-500">
              <FaCoins />
              Coins: {userData?.coins || 0}
            </span>
          </li>
        </>
      ) : null}
    </>
  );

  return (
    <div className="   bg-gradient-to-r from-blue-500 to-gray-500">
      <div className="navbar max-w-screen-2xl text-white mx-auto py-5">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              onClick={toggleDropdown}
              className="btn btn-ghost text-white lg:hidden"
            >
              {isDropdownOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
            {isDropdownOpen && (
              <ul className="menu menu-sm dropdown-content z-10  text-black rounded-box mt-3 w-52 p-2 shadow">
                {navoption}
              </ul>
            )}
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-bold">
            Earnly
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navoption}</ul>
        </div>
        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <>
              <div className="flex gap-4">
                {user.photoURL ? <img className="h-10 w-10 rounded-full" src={user.photoURL}></img> : <FaUserCircle className="h-6 w-6" />}
                <div>
                <p>{user.email}</p>
                <p>{user.displayName}</p>
                </div>

              </div>
              <button
                onClick={logout}
                className="btn bg-red-500 hover:bg-red-600 text-white"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn bg-green-500 hover:bg-green-600 text-white">
                Log In
              </Link>
              <Link to="/register" className="btn bg-blue-500 hover:bg-blue-600 text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
