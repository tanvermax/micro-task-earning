import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import useAuth from "../../Provider/useAuth";
import Swal from "sweetalert2";

const WorkerPaymnet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: withdaw = [], refetch } = useQuery({
    queryKey: ["workerSubmissions", user.email], // Unique key for caching
    queryFn: async () => {
      const response = await axiosSecure.get("/withdrawals");
      // console.log("API Response Data:", response.data); // Logs the raw API response
      return response.data.filter((item) => item.status === "pending");
    },
  });
// console.log(withdaw);


  const handleApprove = (request) => {
    // console.log(request._id);
    axiosSecure.patch(`/withdrawals/${request._id}`)
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        axiosSecure
          .post("/newnotificatio", {
            workermessage: `GOOD NEWS,You have earned ${
              request.withdrawal_amount
            } doller  in ${
              request.payment_system
            }`,
            woekermail: request.worker_email,
            data: new Date(),
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.acknowledged) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }

      refetch();
    });
  };

  return (
    <div className="container mx-auto lg:p-4 overflow-scroll">
      <h1 className="lg:text-2xl font-bold mb-4">
        Withdrawal Requests {withdaw.length}
      </h1>
      <table className="lg:min-w-full table-auto " >
        <thead>
          <tr>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">User</th>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">Amount</th>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">Method</th>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">Status</th>
            <th className="lg:px-4 text-[10px] lg:text-xl lg:py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {withdaw.map((request) => (
            <tr key={request._id}>
              <td className="border text-[10px] lg:text-xl  px-4 py-2">
                {request.worker_email}
              </td>
              <td className="border text-[10px] lg:text-xl px-4 py-2">
                {request.withdrawal_coin}
              </td>
              <td className="border text-[10px] lg:text-xl px-4 py-2">
                {request.payment_system}
              </td>
              <td className="border text-[10px] lg:text-xl px-4 py-2">
                {request.status}
              </td>
              <td className="border text-[10px] lg:text-xl px-4 py-2">
                {request.status === "pending" && (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleApprove(request)}
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
