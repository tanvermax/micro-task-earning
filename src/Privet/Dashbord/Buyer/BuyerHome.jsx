import React, { useState } from "react";
// import useTask from "./useTask";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import userTask from "./userTask";
import userSubmission from "./userSubmission";
import { FaBitcoin } from "react-icons/fa";
import BuyerStatsPage from "./BuyerStatsPage";

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
      })
      .catch((error) => {
        console.error("Error approving task:", error);
      });
  };

  const handleReject = (submission) => {
    // console.log(submission._id);

    axiosSecure
      .patch(`/submitted/reject/${submission._id}`)
      .then((res) => {
        // console.log(res.data);
        refetch();
        if (res.data.message) {
          
          axiosSecure
            .post("/newnotificatio", {
              workermessage: ` sorry Your  earned ${
                submission.payable_amount
              } Coin rejected from ${submission?.Buyer_email || "anonymous"} for not completing ${
                submission.task_title
              }`,
              woekermail: submission.worker_email,
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
      })
      .catch((error) => {
        console.error("Error approving task:", error);
      });
  };
  return (
    <div className="container mx-auto p-5">
      <div>
        <BuyerStatsPage></BuyerStatsPage>
      </div>
      <h1 className="lg:text-2xl text-[10px] font-bold mb-5">Buyer Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className=" p-5 rounded shadow">
          <h2 className="lg:text-lg text-[8px] font-bold">Total Tasks</h2>
          <p className="lg:text-xl text-[10px]">{totalTaskCount}</p>
        </div>
        <div className=" p-5 rounded shadow">
          <h2 className="lg:text-lg text-[8px] font-bold">Pending task</h2>
          <p className="lg:text-xl text-[10px]">{pendingTaskCount}</p>
        </div>
        <div className=" p-5 rounded shadow">
          <h2 className="lg:text-lg text-[8px] font-bold">Total Payment</h2>
          <p className="lg:text-xl text-[10px]">{totalPayment} coin</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-[#dd8f46] p-5 rounded shadow max-w-[220px] md:max-w-full lg:max-w-full ">
        <h2 className="lg:text-lg text-[8px] font-bold mb-5">
          Task Submissions
        </h2>
        <table className="w-full text-lef	Payable Amount border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 lg:text-lg text-[8px]">
                Worker Name
              </th>
              <th className="border-b py-2 lg:text-lg text-[8px]">
                Task Title
              </th>
              <th className="border-b py-2 lg:text-lg text-[8px]">
                Payable Amount
              </th>
              <th className="border-b py-2 lg:text-lg text-[8px]">status</th>
              <th className="border-b py-2 lg:text-lg text-[8px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {submissions.lenght > 0 ? ( */}
            {userSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border-b py-2 lg:text-lg text-[8px]">
                  {submission.worker_name}
                </td>
                <td className="border-b py-2 lg:text-lg text-[8px]">
                  {submission.task_title}
                </td>
                <td csubmissionslassName="border-b py-2 lg:text-lg text-[8px]">
                  <p className="lg:text-lg text-[8px]">
                    {submission.payable_amount} Coin
                  </p>
                </td>
                <td csubmissionslassName="border-b py-2 ">
                  <p className="lg:text-lg text-[8px]">{submission.status}</p>
                </td>
                <td className="border-b py-2">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="mr-2  lg:text-lg text-[8px] bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    View Submission
                  </button>
                  <button
                    onClick={() => handleApprove(submission)}
                    className="mr-2  bg-green-600 hover:bg-green-700 px-3 py-1 rounded lg:text-lg text-[8px]"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(submission)}
                    className=" bg-red-600 hover:bg-red-700 px-3 py-1 rounded lg:text-lg text-[8px]"
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
          <div className=" p-5 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-3">
              Submission Details for {selectedSubmission.worker_name}
            </h2>
            <p>{selectedSubmission.submission_details}</p>
            <button
              onClick={() => setSelectedSubmission(null)}
              className="mt-5  bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
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
