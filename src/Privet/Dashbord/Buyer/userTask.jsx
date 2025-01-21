import useAxiosSecure from '../../../Axios/useAxiosSecure';
import useAuth from '../../../Provider/useAuth';
import { useQuery } from '@tanstack/react-query';

const userTask = () => {
    const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Assumes you have user email from auth context

  const { data: usertask = [], refetch } = useQuery({
    queryKey: ['usertask'],
    queryFn: async () => {
      const res = await axiosSecure.get('/task');
      return res.data.filter((t) => t.taskowner === user.email); // Filter tasks where emails match
    },
  });

  return [usertask, refetch];
};

export default userTask;





