import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";

const userSubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["submissions"], // Unique key for caching and identifying the query
    queryFn: async () => {
      const res = await axiosSecure.get("/submitted");

      // Filter submissions to include only "pending" status
      return res.data
        .filter((sub) => sub.taskowner === user.email) // Filter by taskowner
        .filter((sub) => sub.status === "pending"); 
    },
  });
  return [submissions];
}


export default userSubmission;
