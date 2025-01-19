import React, { useEffect, useState } from "react";
import { FaHome, FaUserShield } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../Home/Footer";
import UserDetails from "./UserDetails";
import useAdmin from "../../Axios/Hook/useAdmin";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import useAuth from "../../Provider/useAuth";
import { MdTask } from "react-icons/md";

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
    <div className="flex  ">
      <div className="w-64 min-h-screen bg-green-400 ">
        <ul className="menu p-5 gap-5">
          <li>
            <NavLink to={"/"}>
              Home <FaHome></FaHome>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashbord/profile"}>
              profile <FaHome></FaHome>
            </NavLink>
          </li>
          <div className="divider"></div>

          {isAdmin ? (
            <>
              <li>
                <NavLink to={"/dashbord/users"}>
                  Manage Users <FaUserShield />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashbord/users"}>
                  Manage Task <MdTask />
                </NavLink>
              </li>
            </>
          ) : null}
          {userData.role === "Worker" ? (
            <>
              <li>
                <NavLink to={"/dashbord/tasklist"}>
                  Task List <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashbord/submissions"}>
                  My Submissions <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashbord/withdrawals"}>
                  Withdrawals <FaHome />
                </NavLink>
              </li>
              {/* Add more specific links for workers */}
              <li>
                <NavLink to={"/dashbord/worker-guide"}>
                  Worker Guide <FaHome />
                </NavLink>
              </li>
            </>
          ) : null}
          {userData.role === "Buyer" ? (
            <>
              <li>
                <NavLink to={"/dashbord/addtask"}>
                  Add New Tasks <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashbord/my-tasks"}>
                  My Tasks <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashbord/withdrawals"}>
                  Withdrawals <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashbord/purchase-coin"}>
                  Purchase Coin <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashbord/payment-history"}>
                  Payment History <FaHome />
                </NavLink>
              </li>
              {/* Add more specific links for buyers */}
              <li>
                <NavLink to={"/dashbord/buyer-support"}>
                  Buyer Support <FaHome />
                </NavLink>
              </li>
            </>
          ) : null}

         
        </ul>
      </div>
      <div className="w-full p-20">
        <div className="min-h-screen">
          <div>
            <UserDetails></UserDetails>
          </div>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Dashbord;
