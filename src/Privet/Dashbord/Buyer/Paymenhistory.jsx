import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";

const Paymenhistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: transittion = [], refetch } = useQuery({
    queryKey: ["transittion"], // Unique key for caching and identifying the query
    queryFn: async () => {
      const res = await axiosSecure.get("/transit");

      // Apply multiple filters
      return res.data.filter((item) => item.trasnsituseEmail === user.email); // Further filter by status
    },
  });
  console.log(transittion);
  console.log(user);
  
  

  return (
    <div>
      <div>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Payment History</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-300">#</th>
                  <th className="px-4 py-2 border border-gray-300">Date</th>
                  <th className="px-4 py-2 border border-gray-300">Amount</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Payment ID
                  </th>
                  <th className="px-4 py-2 border border-gray-300">email</th>
                </tr>
              </thead>
              <tbody>
                {transittion.map((payment, index) => (
                  <tr key={payment.id} className="text-center">
                    <td className="px-4 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {payment.trasitTIme}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {payment.coinbuyed}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {payment.transitsection_id}
                    </td>
                    <td className={`px-4 py-2 border border-gray-300 `}>
                      {payment.trasnsituseEmail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymenhistory;
