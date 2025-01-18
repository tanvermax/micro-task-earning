import React from 'react';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { FaUser, FaUsersLine } from 'react-icons/fa6';
import {  NavLink, Outlet } from 'react-router-dom';

const Dashbord = () => {
    return (
        <div className="flex  ">
        <div className="w-64 min-h-screen bg-orange-400 ">
          <ul className="menu p-5 gap-5">
           
                <li>
                  <NavLink to={"/dashbord/"}>
                    Available coin <FaHome></FaHome>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashbord/coin"}>
                    Available coin <FaHome></FaHome>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashbord/"}>
                    Available coin <FaHome></FaHome>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashbord/users"}>
                    Users<FaUsersLine></FaUsersLine>
                  </NavLink>
                </li>
                
            <div className="divider"></div>
          
          </ul>
        </div>
        <div className="w-full p-20">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashbord;