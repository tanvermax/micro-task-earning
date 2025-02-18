import React, { useEffect, useState } from "react";
import { FaBitcoin, FaHome, FaUserShield } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../../Home/Footer";
import UserDetails from "./UserDetails";
import useAdmin from "../../Axios/Hook/useAdmin";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import useAuth from "../../Provider/useAuth";
import { MdAdminPanelSettings, MdTask } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FcOnlineSupport } from "react-icons/fc";

const Dashbord = () => {
  const [isAdmin] = useAdmin();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/users?email=${user.email}`).then((res) => {
        // console.log(res.data);
        setUserData(res.data);
      });
    }
  }, [user?.email]);
  // console.log(userData.role);

  return (
    <div className="flex  p-1">
      <div className="lg:w-64 w-16 min-h-screen  bg-gray-200 rounded-2xl">
        <ul className="menu lg:p-1 lg:gap-16 gap-10 ">
        <li className="btn-xs text-[#b1804e]">
        <Link to="/" className="lg:btn lg:btn-ghost text-[8px] lg:text-2xl  font-bold    ">
            Earnly
          </Link>
          </li>
         
          <div className="divider w-10 lg:w-28"></div>

          {isAdmin ? (
            <>
             <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/adminhome"}>
                  Admin Home <MdAdminPanelSettings className="text-[#b1804e]" />
                </NavLink>
              </li>
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/users"}>
                  Manage Users <FaUserShield className="text-[#b1804e]" />
                </NavLink>
              </li>
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/managetask"}>
                  Manage Task <MdTask className="text-[#b1804e]" />
                </NavLink>
              </li>
            </>
          ) : null}
          {userData.role === "worker" ? (
            <>
             <li className="btn-xs ">
             <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/workerhome"}>
                  profile <FaHome className="text-[#b1804e]"/>
                </NavLink>
              </li>
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/tasklist"}>
                  Task List <FaHome className="text-[#b1804e]" />
                </NavLink>
              </li>
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/maysubmissioin"}>
                  My Submissions <FaHome className="text-[#b1804e]" />
                </NavLink>
              </li>
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/withdraw"}>
                  Withdrawals <FaHome className="text-[#b1804e]" />
                </NavLink>
              </li>
              {/* Add more specific links for workers */}
             
            </>
          ) : null}
          {userData.role === "buyer" ? (
            <>
            <li className="lg:btn-xs  ">
            <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[8px] lg:text-xl'} to={"/dashbord/buyerhome"}>
                  profile <FaHome className="text-[#b1804e]" />
                </NavLink>
              </li>
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/addtask"}>
                  Add New Tasks <FaHome className="text-[#b1804e]" />
                </NavLink>
              </li>
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'}to={"/dashbord/mytask"}>
                  My Task's <FaHome className="text-[#b1804e]" />
                </NavLink>
              </li>
             
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/purchase"}>
                  Purchase Coin <FaBitcoin className="text-[#b1804e]" />
                </NavLink>
              </li>
              <li className="btn-xs ">
                <NavLink className={'lg:p-5 w-8 lg:w-full p-1 text-[6px] lg:text-xl'} to={"/dashbord/paymnethistory"}>
                  Payment History <RiSecurePaymentFill className="text-[#b1804e]" />
                </NavLink>
              </li>
             
            </>
          ) : null}

         
        </ul>
      </div>
      <div className=" w-full lg:p-2 ">
        <div className="min-h-screen bg-gray-200 rounded-xl">
          <div>
            <UserDetails></UserDetails>
          </div>
          <Outlet></Outlet>
        </div>
       
      </div>
    </div>
  );
};

export default Dashbord;
