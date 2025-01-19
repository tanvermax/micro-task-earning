import React from 'react';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { FaUser, FaUsersLine } from 'react-icons/fa6';
import {  NavLink, Outlet } from 'react-router-dom';
import Footer from '../../Home/Footer';
import UserDetails from './UserDetails';

const Dashbord = () => {
  const isAdmin = true;
    return (
        <div className="flex  ">
        <div className="w-64 min-h-screen bg-green-400 ">
          
          <ul className="menu p-5 gap-5">
           
               {
                isAdmin ? <>
                 <li>
                  <NavLink to={"/"}>
                  Home <FaHome></FaHome>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashbord/users"}>
                  Manage Users <FaHome></FaHome>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashbord/manageuser"}>
                  Manage Task<FaHome></FaHome>
                  </NavLink>
                </li></>: <>""</>
               }
               
                
                
            <div className="divider"></div>
          
          </ul>
        </div>
        <div className="w-full p-20">
          <div className='min-h-screen'>
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