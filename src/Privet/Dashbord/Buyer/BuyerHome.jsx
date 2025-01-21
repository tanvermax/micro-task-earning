import React, { useState } from "react";
import useTask from "./useTask";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const BuyerHome = () => {
  const { user } = useAuth(); // Replace with actual email from auth
  const [tasks] = useTask(user.email);
  // const [submissions, setSubmissions] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  console.log(tasks);

  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["submissions"], // Unique key for caching and identifying the query
    queryFn: async () => {
      const response = await axiosSecure.get("/submitted");

      // Filter submissions to include only "pending" status
      return response.data.filter((sub) => sub.status === "pending");
    },
  });

  // Total task count
  const totalTaskCount = tasks.length;

  // Pending task countsubmissions
  const pendingTaskCount = tasks.reduce(
    (sum, task) => sum + Number(task.requiredWorkers),
    0
  );

  // Total payment paid
  const totalPayment = tasks.reduce(
    (sum, task) => sum + Number(task.payableAmount),
    0
  );

  const handleApprove = (id) => {
    
    axiosSecure.patch(`/submitted/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The task is approved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error approving task:", error);
      });
  };



  // Handle approve submission
  // const handleApprove = async (submission) => {
  //   try {
  //     await fetch(`http://localhost:5000/submitted/${submission._id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         status: "approve",
  //         worker_coins: submission.payable_amount,
  //       }),
  //     });

  //     // Update local state
  //     setSubmissions((prev) => prev.filter((sub) => sub.id !== submission._id));
  //     alert("Submission approved successfully!");
  //   } catch (error) {
  //     console.error("Error approving submission:", error);
  //   }
  // };

  // // Handle reject submission
  // const handleReject = async (submission) => {
  //   try {
  //     await fetch(`http://localhost:5000/submitted/${submission._id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         status: "rejected",
  //       }),
  //     });

  //     await fetch(`http://localhost:5000/tasks/${submission.task_id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         requiredWorkers: submission.required_workers + 1,
  //       }),
  //     });

  //     // Update local state
  //     setSubmissions((prev) => prev.filter((sub) => sub.id !== submission.id));
  //     alert("Submission rejected and required workers increased!");
  //   } catch (error) {
  //     console.error("Error rejecting submission:", error);
  //   }
  // };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Buyer Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold">Total Tasks</h2>
          <p className="text-xl">{totalTaskCount}</p>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold">Pending Workers</h2>
          <p className="text-xl">{pendingTaskCount}</p>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold">Total Payment</h2>
          <p className="text-xl">${totalPayment}</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-bold mb-5">Task Submissions</h2>
        <table className="w-full text-lef	Payable Amountt border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Worker Name</th>
              <th className="border-b py-2">Task Title</th>
              <th className="border-b py-2">Payable Amount</th>
              <th className="border-b py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border-b py-2">{submission.worker_name}</td>
                <td className="border-b py-2">{submission.task_title}</td>
                <td csubmissionslassName="border-b py-2">${submission.payable_amount}</td>
                <td className="border-b py-2">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="mr-2 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    View Submission
                  </button>
                  <button
                    onClick={() => handleApprove(submission._id)}
                    className="mr-2 text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(submission)}
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-3">
              Submission Details for {selectedSubmission.worker_name}
            </h2>
            <p>{selectedSubmission.submission_details}</p>
            <button
              onClick={() => setSelectedSubmission(null)}
              className="mt-5 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
