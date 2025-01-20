import  { useCallback, useEffect, useState } from 'react';
import useAxiosSecure from '../../Axios/useAxiosSecure';
import useAuth from '../../Provider/useAuth';

const userMange = () => {
    const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const fetchUserData = useCallback(() => {
    if (user?.email) {
        axiosSecure(`/users?email=${user.email}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
      
    }
  }, [user?.email, axiosSecure]);

  // Fetch user data when the component mounts or the email changes
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return [userData]
};

export default userMange;