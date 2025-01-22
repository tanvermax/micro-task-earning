import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
import userMange from "../userMange";
import Swal from "sweetalert2";

const WorkerHome = () => {
  const { user } = useAuth(); 
  // Get logged-in user info
  const axiosSecure = useAxiosSecure();
  const [userData] = userMange();

  // Fetch worker submissions
  const { data: submissions = [] } = useQuery({
    queryKey: ["workerSubmissions", user.email], // Unique key for caching
    queryFn: async () => {
      const response = await axiosSecure.get("/submitted");
      return response.data.filter((sub) => sub.worker_email === user.email); // Filter submissions by worker email
    },
  });

//   console.log(userData.coins);
//   console.log(user.coins);
  

  // Filter submissions
  const pendingSubmissions = submissions.filter(
    (sub) => sub.status === "pending"
  );
  const approvedSubmissions = submissions.filter(
    (sub) => sub.status === "approve"
  );

  //   const totalApprovedCoins = approvedSubmissions.reduce(
  //     (sum, sub) => sum + Number(sub.payable_amount),
  //     0
  //   );

  // Calculate stats
  const totalSubmissions = submissions.length;
  const totalPendingSubmissions = pendingSubmissions.length;
  const totalEarnings = approvedSubmissions.reduce(
    (sum, sub) => sum + Number(sub.payable_amount),
    0
  );

  const totalusercoin = totalEarnings + userData.coins;
  console.log(totalusercoin);

  const handlecoinadd = async (co) => {
    try {
      // Calculate the total coins
      const totalCoins = co + userData.coins;
      console.log("Updated Coins:", totalCoins);
  
      // Patch the updated coins to the server
      const response = await axiosSecure.patch(`/users/${user.email}`, {
        coins: totalCoins,
      });
  
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Coins Added Successfully!",
          text: `Your account now has ${totalCoins} coins.`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Coins",
          text: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error updating coins:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    }
  };
  

  

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Worker Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold">Total Submissions</h2>
          <p className="text-xl">{totalSubmissions}</p>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold">Pending Submissions</h2>
          <p className="text-xl">{totalPendingSubmissions}</p>
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold">Total Earnings</h2>
          <button
            
            className="text-xl"
          >
            ${totalEarnings.toFixed(2)}{" "}
           {" "}
          </button>
          {/* <p className="text-xl">coin :{totalusercoin}</p> */}
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white p-5 rounded shadow mb-10">
        <h2 className="text-lg font-bold mb-5">Approved Submissions</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Task Title</th>
              <th className="border-b py-2">earn Amount coin </th>
              <th className="border-b py-2">Buyer Name</th>
              <th className="border-b py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border-b py-2">{submission.task_title}</td>
                <td className="border-b py-2">${submission.payable_amount}</td>
                <td className="border-b py-2">{submission.buyer_name}</td>
                <td className="border-b py-2">{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Submissions Table */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-bold mb-5">Pending Submissions</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Task Title</th>
              <th className="border-b py-2">Payable Amount</th>
              <th className="border-b py-2">Buyer Name</th>
              <th className="border-b py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border-b py-2">{submission.task_title}</td>
                <td className="border-b py-2">${submission.payable_amount}</td>
                <td className="border-b py-2">{submission.buyer_name}</td>
                <td className="border-b py-2">{submission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;
