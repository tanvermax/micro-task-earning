import React from 'react';
import useAxiosSecure from '../../../Axios/useAxiosSecure';
import userMange from '../userMange';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Provider/useAuth';

const Maysubmission = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [userData] = userMange();

  // Fetch worker submissions
  const { data: submissions = [] } = useQuery({
    queryKey: ["workerSubmissions", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get("/submitted");
      return response.data.filter((sub) => sub.worker_email === user.email);
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl text-center text-gray-800 mb-6">My Submissions</h1>
      {submissions.length > 0 ? (
        <table className="w-full table-auto shadow-md bg-white rounded-lg">
          <thead className="bg-blue-600 text-white text-lg">
            <tr>
              <th className="px-4 py-2">Task Title</th>
              <th className="px-4 py-2">Payable Amount</th>
              <th className="px-4 py-2">Submission Details</th>
              <th className="px-4 py-2">Worker Name</th>
              <th className="px-4 py-2">Buyer Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id} className="text-gray-700">
                <td className="px-4 py-2">{sub.task_title}</td>
                <td className="px-4 py-2">${sub.payable_amount}</td>
                <td className="px-4 py-2">{sub.submission_details}</td>
                <td className="px-4 py-2">{sub.worker_name}</td>
                <td className="px-4 py-2">{sub.Buyer_email}</td>
                <td
                  className={`px-4 py-2 font-bold text-white rounded-lg ${
                    sub.status.toLowerCase() === 'completed'
                      ? 'bg-green-500'
                      : sub.status.toLowerCase() === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                >
                  {sub.status}
                </td>
                <td className="px-4 py-2">
                  {new Date(sub.current_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No submissions found.</p>
      )}
    </div>
  );
};

export default Maysubmission;
