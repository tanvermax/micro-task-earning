import React, { useEffect, useState } from 'react';
import useAuth from '../../Provider/useAuth';
import useAxiosSecure from '../../Axios/useAxiosSecure';

const UserDetails = () => {

  const axiosSecure = useAxiosSecure();


    const {user}= useAuth()
     const [userData, setUserData] = useState({});
      useEffect(() => {
        if (user?.email) {
          // fetch(`http://localhost:5000/users?email=${user.email}`)
          //   .then((res) => res.json())
          //   .then((data) => {
          //     console.log("feting data", data);
          //     setUserData(data);
          //   })
        
          //   .catch((err) => console.error("Error fetching user data:", err));
          axiosSecure(`/users?email=${user.email}`)
          .then(res=>{
            console.log(res.data);
            setUserData(res.data);
          })

          
        }

      }, [user?.email]);
    
      console.log(userData.email);
    return (
        <div className='flex items-center justify-between text-xl font-semibold'>
            <div>
            Hi, {userData.userName}
            </div>
            <div className='btn uppercase'>
                {userData.role}
            </div>
        </div>
    );
};

export default UserDetails;