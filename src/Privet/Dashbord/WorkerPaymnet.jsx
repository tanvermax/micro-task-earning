import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import useAuth from "../../Provider/useAuth";
import Swal from "sweetalert2";

const WorkerPaymnet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["workerSubmissions", user.email], // Unique key for caching
    queryFn: async () => {
      const response = await axiosSecure.get("/withdrawals");
      return response.data.filter((item) => item.status === "pending"); // Filter submissions by worker email
    },
  });
  const handleApprove = (id) => {
    console.log(id);
    axiosSecure
      .patch(`/withdrawals/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire({
            title: "updated!",
            text: "worker status has been updated.",
            icon: "success",
          });
        }

        refetch();
      });
  };

  return (
    <div className="container mx-auto lg:p-4">
      <h1 className="text-2xl font-bold mb-4">
        Withdrawal Requests{submissions.length}
      </h1>
      <table className="lg:min-w-full table-auto">
        <thead>
          <tr>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">User</th>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">Amount</th>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">Method</th>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">Status</th>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((request) => (
            <tr key={request._id}>
              <td className="border text-[10px] lg:text-xl  px-4 py-2">{request.worker_email}</td>
              <td className="border text-[10px] lg:text-xl px-4 py-2">{request.withdrawal_coin}</td>
              <td className="border text-[10px] lg:text-xl px-4 py-2">{request.payment_system}</td>
              <td className="border text-[10px] lg:text-xl px-4 py-2">{request.status}</td>
              <td className="border text-[10px] lg:text-xl px-4 py-2">
                {request.status === "pending" && (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleApprove(request._id)}
                  >
                    payment success
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerPaymnet;
