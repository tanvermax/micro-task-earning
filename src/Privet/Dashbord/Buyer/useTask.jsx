import React from 'react';
import useAxiosSecure from '../../../Axios/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTask = () => {
    const axiosSecure = useAxiosSecure();

    const { data: task = [], refetch } = useQuery({
      queryKey: ["task"],
      queryFn: async () => {
        const res = await axiosSecure.get("/task");
        return res.data;
      },
    });
    return [task,refetch];
};

export default useTask;