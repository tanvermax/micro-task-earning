import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaBitcoin, FaHome, FaTasks, FaUserShield,
} from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineMonetizationOn, MdTask, MdOutlineSecurity, MdOutlineSupportAgent, MdOutlineMedicalServices, MdManageAccounts, MdOutlineQueryStats, MdOutlineSettingsSuggest } from "react-icons/md";
import { PiHandWithdrawFill } from "react-icons/pi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GoFileSubmodule } from "react-icons/go";
import { GrGrow } from "react-icons/gr";
import { TbSettingsCheck } from "react-icons/tb";

import UserDetails from "./UserDetails";
import useAdmin from "../../Axios/Hook/useAdmin";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import useAuth from "../../Provider/useAuth";

const Dashbord = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/users?email=${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <aside className="col-span-2 bg-gray-100 border-r border-gray-300 p-5">
        <h2 className="text-xl font-bold mb-6 text-blue-600"><a href="/">Earnly Dashboard</a></h2>

        <ul className="space-y-3 text-gray-800 text-sm">
          {isAdmin && (
            <>
              <SidebarLink to="/dashbord/adminhome" icon={<MdAdminPanelSettings />} label="Admin Home" />
              <SidebarLink to="/dashbord/users" icon={<FaUserShield />} label="Manage Users" />
              <SidebarLink to="/dashbord/managetask" icon={<MdTask />} label="Manage Task" />
              <SidebarLink to="/dashbord/supportservice" icon={<MdOutlineMedicalServices />} label="Support Service" />
              <SidebarLink to="/dashbord/accountrequest" icon={<MdManageAccounts />} label="Account Request approval" />
              <SidebarLink to="/dashbord/salesandbussines" icon={<MdOutlineQueryStats />} label="Sales and Bussines" />
            </>
          )}

          {userData.role === "worker" && (
            <>
              <SidebarLink to="/dashbord/workerhome" icon={<FaHome />} label="Profile" />
              <SidebarLink to="/dashbord/tasklist" icon={<FaTasks />} label="Task List" />
              <SidebarLink to="/dashbord/maysubmissioin" icon={<GoFileSubmodule />} label="My Submissions" />
              <SidebarLink to="/dashbord/growth" icon={<GrGrow />} label="Growth" />
              <SidebarLink to="/dashbord/withdraw" icon={<PiHandWithdrawFill />} label="Withdrawals" />
              <SidebarLink to="/dashbord/monetization" icon={<MdOutlineMonetizationOn />} label="Monetization" />
              <SidebarLink to="/dashbord/workeraccountsetting" icon={<MdOutlineSettingsSuggest />} label="Account Setting" />
            </>
          )}

          {userData.role === "buyer" && (
            <>
              <SidebarLink to="/dashbord/buyerhome" icon={<FaHome />} label="Profile" />
              <SidebarLink to="/dashbord/addtask" icon={<FaHome />} label="Add New Tasks" />
              <SidebarLink to="/dashbord/mytask" icon={<FaHome />} label="My Tasks" />
              <SidebarLink to="/dashbord/purchase" icon={<FaBitcoin />} label="Purchase Coin" />
              <SidebarLink to="/dashbord/paymnethistory" icon={<RiSecurePaymentFill />} label="Payment History" />
              {/* <SidebarLink to="/dashbord/buyeraccountsetting" icon={<MdOutlineSettingsSuggest />} label="Account Setting" /> */}

            </>
          )}

          <hr className="border-gray-300 my-3" />

          <SidebarLink to="/dashbord/terms&condition" icon={<MdOutlineSecurity />} label="Terms & Conditions" />
          <SidebarLink to="/dashbord/support" icon={<MdOutlineSupportAgent />} label="Support" />
          <SidebarLink to="/dashbord/setting" icon={<TbSettingsCheck />} label="Settings" />
        </ul>
      </aside>

      {/* Main Content */}
      <main className="col-span-10 bg-white p-6">
        <UserDetails />
        <Outlet />
      </main>
    </div>
  );
};

// Reusable sidebar link
const SidebarLink = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-150 ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
            : "hover:bg-blue-100 text-gray-800"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  </li>
);


export default Dashbord;
