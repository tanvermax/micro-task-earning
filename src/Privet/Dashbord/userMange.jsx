import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import useAuth from "../../Provider/useAuth";
import { useQuery } from "@tanstack/react-query";

const userMange = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  // const [userData, setUserData] = useState({});

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["user", user?.email], // Unique key for caching
    queryFn: async () => {
      const response = await axiosSecure.get(`/users?email=${user.email}`);
      return response.data; // Filter submissions by worker email
    },
    refetchInterval: 1000, // Optional: Poll for new data every 5 seconds
    refetchOnWindowFocus: true,
  });


  return [userData,refetch];
};

export default userMange;
