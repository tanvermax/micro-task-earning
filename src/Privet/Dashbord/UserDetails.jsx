import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../Provider/useAuth";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import { FcBusinessman } from "react-icons/fc";
import userMange from "./userMange";
import Notification from "../Notification";

const UserDetails = () => {
  // }, [fetchUserData]);
  const [userData, refetch] = userMange();
  // console.log(userData);

  // console.log(userData.email);
  return (
    <div className="navbar w-11/12 mx-auto py-5 px-0">
      <div className="flex-1">
      <div className="flex lg:gap-5 gap-1 ">
            <img
              src={userData.photo}
              alt="user-avatar-image"
              className="border-4 border-solid border-white h-7 w-7 lg:h-20 lg:w-20 rounded-full object-cover"
            />
             <div className=" ">
              <h3 className="text-left text-[#b1804e] font-bold lg:selection lg:text-4xl text-[8px] text-gray-90 mb-1">
                {userData.userName}
              </h3>
              <p className="text-left lg:text-3xl text-[8px] font-semibold" > coin :{userData.coins}</p>
              <p className="font-normal text-[#b1804e] text-left lg:text-base text-[8px] lg:leading-7 ">
                {userData.email}
              </p>
            </div>

          </div>
      </div>
      <div className="flex-none">
      <button className=" rounded-full lg:py-3 lg:px-5 flex items-center group transition-all duration-500 hover:bg-indigo-100  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  className="stroke-gray-700  transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                  stroke="#374151"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
              <span className="px-2 font-medium lg:text-base text-[8px] leading-7  transition-all duration-500 group-hover:text-indigo-600">
                {userData.role}
              </span>
            <Notification className="text-[#b1804e] " />
            </button>
      </div>
    </div>
  );
};

export default UserDetails;
{
  /* <section >
        <div className="lg:grid grid-cols-2 navbar  mx-auto">

          <div className=" gap-5 flex-1">
            <img
              src={userData.photo}
              alt="user-avatar-image"
              className="border-4 border-solid border-white h-7 w-7 lg:h-20 lg:w-20 rounded-full object-cover"
            />
             <div className="">
              <h3 className="font-manrope font-bold lg:selection lg:text-4xl text-[8px] text-gray-900 mb-1">
                {userData.userName}, coin :{userData.coins}
              </h3>
              <p className="font-normal lg:text-base text-[8px] leading-7 text-gray-500">
                {userData.email}
              </p>
            </div>

          </div>

          <div className=" flex-none  items-end">

           
            
            <button className=" rounded-full lg:py-3 px-5 bg-gray-100 flex items-center group transition-all duration-500 hover:bg-indigo-100  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  className="stroke-gray-700 transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                  stroke="#374151"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
              <span className="px-2 font-medium lg:text-base text-[8px] leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
                {userData.role}
              </span>
            <Notification></Notification>
            </button>
          </div>
        </div>
        <hr />
      </section> */
}
