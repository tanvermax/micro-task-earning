import React, { useState } from "react";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import userTask from "./userTask";
import BuyerStatsPage from "./BuyerStatsPage";

const BuyerHome = () => {
  const { user } = useAuth();
  const [tasks] = userTask();
  const axiosSecure = useAxiosSecure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const { data: totalsubmissions = [], refetch } = useQuery({
    queryKey: ["totalsubmissions"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/subar`);
      return response.data.filter(
        (submission) => submission.status === "pending"
      );
    },
  });

  const userSubmissions = totalsubmissions.filter(
    (submission) => submission.Buyer_email === user.email
  );

  const totalTaskCount = tasks.length;
  const pendingTaskCount = tasks.reduce(
    (sum, task) => sum + Number(task.requiredWorkers),
    0
  );
  const totalPayment = tasks.reduce(
    (sum, task) => sum + Number(task.payableAmount),
    0
  );

  const handleApprove = (submission) => {
    axiosSecure
      .patch(`/submitted/${submission._id}`)
      .then((res) => {
        if (
          res.data.message ===
          "Submission approved and coins updated successfully"
        ) {
          axiosSecure
            .post("/newnotificatio", {
              workermessage: `You have earned ${
                submission.payable_amount
              } Coin from ${submission?.Buyer_email || "anonymous"} for completing ${
                submission.task_title
              }`,
              woekermail: submission.worker_email,
              data: new Date(),
            })
            .then((res) => {
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
      })
      .catch((error) => {
        console.error("Error approving task:", error);
      });
  };

  const handleReject = (submission) => {
    axiosSecure
      .patch(`/submitted/reject/${submission._id}`)
      .then((res) => {
        refetch();
        if (res.data.message) {
          axiosSecure
            .post("/newnotificatio", {
              workermessage: `Sorry, your ${
                submission.payable_amount
              } Coin was rejected from ${
                submission?.Buyer_email || "anonymous"
              } for not completing ${submission.task_title}`,
              woekermail: submission.worker_email,
              data: new Date(),
            })
            .then((res) => {
              if (res.data.acknowledged) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Rejection notification sent",
                  showConfirmButton: false,
                  timer: 1500,
                });
                refetch();
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error rejecting task:", error);
      });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="lg:text-2xl text-xs font-bold mb-5">Buyer Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-gradient-to-br from-blue-100 to-blue-300 p-5 rounded shadow">
          <h2 className="lg:text-lg text-xs font-bold">Total Tasks</h2>
          <p className="lg:text-xl text-xs">{totalTaskCount}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 p-5 rounded shadow">
          <h2 className="lg:text-lg text-xs font-bold">Pending task</h2>
          <p className="lg:text-xl text-xs">{pendingTaskCount}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-300 p-5 rounded shadow">
          <h2 className="lg:text-lg text-xs font-bold">Total Payment</h2>
          <p className="lg:text-xl text-xs">{totalPayment} coin</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded shadow max-w-full overflow-x-auto">
        <h2 className="lg:text-lg text-xs font-bold mb-5">Task Submissions</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 text-xs lg:text-lg">Worker Name</th>
              <th className="border-b py-2 text-xs lg:text-lg">Task Title</th>
              <th className="border-b py-2 text-xs lg:text-lg">Payable Amount</th>
              <th className="border-b py-2 text-xs lg:text-lg">Status</th>
              <th className="border-b py-2 text-xs lg:text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border-b py-2 text-xs lg:text-lg">{submission.worker_name}</td>
                <td className="border-b py-2 text-xs lg:text-lg">{submission.task_title}</td>
                <td className="border-b py-2 text-xs lg:text-lg">{submission.payable_amount} Coin</td>
                <td className="border-b py-2 text-xs lg:text-lg">{submission.status}</td>
                <td className="border-b py-2 text-xs lg:text-lg">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="mr-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(submission)}
                    className="mr-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(submission)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-3">
              Submission Details for {selectedSubmission.worker_name}
            </h2>
            <p>{selectedSubmission.submission_details}</p>
            <button
              onClick={() => setSelectedSubmission(null)}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <BuyerStatsPage />

    </div>
  );
};

export default BuyerHome;
