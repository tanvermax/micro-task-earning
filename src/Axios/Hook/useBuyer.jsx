import React from 'react';
import useAuth from '../../Provider/useAuth';
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useBuyer = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isBuyer,isPending: isBuyerLoading } = useQuery({
      queryKey: [user?.email, "isBuyer"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        console.log(res.data);
        return res.data?.buyer;
      },
    });
    return [isBuyer,isBuyerLoading];
  };

export default useBuyer;