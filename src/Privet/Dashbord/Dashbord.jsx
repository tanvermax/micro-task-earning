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
    <div className="grid grid-cols-12 gap-1">
      <div className=" col-span-2 min-h-screen    lg:p-2">
        <ul className="menu lg:p-1 lg:gap-10 gap-5  rounded-2xl min-h-screen " style={{ backgroundColor: "var(--sidebar-bg)" }}>
          <Link to="/" className=" text-[#b1804e] lg:p-5">
            <span className="text-[8px] lg:text-2xl  font-bold ">Earnly</span>
          </Link>
          {isAdmin ? (
            <>
              <Link to={"/dashbord/adminhome"} className=" hover:bg-[#ca8541] rounded-md  lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                  Admin Home{" "}
                  <MdAdminPanelSettings className="text-[#b1804e] " />
                </span>
              </Link>
              <Link to={"/dashbord/users"} className=" hover:bg-[#ca8541] rounded-md lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                Manage Users <FaUserShield className="text-[#b1804e]" />
                </span>
              </Link>
              <Link to={"/dashbord/managetask"} className=" hover:bg-[#ca8541] rounded-md lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                Manage Task <MdTask className="text-[#b1804e]" />
                </span>
              </Link>
            </>
          ) : null}
          {userData.role === "worker" ? (
            <>
            <Link to={"/dashbord/workerhome"} className=" hover:bg-[#ca8541] rounded-md  py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                profile <FaHome className="text-[#b1804e]" />
                </span>
              </Link>

              <Link to={"/dashbord/tasklist"} className=" hover:bg-[#ca8541] rounded-md py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                Task List <FaHome className="text-[#b1804e]" />
                </span>
              </Link>

              <Link to={"/dashbord/maysubmissioin"} className=" hover:bg-[#ca8541] rounded-md py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                My Submissions <FaHome className="text-[#b1804e]" />
                </span>
              </Link>

              <Link to={"/dashbord/withdraw"} className=" hover:bg-[#ca8541] rounded-md py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                Withdrawals <FaHome className="text-[#b1804e]" />
                </span>
              </Link>

             
              
              {/* Add more specific links for workers */}
            </>
          ) : null}
          {userData.role === "buyer" ? (
            <>
            <Link to={"/dashbord/buyerhome"} className=" hover:bg-[#ca8541] rounded-md py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                profile <FaHome className="text-[#b1804e]" />
                </span>
              </Link>

              <Link to={"/dashbord/addtask"} className=" hover:bg-[#ca8541] rounded-md py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                Add New Tasks <FaHome className="text-[#b1804e]" />
                </span>
              </Link>

              <Link to={"/dashbord/mytask"} className=" hover:bg-[#ca8541] rounded-md py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                My Task's <FaHome className="text-[#b1804e]" />
                </span>
              </Link>

              <Link to={"/dashbord/purchase"} className=" hover:bg-[#ca8541] rounded-md py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                Purchase Coin <FaBitcoin className="text-[#b1804e]" />
                </span>
              </Link>
              <Link to={"/dashbord/paymnethistory"} className=" hover:bg-[#ca8541] rounded-md py-2 lg:p-5">
                <span className="text-[6px] leading-3 lg:text-2xl flex items-center justify-center lg:gap-2  font-bold ">
                Payment History{" "}
                  <RiSecurePaymentFill className="text-[#b1804e]" />
                </span>
              </Link>

             
            </>
          ) : null}
        </ul>
      </div>
      <div className=" col-span-10 w-full lg:p-2 ">
        <div className="min-h-screen  rounded-xl" style={{ backgroundColor: "var(--sidebar-bg)" }}>
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

