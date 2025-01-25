import React, { useState } from "react";
// import useTask from "./useTask";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import userTask from "./userTask";
import userSubmission from "./userSubmission";
import { FaBitcoin } from "react-icons/fa";

const BuyerHome = () => {
  const { user } = useAuth(); // Replace with actual email from auth
  // const [tasks] = useTask(user.email);
  const [tasks] = userTask();
  // const [submissions, setSubmissions] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { data: totalsubmissions = [], refetch } = useQuery({
    queryKey: ["totalsubmissions"], // Unique key for caching and identifying the query
    queryFn: async () => {
      const response = await axiosSecure.get(`/subar`);

      // Filter submissions to include only "pending" status
      // (Assuming your data has a "status" property)
      return response.data.filter(
        (submission) => submission.status === "pending"
      );
    },
  });
  // const [submissions] = userSubmission();
  // console.log(submissions);
  console.log(totalsubmissions);
  console.log(user);
  

  const userSubmissions = totalsubmissions.filter(
    (submission) => submission.Buyer_email === user.email
  );

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

  const handleApprove = (submission) => {
    // console.log(id);

    axiosSecure
      .patch(`/submitted/${submission._id}`)
      .then((res) => {
        if (
          res.data.message ===
          "Submission approved and coins updated successfully"
        ) {
          
          axiosSecure.post("/newnotificatio",{workermessage: `You have earned ${submission.payable_amount} Coin from ${
            user.displayName || "anonymous"
          } for completing ${submission.task_title}`,
          woekermail: submission.worker_email,})
          .then((res) => {
            console.log(res.data);
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

  const handleReject = (id) => {
    console.log(id);

    axiosSecure
      .patch(`/submitted/reject/${id}`)
      .then((res) => {
        console.log(res.data);
        refetch();
        if (res.data.message) {
          const notifi ={
            workermessage : `you have earned ${payable_amount} rejected from ${user.diplayNmae || anonymous} for not  completing ${task_title}`
          }
          axiosSecure.post("/newnotificatio",{notifi})
          .then((res) => {
            console.log(res.data);
            if (res.data.message) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "this work has been Rejected",
                showConfirmButton: false,
                timer: 1500,
              });
            }
           
          });
        }
      })
      .catch((error) => {
        console.error("Error approving task:", error);
      });
  };
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
          <h2 className="text-lg font-bold">Pending task</h2>
          <p className="text-xl">{pendingTaskCount}</p>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold">Total Payment</h2>
          <p className="text-xl">{totalPayment} coin</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-red-400 p-5 rounded shadow max-w-[220px] md:max-w-full lg:max-w-full ">
        <h2 className="lg:text-lg text-[8px] font-bold mb-5">Task Submissions</h2>
        <table className="w-full text-lef	Payable Amount border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 lg:text-lg text-[8px]">Worker Name</th>
              <th className="border-b py-2 lg:text-lg text-[8px]">Task Title</th>
              <th className="border-b py-2 lg:text-lg text-[8px]">Payable Amount</th>
              <th className="border-b py-2 lg:text-lg text-[8px]">status</th>
              <th className="border-b py-2 lg:text-lg text-[8px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {submissions.lenght > 0 ? ( */}
            {userSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border-b py-2 lg:text-lg text-[8px]">{submission.worker_name}</td>
                <td className="border-b py-2 lg:text-lg text-[8px]">{submission.task_title}</td>
                <td csubmissionslassName="border-b py-2 lg:text-lg text-[8px]">
                  
                  <p className="lg:text-lg text-[8px]">{submission.payable_amount} Coin</p>
                </td>
                <td csubmissionslassName="border-b py-2 ">
                  <p className="lg:text-lg text-[8px]">{submission.status}</p>
                </td>
                <td className="border-b py-2">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="mr-2 text-white lg:text-lg text-[8px] bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    View Submission
                  </button>
                  <button
                    onClick={() => handleApprove(submission)}
                    className="mr-2 text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded lg:text-lg text-[8px]"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(submission)}
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded lg:text-lg text-[8px]"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {/* ) : (
              <h1 className="text-red-500">! no one submitted your task</h1>
            )} */}
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
