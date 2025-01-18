import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Provider/useAuth";

const Navber = () => {
  const { user } = useAuth();
  // console.log(user.email);
  
  const navoption = (
    <>
      <li>
        <a>Dashboard</a>
      </li>
      <li>
        <details>
          <summary>Available Coin</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        
        <a>User Profile</a>
      </li>
      <li>
        <a href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tanvermax">
          Join as Developer
        </a>
      </li>
    </>
  );
  return (
    <div className="lg:py-10 max-w-screen-2xl mx-auto">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navoption}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            Earnly
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navoption}</ul>
        </div>
        <div className="navbar-end gap-5">
          <Link to={"/login"} className="btn">
            Log In
          </Link>
          <Link to={"/register"} className="btn">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navber;
