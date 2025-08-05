import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import useAuth from "../../Provider/useAuth";
import Swal from "sweetalert2";

const WorkerPaymnet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: withdaw = [], refetch } = useQuery({
    queryKey: ["workerSubmissions", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get("/withdrawals");
      return response.data.filter((item) => item.status === "pending");
    },
  });

  const handleApprove = (request) => {
    axiosSecure.patch(`/withdrawals/${request._id}`).then((res) => {
      if (res.data) {
        axiosSecure
          .post("/newnotificatio", {
            workermessage: `GOOD NEWS, You have earned ${request.withdrawal_amount} dollar via ${request.payment_system}`,
            woekermail: request.worker_email,
            data: new Date(),
          })
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment Approved",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Withdrawal Requests ({withdaw.length})
      </h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="min-w-full table-auto bg-white dark:bg-gray-900">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Method</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-800 dark:text-gray-200 divide-y divide-gray-200 dark:divide-gray-700">
            {withdaw.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="px-4 py-3">{request.worker_email}</td>
                <td className="px-4 py-3 font-semibold">{request.withdrawal_coin}</td>
                <td className="px-4 py-3 capitalize">{request.payment_system}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {request.status === "pending" && (
                    <button
                      onClick={() => handleApprove(request)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-md transition"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerPaymnet;
