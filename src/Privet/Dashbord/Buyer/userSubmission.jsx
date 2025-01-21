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

      // Apply multiple filters
      return res.data
        ; // Further filter by status
    },
  });

  return [submissions, refetch];
};

export default userSubmission;
