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
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">My Submissions</h1>
      {submissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Task Title</th>
                <th className="py-3 px-4 text-left">Payable Amount</th>
                <th className="py-3 px-4 text-left">Submission Details</th>
                <th className="py-3 px-4 text-left">Worker Name</th>
                <th className="py-3 px-4 text-left">Buyer Email</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{sub.task_title}</td>
                  <td className="py-3 px-4">${sub.payable_amount}</td>
                  <td className="py-3 px-4">{sub.submission_details}</td>
                  <td className="py-3 px-4">{sub.worker_name}</td>
                  <td className="py-3 px-4">{sub.Buyer_email}</td>
                  <td
                    className={`py-3 px-4 font-semibold text-white rounded-lg ${
                      sub.status.toLowerCase() === 'completed'
                        ? 'bg-green-500'
                        : sub.status.toLowerCase() === 'pending'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {sub.status}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(sub.current_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No submissions found.</p>
      )}
    </div>
  );
};

export default Maysubmission;
