import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Provider/useAuth";
import useaxiospublic from "../Axios/useaxiospublic";
import { useNavigate } from "react-router-dom";

const Socail = () => {
  const {handlegooglelogin}= useAuth();
  const axiospublic= useaxiospublic();
  const navigate=  useNavigate();

const googlelogin=()=>{
  handlegooglelogin()
  .then(result=>{
    const user = result.user;
    
    const userinfo={
      userName : user.displayName,
      email: user.email,
      role : "worker",
      coins : 10
    }
    axiospublic.post("/users",userinfo)
    .then(res=>{
      console.log(res.data);
      console.log("hi");
      navigate('/')
      
    })
    .catch((err) => {
      console.error("Error adding user to database:", err);
    });
  })
}

  return (
    <div>
      <div className="flex mt-4 justify-center space-x-4 ">
        <button onClick={googlelogin} className="p-2 bg-black rounded-full border hover:bg-gray-100">
        <FcGoogle />
        </button>
        
      </div>
    </div>
  );
};

export default Socail;
