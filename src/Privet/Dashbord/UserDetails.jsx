import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../Provider/useAuth";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import { FcBusinessman } from "react-icons/fc";
import userMange from "./userMange";
import Notification from "../Notification";

const UserDetails = () => {

  // }, [fetchUserData]);
  const [ userData] = userMange();

  // console.log(userData.email);
  return (
    <>
    <div className="flex justify-between px-10">
    <div className="w-3/4 flex items-center justify-between text-xl font-semibold py-5">
      <div  className="lg:flex gap-5 grid grid-cols-4" >
        <div>
          {userData.photo ? (
            <img className="lg:h-20 lg:w-20 rounded-full  border-blue-500 border-2 " src={userData.photo} alt="" />
          ) : (
            <>
              <div className="lg:text-5xl">
                <FcBusinessman />
              </div>
            </>
          )}
        </div>
        <div className="text-[8px] lg:text-[20px]">Hi, {userData.userName}</div>
      </div>
      <div className="text-[8px] lg:text-[20px]">COIN {userData.coins}</div>
      <div className="btn uppercase btn-xs lg:text-[20px]">
        Your role is :<span className="text-green-500">{userData.role}</span>
      </div>
    </div>
    <div className="">
    <Notification  ></Notification>
    </div>
    </div>
    </>
  );
};

export default UserDetails;
