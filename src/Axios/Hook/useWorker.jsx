import React from 'react';
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Provider/useAuth';

const useWorker = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isWorker,isPending: isWorkerLoading } = useQuery({
      queryKey: [user?.email, "isWorker"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        // console.log(res.data);
        return res.data?.worker;
      },
    });
    return [isWorker,isWorkerLoading];
  };


export default useWorker;