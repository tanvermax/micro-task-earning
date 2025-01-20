import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../Provider/useAuth";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import { FcBusinessman } from "react-icons/fc";
import userMange from "./userMange";

const UserDetails = () => {
  // const axiosSecure = useAxiosSecure();

  // const { user } = useAuth();
  // const [userData, setUserData] = useState({});
  // const fetchUserData = useCallback(() => {
  //   if (user?.email) {
  //     axiosSecure(`/users?email=${user.email}`).then((res) => {
  //       setUserData(res.data);
  //     });
  //   }
  // }, [user?.email, axiosSecure]);

  // // Fetch user data when the component mounts or the email changes
  // useEffect(() => {
  //   fetchUserData();
  // }, [fetchUserData]);
  const [ userData] = userMange();

  // console.log(userData.email);
  return (
    <div className="flex items-center justify-between text-xl font-semibold py-5">
      <div>
        <div>
          {userData.photoURL ? (
            <img src={userData.photoURL} alt="" />
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
  );
};

export default UserDetails;
