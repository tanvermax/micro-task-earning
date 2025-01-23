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
      <div  className="flex gap-5" >
        <div>
          {userData.photo ? (
            <img className="h-20 w-20 rounded-full  border-blue-500 border-2 " src={userData.photo} alt="" />
          ) : (
            <>
              <div className="text-5xl">
                <FcBusinessman />
              </div>
            </>
          )}
        </div>
        <div>Hi, {userData.userName}</div>
      </div>
      <div>COIN {userData.coins}</div>
      <div className="btn uppercase">
        Your role is :<span className="text-green-500">{userData.role}</span>
      </div>
    </div>
    <Notification></Notification>
    </div>
    </>
  );
};

export default UserDetails;
