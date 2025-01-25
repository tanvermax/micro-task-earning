import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../Provider/useAuth";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import { FcBusinessman } from "react-icons/fc";
import userMange from "./userMange";
import Notification from "../Notification";

const UserDetails = () => {
  // }, [fetchUserData]);
  const [userData] = userMange();
  // console.log(userData);

  // console.log(userData.email);
  return (
    <>
      {/* ????? */}
      <section class="">
        <div class="w-full  lg:max-w-7xl mx-auto">
          <div class="flex items-center  sm:justify-start relative z-10 lg:mb-5">
            <img
              src={userData.photo}
              alt="user-avatar-image"
              class="border-4 border-solid border-white h-7 w-7 lg:h-20 lg:w-20 rounded-full object-cover"
            />
          </div>
          <div class="grid grid-cols-2 px-1 lg:flex flex-col sm:flex-row max-sm:gap-5 items-center lg:justify-between mb-5">
            <div class="block">
              <h3 class="font-manrope font-bold lg:selection lg:text-4xl text-[8px] text-gray-900 mb-1">
                {userData.userName}, coin :{userData.coins}
              </h3>
              <p class="font-normal lg:text-base text-[8px] leading-7 text-gray-500">
                {userData.email}
              </p>
            </div>
            <button class=" rounded-full lg:py-3 px-5 bg-gray-100 flex items-center group transition-all duration-500 hover:bg-indigo-100 mr-10 md:w-[120px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  class="stroke-gray-700 transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                  stroke="#374151"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
              <span class="px-2 font-medium lg:text-base text-[8px] leading-7 text-gray-700 transition-all duration-500 group-hover:text-indigo-600">
                {userData.role}
              </span>
            <Notification></Notification>
            </button>
          </div>
        </div>
        <hr />
      </section>
    </>
  );
};

export default UserDetails;
